import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    "Explore Abqaal's five agricultural service divisions — supply and procurement, consulting, training, farm management, and research and development across the Horn of Africa.",
}

const gradientPalettes = [
  'from-[#4A8B2C]/80 to-[#1B5E20]',
  'from-[#1B5E20] to-[#4A8B2C]/70',
  'from-[#C5E84D]/60 to-[#4A8B2C]',
  'from-[#F5A623]/50 to-[#1B5E20]',
  'from-[#1B5E20] to-[#C5E84D]/50',
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className="relative bg-[#1B5E20] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#4A8B2C]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#C5E84D]/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-[#C5E84D] bg-white/10 rounded-full tracking-wide uppercase">
            What We Do
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Our Services
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white/85 leading-relaxed">
            Five specialized divisions delivering end-to-end agricultural
            solutions across the Horn of Africa — from procurement and
            consulting to research and development.
          </p>
        </div>
      </section>

      {/* Alternating Service Cards */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0
            const number = String(index + 1).padStart(2, '0')
            const displayFeatures = service.features.slice(0, 4)

            return (
              <div
                key={service.id}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-14 items-center`}
              >
                {/* Image / Gradient Placeholder */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  <div
                    className={`relative aspect-[4/3] rounded-3xl bg-gradient-to-br ${gradientPalettes[index % gradientPalettes.length]} overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-[120px] sm:text-[160px] font-extrabold leading-none select-none">
                        {number}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        {service.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <span className="inline-block text-sm font-bold text-[#F5A623] tracking-widest mb-3">
                    {number}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17] mb-4 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-[#1A1A17]/70 text-base sm:text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  <ul className="space-y-3 mb-8">
                    {displayFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#4A8B2C] shrink-0 mt-0.5" />
                        <span className="text-[#1A1A17]/80 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-[#4A8B2C] hover:text-[#1B5E20] font-bold text-base transition-colors duration-200 group"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-10 sm:p-16 bg-[#1B5E20] rounded-3xl text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[#4A8B2C]/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-[250px] w-[250px] rounded-full bg-[#C5E84D]/10 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Whether you need procurement support, expert advisory, or
                full-scale farm management, our team is ready to partner with
                you.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                Get in Touch
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
