import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Sprout,
} from 'lucide-react'
import { getProjectBySlug, getProjects, getAllProjectSlugs } from '@/lib/data'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.title,
    description: project.description,
  }
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const accent = CATEGORY_ACCENTS[project.category] || 'from-[#4A8B2C] to-[#81C784]'
  const { projects: allProjects } = await getProjects()
  const relatedProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3)

  const PROJECT_DETAILS = [
    { label: 'Location', value: project.location, icon: MapPin },
    { label: 'Partner', value: project.partner, icon: Users },
    { label: 'Duration', value: project.duration, icon: Clock },
    { label: 'Year', value: String(project.year), icon: Calendar },
  ]

  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${accent} pt-32 pb-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-10 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide">
                {project.category}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide">
                {project.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.08] tracking-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-6 mt-8 text-white/50 text-sm">
              {PROJECT_DETAILS.map((d) => (
                <span key={d.label} className="inline-flex items-center gap-2">
                  <d.icon className="h-4 w-4" />
                  {d.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-[#E8E8E0]">
                <span className="block text-[11px] font-bold text-[#4A8B2C]/50 tracking-[0.2em] uppercase mb-4">
                  Overview
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A17] mb-5">
                  About This Project
                </h2>
                <div className="text-[#1A1A17]/55 text-[15px] leading-[1.8] prose prose-sm prose-green max-w-none">
                  <ReactMarkdown>{project.longDescription}</ReactMarkdown>
                </div>
              </div>

              {/* Impact */}
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-[#E8E8E0]">
                <span className="block text-[11px] font-bold text-[#4A8B2C]/50 tracking-[0.2em] uppercase mb-4">
                  Results
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A17] mb-6">
                  Key Impact
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.impact.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 p-4 bg-[#FAFAF5] rounded-xl"
                    >
                      <CheckCircle2 className="h-[18px] w-[18px] text-[#4A8B2C] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1A1A17]/65 font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-5">
              {/* Details Card */}
              <div className="bg-white rounded-[2rem] p-7 border border-[#E8E8E0]">
                <h3 className="text-[15px] font-bold text-[#1A1A17] mb-6">Project Details</h3>
                <div className="space-y-5">
                  {PROJECT_DETAILS.map((detail) => (
                    <div key={detail.label} className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                        <detail.icon className="h-4 w-4 text-[#4A8B2C]" />
                      </div>
                      <div>
                        <div className="text-[11px] text-[#1A1A17]/30 font-medium tracking-wide uppercase">
                          {detail.label}
                        </div>
                        <div className="text-sm text-[#1A1A17] font-semibold mt-0.5">
                          {detail.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#1B5E20] rounded-[2rem] p-7 overflow-hidden relative">
                <div className="absolute -top-10 -right-10 h-[120px] w-[120px] rounded-full bg-[#4A8B2C]/20 blur-2xl" />
                <div className="relative z-10 text-center">
                  <Sprout className="h-10 w-10 text-[#C5E84D] mx-auto mb-4" strokeWidth={1.2} />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Start a Similar Project
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-6">
                    Let&apos;s discuss how we can deliver results for your region.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5E84D] hover:bg-[#d4f060] text-[#1A1A17] font-bold text-sm rounded-full transition-all duration-300 hover:scale-[1.03]"
                  >
                    Get in Touch
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="block text-[11px] font-bold text-[#4A8B2C]/50 tracking-[0.2em] uppercase mb-2">
                  Explore More
                </span>
                <h2 className="text-2xl font-extrabold text-[#1A1A17]">
                  More Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#4A8B2C] hover:text-[#1B5E20] transition-colors"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProjects.map((rp) => {
                const rpAccent = CATEGORY_ACCENTS[rp.category] || 'from-[#4A8B2C] to-[#81C784]'
                return (
                  <Link
                    key={rp.id}
                    href={`/projects/${rp.slug}`}
                    className="group block"
                  >
                    <div className="rounded-2xl bg-white overflow-hidden border border-[#E8E8E0] hover:border-[#4A8B2C]/15 hover:shadow-lg hover:shadow-[#4A8B2C]/6 transition-all duration-500 hover:-translate-y-1">
                      <div className={`h-40 bg-gradient-to-br ${rpAccent} flex items-center justify-center`}>
                        <Sprout className="h-10 w-10 text-white/15" strokeWidth={0.8} />
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-bold text-[#4A8B2C]/50 uppercase tracking-[0.15em]">
                          {rp.category}
                        </span>
                        <h3 className="text-[14px] font-bold text-[#1A1A17] mt-1.5 group-hover:text-[#4A8B2C] transition-colors duration-300 line-clamp-1">
                          {rp.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#E8E8E0] text-[11px] text-[#1A1A17]/35">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {rp.location}
                          </span>
                          <span>{rp.year}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
