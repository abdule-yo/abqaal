'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const PARTNERS = {
  international: [
    'United Nations FAO',
    'OXFAM International',
    'World Vision',
    'GIZ (Germany)',
    'ACTED',
    'USAID',
    'World Bank',
  ],
  local: [
    'Agriculture Development Organization (ADO)',
    'HAVAYOCO',
    'Candlelight',
    'BARWAAQO (BVO)',
    'SOM EARTH',
    'BDO',
    'SMEF',
  ],
  government: [
    'Ministry of Agricultural Development (MoAD)',
    'Hargeisa Group Hospital (HGH)',
  ],
}

export default function AboutPartners() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="partners" className="py-28 sm:py-36 px-4 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`grid lg:grid-cols-3 gap-8 lg:gap-16 mb-16 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
              Strategic Alliances
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight">
              Our partners
            </h2>
          </div>
          <p className="lg:col-span-2 text-[#1A1A17]/50 text-[15px] leading-[1.8] self-end">
            Collaborating with multilateral organizations, international NGOs, local civil society,
            and government institutions to ensure sustainable and community-led agricultural transformation.
          </p>
        </div>

        {/* Partner Groups */}
        <div className="space-y-12">
          {[
            { label: 'International & Multilateral', partners: PARTNERS.international },
            { label: 'Local NGO Partners', partners: PARTNERS.local },
            { label: 'Government Institutions', partners: PARTNERS.government },
          ].map((group, groupIndex) => (
            <div
              key={group.label}
              className={`transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + groupIndex * 150}ms` }}
            >
              <span className="block text-[11px] font-bold text-[#1A1A17]/25 tracking-[0.2em] uppercase mb-5">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-3">
                {group.partners.map((partner) => (
                  <span
                    key={partner}
                    className="inline-flex items-center h-12 px-6 bg-[#FAFAF5] rounded-full text-sm font-medium text-[#1A1A17]/55 border border-[#E8E8E0] hover:border-[#4A8B2C]/20 hover:text-[#1A1A17]/70 transition-all duration-300"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
