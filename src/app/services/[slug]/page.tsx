import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import { services } from '@/data/services'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${service.title} — Abqaal Services`,
    description: service.description,
  }
}

const processSteps = [
  {
    number: '01',
    label: 'Assess',
    description:
      'We evaluate your current operations, resources, and goals to understand what success looks like for you.',
  },
  {
    number: '02',
    label: 'Plan',
    description:
      'Our experts design a tailored strategy with clear milestones, timelines, and measurable outcomes.',
  },
  {
    number: '03',
    label: 'Deliver',
    description:
      'We execute with precision, providing ongoing support and transparent reporting at every stage.',
  },
]

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const relatedServices = services.filter((s) => s.id !== service.id)

  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className="relative bg-[#1B5E20] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#4A8B2C]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#C5E84D]/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link
              href="/services"
              className="hover:text-white transition-colors duration-200"
            >
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-medium">{service.title}</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg sm:text-xl text-white/85 leading-relaxed">
            {service.description}
          </p>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg border border-white/10"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-[#4A8B2C] bg-[#4A8B2C]/10 rounded-full tracking-wide uppercase">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17]">
              What We Deliver
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-[#E8E8E0] hover:border-[#4A8B2C]/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#4A8B2C]/10 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-[#4A8B2C]" />
                </div>
                <span className="text-[#1A1A17] text-[15px] leading-relaxed font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Approach */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-[#F5A623] bg-[#F5A623]/10 rounded-full tracking-wide uppercase">
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17]">
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Lines (desktop) */}
            <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-[2px] bg-gradient-to-r from-[#4A8B2C] via-[#C5E84D] to-[#4A8B2C]" />

            {processSteps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {/* Numbered Circle */}
                <div className="relative z-10 mx-auto mb-6 flex items-center justify-center h-32 w-32">
                  <div className="absolute inset-0 rounded-full bg-[#4A8B2C]/10" />
                  <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-[#1B5E20] shadow-lg">
                    <span className="text-2xl font-extrabold text-white">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-[#1A1A17] mb-3">
                  {step.label}
                </h3>
                <p className="text-[#1A1A17]/70 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Arrow between steps (mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <ArrowRight className="h-6 w-6 text-[#4A8B2C]/40 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-10 sm:p-16 bg-[#1B5E20] rounded-3xl text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[#4A8B2C]/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-[250px] w-[250px] rounded-full bg-[#C5E84D]/10 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Interested in {service.title}?
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Get in touch with our team to discuss how we can support your
                agricultural goals with tailored {service.title.toLowerCase()}{' '}
                solutions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg border border-white/10"
              >
                Contact Us About {service.title}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A17]">
              Explore Our Other Services
            </h2>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-2 text-[#4A8B2C] hover:text-[#1B5E20] font-bold text-sm transition-colors duration-200 group"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((related) => (
              <Link
                key={related.id}
                href={`/services/${related.slug}`}
                className="group flex flex-col p-6 bg-white rounded-3xl border border-[#E8E8E0] hover:border-[#4A8B2C]/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Gradient Bar */}
                <div className="h-2 w-12 rounded-full bg-gradient-to-r from-[#4A8B2C] to-[#C5E84D] mb-5" />

                <h3 className="text-lg font-extrabold text-[#1A1A17] group-hover:text-[#4A8B2C] transition-colors duration-200 mb-3">
                  {related.title}
                </h3>
                <p className="text-sm text-[#1A1A17]/60 leading-relaxed line-clamp-3 mb-5">
                  {related.description}
                </p>

                <div className="mt-auto flex items-center gap-1.5 text-[#4A8B2C] text-sm font-bold">
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile link */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#4A8B2C] font-bold text-sm"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
