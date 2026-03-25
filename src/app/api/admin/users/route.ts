import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'

// Admin client with service role key — bypasses RLS
function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      `Missing env vars: ${!url ? 'NEXT_PUBLIC_SUPABASE_URL ' : ''}${!serviceKey ? 'SUPABASE_SERVICE_ROLE_KEY' : ''}`
    )
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/**
 * Check if the current user is a super_admin.
 * If the admin_users table is empty, auto-seed the current user as the first super_admin.
 */
async function verifySuperAdmin(userId: string, userEmail: string) {
  const adminClient = createAdminClient()

  // Check if admin_users table has ANY rows
  const { count } = await adminClient
    .from('admin_users')
    .select('*', { count: 'exact', head: true })

  // If table is empty, auto-seed this user as the first super_admin
  if (count === 0) {
    await adminClient.from('admin_users').insert({
      user_id: userId,
      email: userEmail,
      name: userEmail.split('@')[0],
      role: 'super_admin',
    })
    return true
  }

  // Otherwise, check if user exists and is super_admin (using service role to bypass RLS)
  const { data: callerAdmin } = await adminClient
    .from('admin_users')
    .select('role')
    .eq('user_id', userId)
    .single()

  return callerAdmin?.role === 'super_admin'
}

export async function POST(request: NextRequest) {
  // 1. Get current authenticated user
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // 2. Verify super_admin (auto-seeds first user)
  const isSuperAdmin = await verifySuperAdmin(user.id, user.email ?? '')

  if (!isSuperAdmin) {
    return NextResponse.json({ error: 'Only super admins can create users' }, { status: 403 })
  }

  // 3. Parse request body
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

  // 4. Create auth user with service role
  let adminClient
  try {
    adminClient = createAdminClient()
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }

  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError) {
    console.error('Supabase auth.admin.createUser error:', authError)
    return NextResponse.json(
      { error: `Failed to create auth user: ${authError.message}` },
      { status: 400 }
    )
  }

  // 5. Create admin_users record (service role bypasses RLS)
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

  const isSuperAdmin = await verifySuperAdmin(user.id, user.email ?? '')

  if (!isSuperAdmin) {
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

  await adminClient.from('admin_users').delete().eq('user_id', targetUserId)

  const { error } = await adminClient.auth.admin.deleteUser(targetUserId)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
