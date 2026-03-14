'use client'

import { Sprout } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { PARTNERS } from '@/lib/constants'

export default function Partners() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="partners" className="py-20 px-4 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sprout className="h-5 w-5 text-[#4A8B2C]" />
            <span className="text-sm font-semibold text-[#4A8B2C] tracking-wide">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A17] leading-[1.08] tracking-tight">
            Who We Work With
          </h2>
        </div>

        {/* Scrolling logo strip */}
        <div
          className={`transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="overflow-hidden">
              <div className="partner-track">
                <div className="partner-content">
                  {PARTNERS.map((partner) => (
                    <div
                      key={partner}
                      className="flex-shrink-0 flex items-center justify-center h-20 px-10 bg-[#FAFAF5] rounded-2xl border border-[#E8F5E9]/60 hover:border-[#4A8B2C]/20 hover:shadow-sm transition-all duration-300"
                    >
                      <span className="text-sm font-bold text-[#1A1A17]/50 whitespace-nowrap tracking-wide">
                        {partner}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="partner-content" aria-hidden="true">
                  {PARTNERS.map((partner) => (
                    <div
                      key={partner}
                      className="flex-shrink-0 flex items-center justify-center h-20 px-10 bg-[#FAFAF5] rounded-2xl border border-[#E8F5E9]/60 hover:border-[#4A8B2C]/20 hover:shadow-sm transition-all duration-300"
                    >
                      <span className="text-sm font-bold text-[#1A1A17]/50 whitespace-nowrap tracking-wide">
                        {partner}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
