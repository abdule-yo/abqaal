import Link from 'next/link'
import { Plus, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getCurrentAdmin, getRoleLabel, getRoleColor, canManageUsers } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { UserRoleSelect } from './user-role-select'
import { UserDeleteButton } from './user-delete-button'
import type { Database } from '@/types/database'

type AdminUser = Database['public']['Tables']['admin_users']['Row']

export default async function UsersPage() {
  const currentAdmin = await getCurrentAdmin()

  if (!currentAdmin || !canManageUsers(currentAdmin.role)) {
    redirect('/dashboard')
  }

  const supabase = await createClient()
  const { data: admins } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A17]">Team Members</h1>
          <p className="text-sm text-[#1A1A17]/40 mt-1">
            Manage admin users and their roles
          </p>
        </div>
        <Link
          href="/dashboard/users/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white text-sm font-semibold rounded-full transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Link>
      </div>

      {/* Role legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { role: 'super_admin' as const, desc: 'Full access + user management' },
          { role: 'admin' as const, desc: 'Create & edit, no delete' },
          { role: 'editor' as const, desc: 'Read-only access' },
        ].map((r) => (
          <div key={r.role} className="flex items-center gap-2 text-xs text-[#1A1A17]/50">
            <span className={`px-2 py-0.5 rounded-full font-semibold ${getRoleColor(r.role)}`}>
              {getRoleLabel(r.role)}
            </span>
            <span>{r.desc}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E8E0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E8E8E0] bg-[#FAFAF5]">
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">User</th>
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider hidden sm:table-cell">Email</th>
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">Role</th>
              <th className="text-right px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E0]">
            {(!admins || admins.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-[#1A1A17]/40">
                  No admin users found. Add your first team member.
                </td>
              </tr>
            )}
            {(admins as AdminUser[])?.map((admin) => {
              const isSelf = admin.user_id === currentAdmin.userId
              return (
                <tr key={admin.id} className="hover:bg-[#FAFAF5] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#4A8B2C] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {admin.name ? admin.name.charAt(0).toUpperCase() : admin.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#1A1A17]">
                          {admin.name || 'Unnamed'}
                          {isSelf && (
                            <span className="ml-2 text-[10px] font-medium text-[#4A8B2C] bg-[#E8F5E9] px-1.5 py-0.5 rounded">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#1A1A17]/40 sm:hidden">{admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#1A1A17]/50 hidden sm:table-cell">{admin.email}</td>
                  <td className="px-6 py-4">
                    <UserRoleSelect
                      adminId={admin.id}
                      currentRole={admin.role}
                      isSelf={isSelf}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <UserDeleteButton
                      userId={admin.user_id}
                      userName={admin.name || admin.email}
                      isSelf={isSelf}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Permission Matrix */}
      <div className="mt-8 bg-white rounded-2xl p-6 border border-[#E8E8E0]">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-[#4A8B2C]" />
          <h2 className="text-sm font-bold text-[#1A1A17]">Permission Matrix</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E8E0]">
                <th className="text-left py-2 pr-4 text-[11px] font-bold text-[#1A1A17]/40 uppercase">Action</th>
                <th className="text-center py-2 px-4 text-[11px] font-bold text-purple-600 uppercase">Super Admin</th>
                <th className="text-center py-2 px-4 text-[11px] font-bold text-blue-600 uppercase">Admin</th>
                <th className="text-center py-2 px-4 text-[11px] font-bold text-gray-500 uppercase">Editor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E0]">
              {[
                { action: 'View dashboard & content', super: true, admin: true, editor: true },
                { action: 'Create content', super: true, admin: true, editor: false },
                { action: 'Edit content', super: true, admin: true, editor: false },
                { action: 'Delete content', super: true, admin: false, editor: false },
                { action: 'Manage users & roles', super: true, admin: false, editor: false },
                { action: 'Edit site settings', super: true, admin: true, editor: false },
              ].map((row) => (
                <tr key={row.action}>
                  <td className="py-2.5 pr-4 text-[#1A1A17]/60">{row.action}</td>
                  <td className="py-2.5 px-4 text-center">{row.super ? '✓' : '—'}</td>
                  <td className="py-2.5 px-4 text-center">{row.admin ? '✓' : '—'}</td>
                  <td className="py-2.5 px-4 text-center">{row.editor ? '✓' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
