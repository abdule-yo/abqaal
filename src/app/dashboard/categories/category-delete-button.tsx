'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

interface CategoryDeleteButtonProps {
  id: string
  productCount: number
}

export function CategoryDeleteButton({ id, productCount }: CategoryDeleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    const message = productCount > 0
      ? `This will also delete ${productCount} product${productCount === 1 ? '' : 's'} in this category. Are you sure?`
      : 'Are you sure you want to delete this category?'

    if (!confirm(message)) return

    setLoading(true)
    const supabase = createClient()
    await supabase.from('categories').delete().eq('id', id)
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
