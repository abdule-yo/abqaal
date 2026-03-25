'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import type { Database } from '@/types/database'

type Category = Database['public']['Tables']['categories']['Row']

interface CategoryFormProps {
  category?: Category
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#1A1A17] mb-1">
        {label}
      </label>
      {hint && (
        <p className="text-[11px] text-[#1A1A17]/35 mb-2">{hint}</p>
      )}
      {children}
    </div>
  )
}

export function CategoryForm({ category }: CategoryFormProps) {
  const isEdit = !!category
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: category?.name ?? '',
    slug: category?.slug ?? '',
    description: category?.description ?? '',
    sort_order: category?.sort_order ?? 0,
  })

  function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function handleChange(field: string, value: string | number) {
    setForm((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === 'name' && !isEdit) {
        updated.slug = generateSlug(value as string)
      }
      return updated
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      sort_order: Number(form.sort_order),
    }

    const { error } = isEdit
      ? await supabase.from('categories').update(payload).eq('id', category.id)
      : await supabase.from('categories').insert(payload)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/categories')
    router.refresh()
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/25 focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 focus:border-[#4A8B2C] transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Category Name" hint="The display name for this category">
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="e.g. Seeds"
            className={inputClass}
          />
        </Field>
        <Field label="URL Slug" hint="Auto-generated from name">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            required
            placeholder="e.g. seeds"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Description" hint="Short description of this category">
        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          placeholder="e.g. High-quality seeds for various crops"
          className={inputClass}
        />
      </Field>

      <Field label="Sort Order" hint="Lower numbers appear first">
        <input
          type="number"
          value={form.sort_order}
          onChange={(e) => handleChange('sort_order', e.target.value)}
          className={inputClass}
        />
      </Field>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8B2C] hover:bg-[#1B5E20] disabled:opacity-60 text-white font-bold text-sm rounded-full transition-colors"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Update Category' : 'Create Category'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-white border border-[#E8E8E0] text-[#1A1A17]/60 font-medium text-sm rounded-full hover:bg-[#FAFAF5] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
