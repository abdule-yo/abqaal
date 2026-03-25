'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function ImpactCTA() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section className="py-28 sm:py-36 px-4 bg-[#FAFAF5]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative bg-[#1B5E20] rounded-[2rem] overflow-hidden transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Background decorations */}
          <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#4A8B2C]/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-[#C5E84D]/8 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="relative z-10 px-8 sm:px-14 lg:px-20 py-16 sm:py-20 lg:py-24">
            {/* Impact metrics strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 pb-16 border-b border-white/10">
              {[
                { value: '100%', label: 'Yield Increase' },
                { value: '60%', label: 'Water Efficiency' },
                { value: '20-30%', label: 'Cost Reduction' },
                { value: '5,000+', label: 'Farmers Trained' },
              ].map((metric, index) => (
                <div
                  key={metric.label}
                  className={`transition-all duration-500 ease-out ${
                    isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#C5E84D] tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm text-white/40 font-medium">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Content */}
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-[1.1] tracking-tight">
                  Ready to transform
                  <br />
                  your farm?
                </h2>
              </div>
              <div className="lg:text-right">
                <p className="text-white/50 text-[15px] leading-[1.7] mb-8 max-w-md lg:ml-auto">
                  Whether you need greenhouse installations, irrigation systems, training,
                  or full-scale agricultural consulting — our team is ready.
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
      </div>
    </section>
  )
}
