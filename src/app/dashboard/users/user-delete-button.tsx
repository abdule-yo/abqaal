'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface UserDeleteButtonProps {
  userId: string
  userName: string
  isSelf: boolean
}

export function UserDeleteButton({ userId, userName, isSelf }: UserDeleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (isSelf) return null

  async function handleDelete() {
    if (!confirm(`Delete user "${userName}"? This will remove their access permanently.`)) return

    setLoading(true)

    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Failed to delete user')
      }

      router.refresh()
    } catch {
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Remove'}
    </button>
  )
}
