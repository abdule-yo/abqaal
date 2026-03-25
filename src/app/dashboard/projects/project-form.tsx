'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import { ImageUploadField } from '@/components/dashboard/image-upload-field'
import { MarkdownEditorField } from '@/components/dashboard/markdown-editor-field'
import type { Database } from '@/types/database'

type Project = Database['public']['Tables']['projects']['Row']

const CATEGORIES = [
  'Greenhouse Construction',
  'Irrigation Systems',
  'Training & Capacity Building',
  'Consulting & Technical Advisory',
  'Supply & Procurement',
  'Research & Development',
  'Farm Management',
]

const STATUSES = ['Completed', 'Ongoing', 'Upcoming'] as const

interface ProjectFormProps {
  project?: Project
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

export function ProjectForm({ project }: ProjectFormProps) {
  const isEdit = !!project
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: project?.title ?? '',
    slug: project?.slug ?? '',
    description: project?.description ?? '',
    long_description: project?.long_description ?? '',
    location: project?.location ?? '',
    partner: project?.partner ?? '',
    year: project?.year ?? new Date().getFullYear(),
    category: project?.category ?? CATEGORIES[0],
    duration: project?.duration ?? '',
    status: project?.status ?? ('Upcoming' as const),
    impact: project?.impact?.join('\n') ?? '',
    cover_image: project?.cover_image ?? '',
    cover_color: project?.cover_color ?? '',
  })

  const [useColorInstead, setUseColorInstead] = useState(!!project?.cover_color && !project?.cover_image)

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function handleChange(field: string, value: string | number) {
    setForm((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === 'title' && !isEdit) {
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
      title: form.title,
      slug: form.slug,
      description: form.description,
      long_description: form.long_description,
      location: form.location,
      partner: form.partner,
      year: Number(form.year),
      category: form.category,
      duration: form.duration,
      status: form.status as 'Completed' | 'Ongoing' | 'Upcoming',
      impact: form.impact.split('\n').map((s) => s.trim()).filter(Boolean),
      cover_image: useColorInstead ? '' : form.cover_image,
      cover_color: useColorInstead ? form.cover_color : '',
    }

    const { error } = isEdit
      ? await supabase.from('projects').update(payload).eq('id', project.id)
      : await supabase.from('projects').insert(payload)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/projects')
    router.refresh()
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/25 focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 focus:border-[#4A8B2C] transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title & Slug */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Project Title" hint="The name that appears on the website">
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            placeholder="e.g. Hargeisa Greenhouse Installation"
            className={inputClass}
          />
        </Field>
        <Field label="URL Slug" hint="Auto-generated from title. Used in the page URL">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            required
            placeholder="e.g. hargeisa-greenhouse"
            className={inputClass}
          />
        </Field>
      </div>

      {/* Cover Image or Color */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <label className="text-[13px] font-semibold text-[#1A1A17]">Cover</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUseColorInstead(false)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                !useColorInstead ? 'bg-[#4A8B2C] text-white' : 'bg-[#FAFAF5] text-[#1A1A17]/50 border border-[#E8E8E0]'
              }`}
            >
              Image
            </button>
            <button
              type="button"
              onClick={() => setUseColorInstead(true)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                useColorInstead ? 'bg-[#4A8B2C] text-white' : 'bg-[#FAFAF5] text-[#1A1A17]/50 border border-[#E8E8E0]'
              }`}
            >
              Color
            </button>
          </div>
        </div>

        {useColorInstead ? (
          <Field label="" hint="Enter a hex color code for the project card background">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.cover_color || '#4A8B2C'}
                onChange={(e) => handleChange('cover_color', e.target.value)}
                className="h-12 w-12 rounded-lg border border-[#E8E8E0] cursor-pointer"
              />
              <input
                type="text"
                value={form.cover_color}
                onChange={(e) => handleChange('cover_color', e.target.value)}
                placeholder="#4A8B2C"
                className={inputClass}
              />
            </div>
          </Field>
        ) : (
          <ImageUploadField
            label=""
            hint="Upload a cover image for the project"
            folder="projects"
            value={form.cover_image}
            onChange={(url) => handleChange('cover_image', url)}
            searchQuery={form.title || undefined}
          />
        )}
      </div>

      {/* Short Description */}
      <Field label="Short Description" hint="1-2 sentences shown on the project card in the listing page">
        <textarea
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
          rows={2}
          placeholder="e.g. Installation of 10 modern greenhouse structures for year-round vegetable production in Hargeisa."
          className={inputClass}
        />
      </Field>

      {/* Full Description (Markdown) */}
      <MarkdownEditorField
        label="Full Description"
        hint="Detailed project story shown on the project detail page. Supports markdown formatting."
        value={form.long_description}
        onChange={(val) => handleChange('long_description', val)}
      />

      {/* Category, Status, Year */}
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="Category" hint="The type of service this project falls under">
          <select value={form.category} onChange={(e) => handleChange('category', e.target.value)} className={inputClass}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </Field>
        <Field label="Status" hint="Current project state">
          <select value={form.status} onChange={(e) => handleChange('status', e.target.value)} className={inputClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Year" hint="The year this project started or was completed">
          <input type="number" value={form.year} onChange={(e) => handleChange('year', e.target.value)} required className={inputClass} />
        </Field>
      </div>

      {/* Location, Partner, Duration */}
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="Location" hint="City or region where the project took place">
          <input type="text" value={form.location} onChange={(e) => handleChange('location', e.target.value)} required placeholder="e.g. Hargeisa" className={inputClass} />
        </Field>
        <Field label="Partner" hint="Organization that funded or collaborated on this project">
          <input type="text" value={form.partner} onChange={(e) => handleChange('partner', e.target.value)} required placeholder="e.g. World Bank" className={inputClass} />
        </Field>
        <Field label="Duration" hint="How long the project lasted">
          <input type="text" value={form.duration} onChange={(e) => handleChange('duration', e.target.value)} required placeholder="e.g. 8 months" className={inputClass} />
        </Field>
      </div>

      {/* Impact */}
      <Field label="Impact Points" hint="Key results and achievements. Write one per line — each line becomes a bullet point on the website.">
        <textarea
          value={form.impact}
          onChange={(e) => handleChange('impact', e.target.value)}
          rows={5}
          placeholder={"10 greenhouses installed and operational\n40 farmers trained in greenhouse management\n3x increase in vegetable output\nYear-round production capacity established"}
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
          {isEdit ? 'Update Project' : 'Create Project'}
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
