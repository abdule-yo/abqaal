import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'

// Admin API using service role key to create auth users
function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export async function POST(request: NextRequest) {
  // 1. Verify the caller is a super_admin
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: callerAdmin } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!callerAdmin || callerAdmin.role !== 'super_admin') {
    return NextResponse.json({ error: 'Only super admins can create users' }, { status: 403 })
  }

  // 2. Parse request body
  const body = await request.json()
  const { email, password, name, role } = body as {
    email: string
    password: string
    name: string
    role: 'super_admin' | 'admin' | 'editor'
  }

  if (!email || !password || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!['super_admin', 'admin', 'editor'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  // 3. Create auth user with service role
  const adminClient = createAdminClient()
  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 })
  }

  // 4. Create admin_users record (using service role to bypass RLS for the initial insert)
  const { error: profileError } = await adminClient
    .from('admin_users')
    .insert({
      user_id: authData.user.id,
      email,
      name,
      role,
      created_by: user.id,
    })

  if (profileError) {
    // Rollback: delete the auth user
    await adminClient.auth.admin.deleteUser(authData.user.id)
    return NextResponse.json({ error: profileError.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, userId: authData.user.id })
}

export async function DELETE(request: NextRequest) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: callerAdmin } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!callerAdmin || callerAdmin.role !== 'super_admin') {
    return NextResponse.json({ error: 'Only super admins can delete users' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const targetUserId = searchParams.get('userId')

  if (!targetUserId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  if (targetUserId === user.id) {
    return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
  }

  const adminClient = createAdminClient()

  // Delete admin_users record (cascade from auth.users will handle this too)
  await adminClient.from('admin_users').delete().eq('user_id', targetUserId)

  // Delete the auth user
  const { error } = await adminClient.auth.admin.deleteUser(targetUserId)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
