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
 * If the admin_users table is empty, auto-seeds the current user as the first super_admin.
 * If the user exists in auth but not in admin_users, returns a default editor profile.
 */
export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // Try to get admin profile
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!error && data) {
      const admin = data as AdminUser
      return {
        userId: admin.user_id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      }
    }

    // User not in admin_users — check if the table is empty (first user gets auto-seeded)
    const { count } = await supabase
      .from('admin_users')
      .select('*', { count: 'exact', head: true })

    if (count === 0) {
      // Auto-seed as first super_admin
      const { data: newAdmin } = await supabase
        .from('admin_users')
        .insert({
          user_id: user.id,
          email: user.email ?? '',
          name: user.email?.split('@')[0] ?? '',
          role: 'super_admin' as AdminRole,
        })
        .select()
        .single()

      if (newAdmin) {
        const seeded = newAdmin as AdminUser
        return {
          userId: seeded.user_id,
          email: seeded.email,
          name: seeded.name,
          role: seeded.role,
        }
      }
    }

    // Authenticated but no admin_users row — treat as editor
    return {
      userId: user.id,
      email: user.email ?? '',
      name: user.email?.split('@')[0] ?? '',
      role: 'editor',
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
