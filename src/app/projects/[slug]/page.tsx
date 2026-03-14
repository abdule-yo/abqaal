import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Sprout,
} from 'lucide-react'
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
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
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const accent = CATEGORY_ACCENTS[project.category] || 'from-[#4A8B2C] to-[#81C784]'
  const relatedProjects = projects.filter((p) => p.id !== project.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${accent} pt-32 pb-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold">
              {project.status}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-6 mt-8 text-white/70 text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {project.location}, Somaliland
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" />
              {project.partner}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {project.year}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {project.duration}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* About */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E8E0] mb-8">
                <h2 className="text-2xl font-extrabold text-[#1A1A17] mb-6">
                  About This Project
                </h2>
                <p className="text-[#1A1A17]/70 leading-relaxed text-base">
                  {project.longDescription}
                </p>
              </div>

              {/* Impact */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E8E0]">
                <h2 className="text-2xl font-extrabold text-[#1A1A17] mb-6">
                  Key Impact
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.impact.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 p-4 bg-[#FAFAF5] rounded-2xl"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[#4A8B2C] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1A1A17]/80 font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8E8E0]">
                <h3 className="text-lg font-extrabold text-[#1A1A17] mb-5">Project Details</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Location', value: `${project.location}, Somaliland`, icon: MapPin },
                    { label: 'Partner', value: project.partner, icon: Users },
                    { label: 'Duration', value: project.duration, icon: Clock },
                    { label: 'Year', value: String(project.year), icon: Calendar },
                  ].map((detail) => (
                    <div key={detail.label} className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                        <detail.icon className="h-4 w-4 text-[#4A8B2C]" />
                      </div>
                      <div>
                        <div className="text-xs text-[#1A1A17]/40 font-medium">{detail.label}</div>
                        <div className="text-sm text-[#1A1A17] font-semibold">{detail.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#1B5E20] rounded-3xl p-6 text-center">
                <Sprout className="h-10 w-10 text-[#C5E84D] mx-auto mb-3" strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-white mb-2">
                  Start a Similar Project
                </h3>
                <p className="text-white/60 text-sm mb-5">
                  Let&apos;s discuss how we can deliver results for your region.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8B2C] hover:bg-[#3d7424] text-white font-semibold text-sm rounded-full transition-all duration-300 hover:scale-[1.03]"
                >
                  Get in Touch
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#1A1A17] mb-8">More Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((rp) => {
              const rpAccent = CATEGORY_ACCENTS[rp.category] || 'from-[#4A8B2C] to-[#81C784]'
              return (
                <Link
                  key={rp.id}
                  href={`/projects/${rp.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#E8E8E0] hover:border-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`h-40 bg-gradient-to-br ${rpAccent} flex items-center justify-center`}>
                    <Sprout className="h-12 w-12 text-white/20" strokeWidth={1} />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-[#4A8B2C] uppercase tracking-wide">
                      {rp.category}
                    </span>
                    <h3 className="text-base font-bold text-[#1A1A17] mt-1 group-hover:text-[#4A8B2C] transition-colors line-clamp-1">
                      {rp.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-3 text-xs text-[#1A1A17]/50">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {rp.location}
                      </span>
                      <span>{rp.year}</span>
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
