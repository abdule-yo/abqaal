'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Trash2 } from 'lucide-react'

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

  function updateStat(index: number, field: keyof HeroStat, rawValue: string | number) {
    setStats((prev) =>
      prev.map((stat, i) =>
        i === index ? { ...stat, [field]: field === 'value' ? Number(rawValue) : rawValue } : stat
      )
    )
  }

  function addStat() {
    setStats((prev) => [...prev, { value: 0, suffix: '', label: '', description: '' }])
  }

  function removeStat(index: number) {
    setStats((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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
      router.refresh()
    }

    setLoading(false)
  }

  const inputClass =
    'w-full px-3 py-2.5 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/25 focus:outline-none focus:ring-2 focus:ring-[#4A8B2C]/20 focus:border-[#4A8B2C] transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#FAFAF5] rounded-xl p-5 border border-[#E8E8E0]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#1A1A17]/40 uppercase tracking-wider">
              Stat #{index + 1}
            </span>
            {stats.length > 1 && (
              <button
                type="button"
                onClick={() => removeStat(index)}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#1A1A17]/50 mb-1">Value</label>
              <input
                type="number"
                value={stat.value}
                onChange={(e) => updateStat(index, 'value', e.target.value)}
                className={inputClass}
                placeholder="5000"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1A1A17]/50 mb-1">Suffix</label>
              <input
                type="text"
                value={stat.suffix}
                onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                className={inputClass}
                placeholder="+ or %"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1A1A17]/50 mb-1">Label</label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(index, 'label', e.target.value)}
                className={inputClass}
                placeholder="Farmers Trained"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1A1A17]/50 mb-1">Description</label>
              <input
                type="text"
                value={stat.description}
                onChange={(e) => updateStat(index, 'description', e.target.value)}
                className={inputClass}
                placeholder="Short note"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addStat}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#4A8B2C] hover:bg-[#E8F5E9] rounded-lg border border-dashed border-[#4A8B2C]/30 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Stat
      </button>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
      )}
      {success && (
        <p className="text-sm text-[#4A8B2C] bg-[#E8F5E9] px-4 py-2.5 rounded-xl">Stats saved successfully!</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8B2C] hover:bg-[#1B5E20] disabled:opacity-60 text-white font-bold text-sm rounded-full transition-colors"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Stats
        </button>
      </div>
    </form>
  )
}
