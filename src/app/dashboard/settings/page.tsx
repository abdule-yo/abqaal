import { getHeroStats } from '@/lib/data'
import { HeroStatsForm } from './hero-stats-form'
import { BarChart3 } from 'lucide-react'

export default async function SettingsPage() {
  const stats = await getHeroStats()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Settings</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">
          Control what appears on the public website
        </p>
      </div>

      {/* Hero Stats Section */}
      <div className="bg-white rounded-2xl border border-[#E8E8E0] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E8E8E0] flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#111110] flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-[#C5E84D]" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-[#1A1A17]">Homepage Stats</h2>
            <p className="text-xs text-[#1A1A17]/35">
              The animated counter numbers visitors see on the homepage. Click any stat to edit it.
            </p>
          </div>
        </div>

        <div className="p-6">
          <HeroStatsForm initialStats={stats} />
        </div>
      </div>
    </div>
  )
}
