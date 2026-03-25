'use client'

import type { AdminRole } from '@/lib/auth'

interface RoleGateProps {
  role: AdminRole
  allowedRoles: AdminRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Client component that conditionally renders children based on role.
 * Use this to hide UI elements (create/delete buttons) from unauthorized roles.
 */
export function RoleGate({ role, allowedRoles, children, fallback }: RoleGateProps) {
  if (allowedRoles.includes(role)) {
    return <>{children}</>
  }
  return fallback ? <>{fallback}</> : null
}
