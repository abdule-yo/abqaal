'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function DeleteButton({ id, type }: { id: string; type: 'projects' | 'products' | 'testimonials' }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this item?')) return

    setLoading(true)
    const supabase = createClient()
    await supabase.from(type).delete().eq('id', id)
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Delete'}
    </button>
  )
}
