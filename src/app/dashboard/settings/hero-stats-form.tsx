'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2, GripVertical, TrendingUp } from 'lucide-react'

interface HeroStat {
  value: number
  suffix: string
  label: string
  description: string
}

interface HeroStatsFormProps {
  initialStats: HeroStat[]
}

export function HeroStatsForm({ initialStats }: HeroStatsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [stats, setStats] = useState<HeroStat[]>(initialStats)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  function updateStat(index: number, field: keyof HeroStat, rawValue: string | number) {
    setStats((prev) =>
      prev.map((stat, i) =>
        i === index ? { ...stat, [field]: field === 'value' ? Number(rawValue) : rawValue } : stat
      )
    )
  }

  function addStat() {
    const newIndex = stats.length
    setStats((prev) => [...prev, { value: 0, suffix: '', label: '', description: '' }])
    setEditingIndex(newIndex)
  }

  function removeStat(index: number) {
    if (!confirm('Remove this stat?')) return
    setStats((prev) => prev.filter((_, i) => i !== index))
    setEditingIndex(null)
  }

  async function handleSave() {
    setLoading(true)
    setError('')
    setSuccess(false)

    const supabase = createClient()
    const { error } = await supabase
      .from('site_settings')
      .update({ value: JSON.parse(JSON.stringify(stats)) })
      .eq('key', 'hero_stats')

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setEditingIndex(null)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
    }

    setLoading(false)
  }

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-[#E8E8E0] bg-white text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/25 focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 focus:border-[#4A8B2C] transition-all'

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      {stats.map((stat, index) => {
        const isEditing = editingIndex === index

        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-200 ${
              isEditing
                ? 'border-[#4A8B2C]/30 bg-white shadow-sm'
                : 'border-[#E8E8E0] bg-white hover:border-[#E8E8E0]/80'
            }`}
          >
            {/* Preview row — always visible */}
            <div
              className="flex items-center gap-4 px-5 py-4 cursor-pointer"
              onClick={() => setEditingIndex(isEditing ? null : index)}
            >
              <div className="flex items-center gap-1 text-[#1A1A17]/15">
                <GripVertical className="h-4 w-4" />
              </div>

              {/* Stat preview */}
              <div className="flex-1 flex items-center gap-6">
                <div className="min-w-[80px]">
                  <span className="text-2xl font-extrabold text-[#4A8B2C]">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1A1A17] truncate">
                    {stat.label || <span className="text-[#1A1A17]/25 italic">Untitled stat</span>}
                  </p>
                  <p className="text-xs text-[#1A1A17]/35 truncate">
                    {stat.description || <span className="italic">No description</span>}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {stats.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeStat(index) }}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-[#1A1A17]/20 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Edit panel — slides open */}
            {isEditing && (
              <div className="px-5 pb-5 border-t border-[#E8E8E0]">
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A17]/50 mb-1.5">
                      Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={stat.value}
                        onChange={(e) => updateStat(index, 'value', e.target.value)}
                        className={inputClass}
                        placeholder="e.g. 5000"
                      />
                      <input
                        type="text"
                        value={stat.suffix}
                        onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                        className={`${inputClass} w-20 flex-shrink-0`}
                        placeholder="e.g. +"
                      />
                    </div>
                    <p className="text-[10px] text-[#1A1A17]/30 mt-1">
                      The big number and optional suffix like + or %
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1A17]/50 mb-1.5">
                      Title
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Farmers Trained"
                    />
                    <p className="text-[10px] text-[#1A1A17]/30 mt-1">
                      Short label shown below the number
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#1A1A17]/50 mb-1.5">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={stat.description}
                      onChange={(e) => updateStat(index, 'description', e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Through capacity building programs"
                    />
                    <p className="text-[10px] text-[#1A1A17]/30 mt-1">
                      A brief explanation shown in smaller text
                    </p>
                  </div>
                </div>

                {/* Live preview */}
                <div className="mt-4 p-4 rounded-xl bg-[#111110] text-center">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Preview</p>
                  <div className="text-3xl font-extrabold text-[#C5E84D] tracking-tight">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-white font-semibold text-sm mt-1">{stat.label || '—'}</div>
                  <div className="text-white/30 text-xs mt-0.5">{stat.description || '—'}</div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Add button */}
      <button
        type="button"
        onClick={addStat}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-[#E8E8E0] hover:border-[#4A8B2C]/30 text-sm font-medium text-[#1A1A17]/30 hover:text-[#4A8B2C] transition-all"
      >
        <Plus className="h-4 w-4" />
        Add another stat
      </button>

      {/* Feedback */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
      )}
      {success && (
        <p className="text-sm text-[#4A8B2C] bg-[#E8F5E9] px-4 py-2.5 rounded-xl flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Stats updated! Changes are live on the homepage.
        </p>
      )}

      {/* Save */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8B2C] hover:bg-[#1B5E20] disabled:opacity-60 text-white font-bold text-sm rounded-full transition-colors"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Changes
        </button>
      </div>
    </div>
  )
}
