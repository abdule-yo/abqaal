'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { ImageUploadField } from '@/components/dashboard/image-upload-field'
import { MarkdownEditorField } from '@/components/dashboard/markdown-editor-field'
import type { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

const FALLBACK_CATEGORIES = [
  'Seeds',
  'Fertilizers',
  'Greenhouses',
  'Irrigation Equipment',
  'Hand Tools',
  'Plant Protection',
  'Farm Machinery',
  'Geo-membrane & Dam Liners',
]

interface ProductFormProps {
  product?: Product
  categories?: Category[]
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

export function ProductForm({ product, categories }: ProductFormProps) {
  const isEdit = !!product
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const hasDbCategories = categories && categories.length > 0

  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    category: product?.category ?? (hasDbCategories ? categories[0].name : FALLBACK_CATEGORIES[0]),
    category_id: product?.category_id ?? (hasDbCategories ? categories[0].id : ''),
    price: product?.price ?? '',
    featured: product?.featured ?? false,
    highlights: product?.highlights?.join('\n') ?? '',
    image: product?.image ?? '',
  })

  function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function handleChange(field: string, value: string | number | boolean) {
    setForm((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === 'name' && !isEdit) {
        updated.slug = generateSlug(value as string)
      }
      return updated
    })
  }

  function handleCategoryChange(value: string) {
    if (hasDbCategories) {
      const cat = categories.find((c) => c.id === value)
      if (cat) {
        setForm((prev) => ({
          ...prev,
          category_id: cat.id,
          category: cat.name,
        }))
      }
    } else {
      setForm((prev) => ({ ...prev, category: value }))
    }
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
      category: form.category,
      category_id: form.category_id || null,
      price: form.price,
      featured: form.featured,
      image: form.image,
      highlights: form.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
    }

    const { error } = isEdit
      ? await supabase.from('products').update(payload).eq('id', product.id)
      : await supabase.from('products').insert(payload)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/products')
    router.refresh()
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/25 focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 focus:border-[#4A8B2C] transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Slug */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Product Name" hint="The name customers will see on the website">
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="e.g. Premium Vegetable Seeds Collection"
            className={inputClass}
          />
        </Field>
        <Field label="URL Slug" hint="Auto-generated from name. Used in the page URL">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            required
            placeholder="e.g. premium-vegetable-seeds"
            className={inputClass}
          />
        </Field>
      </div>

      {/* Product Image */}
      <ImageUploadField
        label="Product Image"
        hint="Upload a product photo or auto-find one"
        folder="products"
        value={form.image}
        onChange={(url) => handleChange('image', url)}
        searchQuery={form.name || undefined}
      />

      {/* Description (Markdown) */}
      <MarkdownEditorField
        label="Product Description"
        hint="Full description shown on the product detail page. Supports markdown formatting."
        value={form.description}
        onChange={(val) => handleChange('description', val)}
      />

      {/* Category, Price, Featured */}
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="Category" hint="Which product category does this belong to?">
          {hasDbCategories ? (
            <select
              value={form.category_id}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={inputClass}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          ) : (
            <select
              value={form.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={inputClass}
            >
              {FALLBACK_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Price" hint="Enter a price like '$45' or 'Contact for pricing'">
          <input
            type="text"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            required
            placeholder="e.g. $45 or Contact for pricing"
            className={inputClass}
          />
        </Field>
        <Field label="Featured" hint="Featured products appear highlighted on the website">
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] w-full cursor-pointer mt-0.5">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
              className="h-4 w-4 rounded border-[#E8E8E0] text-[#4A8B2C] focus:ring-[#4A8B2C]/20"
            />
            <span className="text-sm text-[#1A1A17]">Mark as featured</span>
          </label>
        </Field>
      </div>

      {/* Highlights */}
      <Field label="Key Features" hint="Product highlights shown as bullet points. Write one feature per line.">
        <textarea
          value={form.highlights}
          onChange={(e) => handleChange('highlights', e.target.value)}
          rows={6}
          placeholder={"Germination rate above 90% guaranteed\nDrought-tolerant varieties for arid climates\nIncludes 12 vegetable varieties per kit\nCertified disease-free seed stock\nDetailed planting guide included"}
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
          {isEdit ? 'Update Product' : 'Create Product'}
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
