'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { PARTNERS } from '@/lib/constants'

export default function Partners() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="partners" className="py-24 sm:py-28 px-4 bg-[#FAFAF5] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
            Trusted Partners
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight">
            Who we work with
          </h2>
        </div>

        {/* Scrolling strip */}
        <div
          className={`transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAFAF5] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAFAF5] to-transparent z-10" />

            <div className="overflow-hidden">
              <div className="partner-track">
                <div className="partner-content">
                  {PARTNERS.map((partner) => (
                    <div
                      key={partner}
                      className="flex-shrink-0 flex items-center justify-center h-16 px-8 bg-white rounded-full border border-[#E8E8E0] hover:border-[#4A8B2C]/15 transition-all duration-300"
                    >
                      <span className="text-sm font-semibold text-[#1A1A17]/40 whitespace-nowrap">
                        {partner}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="partner-content" aria-hidden="true">
                  {PARTNERS.map((partner) => (
                    <div
                      key={partner}
                      className="flex-shrink-0 flex items-center justify-center h-16 px-8 bg-white rounded-full border border-[#E8E8E0]"
                    >
                      <span className="text-sm font-semibold text-[#1A1A17]/40 whitespace-nowrap">
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
