import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Calendar, Users, Sprout } from 'lucide-react'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Discover our impactful agricultural projects across Somaliland and the Horn of Africa — from greenhouse installations to farmer training programs.',
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

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className="relative bg-[#1B5E20] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sprout className="h-5 w-5 text-[#C5E84D]" />
            <span className="text-sm font-semibold text-[#C5E84D] tracking-wide">
              Our Impact
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70 leading-relaxed">
            Real impact across {new Set(projects.map((p) => p.location)).size} regions — delivering
            agricultural solutions that transform communities.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { value: `${projects.length}`, label: 'Projects' },
              { value: `${new Set(projects.map((p) => p.partner)).size}`, label: 'Partners' },
              { value: `${new Set(projects.map((p) => p.location)).size}`, label: 'Regions' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[#C5E84D]">{s.value}</div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const accent =
                CATEGORY_ACCENTS[project.category] || 'from-[#4A8B2C] to-[#81C784]'
              const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES.Completed

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className={`group relative bg-white rounded-3xl overflow-hidden border border-[#E8E8E0] hover:border-transparent hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                    index === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className={`flex flex-col ${index === 0 ? 'md:flex-row' : ''}`}>
                    {/* Image placeholder */}
                    <div
                      className={`relative bg-gradient-to-br ${accent} ${
                        index === 0 ? 'md:w-1/2 h-64 md:h-auto' : 'h-52'
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sprout className="h-16 w-16 text-white/20" strokeWidth={1} />
                      </div>

                      {/* Status badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusStyle}`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Year badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`p-6 sm:p-8 ${index === 0 ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
                      <span className="text-xs font-semibold text-[#4A8B2C] tracking-wide uppercase mb-2 block">
                        {project.category}
                      </span>

                      <h2
                        className={`font-extrabold text-[#1A1A17] group-hover:text-[#4A8B2C] transition-colors mb-3 ${
                          index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'
                        }`}
                      >
                        {project.title}
                      </h2>

                      <p className="text-[#1A1A17]/60 text-sm leading-relaxed mb-5 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#1A1A17]/50">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {project.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {project.partner}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {project.duration}
                        </span>
                      </div>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#4A8B2C] group-hover:gap-3 transition-all">
                        View Project
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
