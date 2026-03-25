import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardShell } from './dashboard-shell'
import type { Database } from '@/types/database'

type AdminUser = Database['public']['Tables']['admin_users']['Row']

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get admin profile with role
  const { data: adminData } = await supabase
    .from('admin_users')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // If no admin_users record exists, treat as editor (backward compatible)
  const admin = adminData as AdminUser | null
  const role = admin?.role ?? 'editor'
  const name = admin?.name ?? ''

  return (
    <DashboardShell
      adminName={name}
      adminEmail={user.email ?? ''}
      adminRole={role}
    >
      {children}
    </DashboardShell>
  )
}
