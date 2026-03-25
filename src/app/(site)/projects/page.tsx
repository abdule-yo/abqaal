import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, MapPin, Calendar, Users, Sprout } from 'lucide-react'
import { getProjects } from '@/lib/data'
import { ComingSoon } from '@/components/shared/ComingSoon'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Discover our impactful agricultural projects across Somaliland, Somalia, and the Horn of Africa — from greenhouse installations to farmer training programs.',
}

const STATUS_STYLES: Record<string, string> = {
  Completed: 'bg-[#E8F5E9] text-[#4A8B2C]',
  Ongoing: 'bg-[#FFF3E0] text-[#F57C00]',
  Upcoming: 'bg-[#E3F2FD] text-[#1976D2]',
}

const CATEGORY_ACCENTS: Record<string, string> = {
  'Greenhouse Construction': 'from-[#2D6A2E] to-[#4A8B2C]',
  'Irrigation Systems': 'from-[#1565C0] to-[#42A5F5]',
  'Training & Capacity Building': 'from-[#E65100] to-[#FF9800]',
  'Consulting & Technical Advisory': 'from-[#4A148C] to-[#9C27B0]',
  'Supply & Procurement': 'from-[#1B5E20] to-[#66BB6A]',
  'Research & Development': 'from-[#004D40] to-[#26A69A]',
  'Farm Management': 'from-[#3E2723] to-[#8D6E63]',
}

export const revalidate = 60

export default async function ProjectsPage() {
  const { projects } = await getProjects()

  if (projects.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAFAF5]">
        <section className="relative bg-[#1B5E20] pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="block text-[13px] font-semibold text-[#C5E84D] tracking-[0.2em] uppercase mb-5">Our Impact</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">Projects</h1>
          </div>
        </section>
        <ComingSoon
          title="Projects Coming Soon"
          description="We're documenting our agricultural projects across the Horn of Africa. Check back soon for case studies and impact reports."
          backHref="/"
          backLabel="Back to Home"
        />
      </main>
    )
  }

  const featured = projects[0]
  const rest = projects.slice(1)
  const uniqueLocations = new Set(projects.map((p) => p.location)).size
  const uniquePartners = new Set(projects.map((p) => p.partner)).size

  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className="relative bg-[#1B5E20] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#4A8B2C]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#C5E84D]/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="block text-[13px] font-semibold text-[#C5E84D] tracking-[0.2em] uppercase mb-5">
              Our Impact
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Projects
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              Real impact across {uniqueLocations} regions — delivering climate-smart
              agricultural solutions that transform communities and livelihoods.
            </p>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-white/10">
            {[
              { value: projects.length.toString(), label: 'Projects' },
              { value: uniquePartners.toString(), label: 'Partners' },
              { value: uniqueLocations.toString(), label: 'Regions' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[#C5E84D]">{s.value}</div>
                <div className="text-xs text-white/40 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <Link
          href={`/projects/${featured.slug}`}
          className="group block"
        >
          <div className="rounded-[2rem] bg-white overflow-hidden border border-[#E8E8E0] hover:border-transparent hover:shadow-2xl hover:shadow-black/[0.06] transition-all duration-500">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div
                className={`relative lg:w-1/2 h-64 lg:h-auto min-h-[320px] bg-gradient-to-br ${
                  CATEGORY_ACCENTS[featured.category] || 'from-[#4A8B2C] to-[#81C784]'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sprout className="h-20 w-20 text-white/15" strokeWidth={0.8} />
                </div>
                <div className="absolute top-5 left-5 flex gap-2">
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-[11px] font-bold ${
                      STATUS_STYLES[featured.status] || STATUS_STYLES.Completed
                    }`}
                  >
                    {featured.status}
                  </span>
                  <span className="inline-block px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold">
                    {featured.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
                <span className="text-[11px] font-bold text-[#4A8B2C] tracking-[0.2em] uppercase mb-3">
                  {featured.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A17] leading-tight mb-4 group-hover:text-[#4A8B2C] transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-[#1A1A17]/50 text-[15px] leading-[1.7] mb-6">
                  {featured.description}
                </p>
                <div className="flex flex-wrap items-center gap-5 text-sm text-[#1A1A17]/40 mb-6">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {featured.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {featured.partner}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {featured.duration}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#4A8B2C] group-hover:gap-3 transition-all duration-300">
                  View Project
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* All Projects Grid */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-3">
                All Projects
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A17] leading-tight">
                More of our work
              </h2>
            </div>
            <p className="hidden sm:block text-sm text-[#1A1A17]/40 font-medium">
              {rest.length} projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project) => {
              const accent =
                CATEGORY_ACCENTS[project.category] || 'from-[#4A8B2C] to-[#81C784]'
              const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES.Completed

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group block"
                >
                  <div className="rounded-2xl bg-white overflow-hidden border border-[#E8E8E0] hover:border-[#4A8B2C]/15 hover:shadow-lg hover:shadow-[#4A8B2C]/6 transition-all duration-500 hover:-translate-y-1">
                    {/* Image area */}
                    <div className={`relative h-48 bg-gradient-to-br ${accent}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sprout className="h-12 w-12 text-white/15" strokeWidth={0.8} />
                      </div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle}`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-[10px] font-bold text-[#4A8B2C]/60 tracking-[0.2em] uppercase">
                        {project.category}
                      </span>
                      <h3 className="text-[15px] font-bold text-[#1A1A17] mt-2 mb-2 leading-snug group-hover:text-[#4A8B2C] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[13px] text-[#1A1A17]/45 leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#1A1A17]/35 pt-4 border-t border-[#E8E8E0]">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {project.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.partner}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#1B5E20] rounded-[2rem] overflow-hidden">
            <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[#4A8B2C]/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-[250px] w-[250px] rounded-full bg-[#C5E84D]/8 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            <div className="relative z-10 px-8 sm:px-14 lg:px-20 py-16 sm:py-20 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
                  Start a project
                  <br />
                  with us
                </h2>
              </div>
              <div className="lg:text-right">
                <p className="text-white/50 text-[15px] leading-[1.7] mb-8 max-w-md lg:ml-auto">
                  Whether you need greenhouse installations, irrigation systems,
                  or full-scale agricultural consulting — let&apos;s deliver results
                  for your region.
                </p>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C5E84D] hover:bg-[#d4f060] text-[#1A1A17] font-bold text-[15px] rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#C5E84D]/25"
                  >
                    Get in Touch
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-[15px] rounded-full transition-all duration-300 border border-white/15"
                  >
                    Our Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
