'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { deleteImage } from '@/lib/storage'
import { Trash2, Loader2, Pencil, Check, X } from 'lucide-react'
import type { Database } from '@/types/database'

type GalleryItem = Database['public']['Tables']['gallery']['Row']

interface GalleryItemCardProps {
  item: GalleryItem
}

export function GalleryItemCard({ item }: GalleryItemCardProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [altText, setAltText] = useState(item.alt_text)
  const [category, setCategory] = useState(item.category)

  async function handleDelete() {
    if (!confirm('Delete this gallery image?')) return
    setDeleting(true)
    await deleteImage(item.image_url).catch(() => {})
    const supabase = createClient()
    await supabase.from('gallery').delete().eq('id', item.id)
    router.refresh()
  }

  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('gallery').update({ alt_text: altText, category }).eq('id', item.id)
    setEditing(false)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="group relative rounded-xl overflow-hidden border border-[#E8E8E0] bg-white">
      <div className="relative h-40">
        <Image
          src={item.image_url}
          alt={item.alt_text}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing(!editing)}
            className="h-7 w-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#1A1A17]/60 hover:text-[#4A8B2C] transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="h-7 w-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
          </button>
        </div>
        {item.category && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 rounded-full text-[10px] font-semibold text-[#1A1A17]/60">
            {item.category}
          </span>
        )}
      </div>

      {editing ? (
        <div className="p-3 space-y-2">
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Alt text"
            className="w-full px-2 py-1.5 text-xs rounded-lg border border-[#E8E8E0] bg-[#FAFAF5]"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full px-2 py-1.5 text-xs rounded-lg border border-[#E8E8E0] bg-[#FAFAF5]"
          />
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium bg-[#4A8B2C] text-white rounded-lg"
            >
              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
              Save
            </button>
            <button
              onClick={() => { setEditing(false); setAltText(item.alt_text); setCategory(item.category) }}
              className="px-2 py-1.5 text-xs font-medium text-[#1A1A17]/50 hover:bg-[#FAFAF5] rounded-lg"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3">
          <p className="text-xs text-[#1A1A17]/50 truncate">{item.alt_text || 'No description'}</p>
        </div>
      )}
    </div>
  )
}
