import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardShell } from './dashboard-shell'
import { getCurrentAdmin } from '@/lib/auth'

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

  // Get admin profile (auto-seeds first user as super_admin)
  const admin = await getCurrentAdmin()

  return (
    <DashboardShell
      adminName={admin?.name ?? ''}
      adminEmail={admin?.email ?? user.email ?? ''}
      adminRole={admin?.role ?? 'editor'}
    >
      {children}
    </DashboardShell>
  )
}
