'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Star } from 'lucide-react'
import type { Database } from '@/types/database'

type Testimonial = Database['public']['Tables']['testimonials']['Row']

interface TestimonialFormProps {
  testimonial?: Testimonial
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

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const isEdit = !!testimonial
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: testimonial?.name ?? '',
    role: testimonial?.role ?? '',
    quote: testimonial?.quote ?? '',
    rating: testimonial?.rating ?? 5,
    sort_order: testimonial?.sort_order ?? 0,
  })

  function handleChange(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const payload = {
      name: form.name,
      role: form.role,
      quote: form.quote,
      rating: Number(form.rating),
      sort_order: Number(form.sort_order),
    }

    const { error } = isEdit
      ? await supabase.from('testimonials').update(payload).eq('id', testimonial.id)
      : await supabase.from('testimonials').insert(payload)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/testimonials')
    router.refresh()
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/25 focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 focus:border-[#4A8B2C] transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" hint="The person's full name">
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="e.g. Fatima Hassan"
            className={inputClass}
          />
        </Field>
        <Field label="Role" hint="Their title and organization">
          <input
            type="text"
            value={form.role}
            onChange={(e) => handleChange('role', e.target.value)}
            placeholder="e.g. Farm Owner, Hargeisa"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Quote" hint="Their testimonial text">
        <textarea
          value={form.quote}
          onChange={(e) => handleChange('quote', e.target.value)}
          required
          rows={4}
          placeholder="What did they say about Abqaal?"
          className={inputClass}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Rating" hint="Click to set star rating">
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleChange('rating', star)}
                className="p-0.5"
              >
                <Star
                  className={`h-7 w-7 transition-colors ${
                    star <= form.rating
                      ? 'fill-[#F5A623] text-[#F5A623]'
                      : 'text-[#E8E8E0]'
                  }`}
                />
              </button>
            ))}
          </div>
        </Field>
        <Field label="Sort Order" hint="Lower numbers appear first">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => handleChange('sort_order', e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

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
          {isEdit ? 'Update Testimonial' : 'Create Testimonial'}
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
