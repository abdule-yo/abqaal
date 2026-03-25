import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

export type AdminRole = Database['public']['Enums']['admin_role']
type AdminUser = Database['public']['Tables']['admin_users']['Row']

export interface CurrentAdmin {
  userId: string
  email: string
  name: string
  role: AdminRole
}

/**
 * Get the current authenticated user's admin profile + role.
 * Returns null if not found in admin_users table.
 */
export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error || !data) return null

    const admin = data as AdminUser
    return {
      userId: admin.user_id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    }
  } catch {
    return null
  }
}

/**
 * Permission checks based on role hierarchy:
 * super_admin > admin > editor
 */
export function canCreate(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'admin'
}

export function canEdit(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'admin'
}

export function canDelete(role: AdminRole): boolean {
  return role === 'super_admin'
}

export function canManageUsers(role: AdminRole): boolean {
  return role === 'super_admin'
}

export function getRoleLabel(role: AdminRole): string {
  switch (role) {
    case 'super_admin': return 'Super Admin'
    case 'admin': return 'Admin'
    case 'editor': return 'Editor'
  }
}

export function getRoleColor(role: AdminRole): string {
  switch (role) {
    case 'super_admin': return 'bg-purple-100 text-purple-700'
    case 'admin': return 'bg-blue-100 text-blue-700'
    case 'editor': return 'bg-gray-100 text-gray-600'
  }
}
