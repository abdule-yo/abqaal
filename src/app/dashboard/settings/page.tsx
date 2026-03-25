import { getHeroStats } from '@/lib/data'
import { HeroStatsForm } from './hero-stats-form'

export default async function SettingsPage() {
  const stats = await getHeroStats()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Settings</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">
          Manage homepage content and site settings
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#1A1A17]">Hero Stats</h2>
          <p className="text-sm text-[#1A1A17]/40 mt-1">
            The animated counter stats shown on the homepage
          </p>
        </div>
        <HeroStatsForm initialStats={stats} />
      </div>
    </div>
  )
}
