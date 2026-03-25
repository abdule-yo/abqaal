'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { ImageUploadField } from '@/components/dashboard/image-upload-field'

export function GalleryUploadForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    image_url: '',
    alt_text: '',
    category: '',
    sort_order: 0,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.image_url) {
      setError('Please upload an image')
      return
    }

    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.from('gallery').insert({
      image_url: form.image_url,
      alt_text: form.alt_text,
      category: form.category,
      sort_order: Number(form.sort_order),
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setForm({ image_url: '', alt_text: '', category: '', sort_order: 0 })
    router.refresh()
    setLoading(false)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/25 focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 focus:border-[#4A8B2C] transition-all'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-[#E8E8E0] space-y-4">
      <h2 className="text-lg font-bold text-[#1A1A17]">Add Photo</h2>

      <ImageUploadField
        label="Image"
        hint="Upload a gallery photo"
        folder="gallery"
        value={form.image_url}
        onChange={(url) => setForm((prev) => ({ ...prev, image_url: url }))}
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#1A1A17]/50 mb-1">Alt Text</label>
          <input
            type="text"
            value={form.alt_text}
            onChange={(e) => setForm((prev) => ({ ...prev, alt_text: e.target.value }))}
            placeholder="Describe the image"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#1A1A17]/50 mb-1">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            placeholder="e.g. Greenhouse"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#1A1A17]/50 mb-1">Sort Order</label>
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A8B2C] hover:bg-[#1B5E20] disabled:opacity-60 text-white text-sm font-semibold rounded-full transition-colors"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Add to Gallery
      </button>
    </form>
  )
}
