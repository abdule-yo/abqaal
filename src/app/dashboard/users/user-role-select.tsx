'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

interface UserRoleSelectProps {
  adminId: string
  currentRole: 'super_admin' | 'admin' | 'editor'
  isSelf: boolean
}

export function UserRoleSelect({ adminId, currentRole, isSelf }: UserRoleSelectProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState(currentRole)

  async function handleChange(newRole: string) {
    if (newRole === role) return
    setLoading(true)

    const supabase = createClient()
    await supabase
      .from('admin_users')
      .update({ role: newRole as typeof currentRole })
      .eq('id', adminId)

    setRole(newRole as typeof currentRole)
    setLoading(false)
    router.refresh()
  }

  if (isSelf) {
    return (
      <span className="text-xs text-[#1A1A17]/40 italic">
        Cannot change own role
      </span>
    )
  }

  return (
    <div className="relative inline-flex items-center gap-1.5">
      <select
        value={role}
        onChange={(e) => handleChange(e.target.value)}
        disabled={loading}
        className="text-xs font-medium px-2.5 py-1.5 rounded-lg border border-[#E8E8E0] bg-[#FAFAF5] text-[#1A1A17] focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 disabled:opacity-50"
      >
        <option value="super_admin">Super Admin</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </select>
      {loading && <Loader2 className="h-3 w-3 animate-spin text-[#4A8B2C]" />}
    </div>
  )
}
