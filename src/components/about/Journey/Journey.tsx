'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const MILESTONES = [
  {
    year: '2016',
    title: 'The Beginning',
    description:
      'Founded in Hargeisa, Somaliland with a mission to bridge the growing gap between traditional farming and modern agricultural technology across the Horn of Africa.',
  },
  {
    year: '2020',
    title: 'Scaling Greenhouse Infrastructure',
    description:
      'Surpassed 100 greenhouse installations across Somaliland, establishing controlled-environment agriculture as a viable path for local farmers facing climate variability.',
  },
  {
    year: '2022',
    title: 'Regional Expansion',
    description:
      'Extended operations into Puntland and strategic areas of South Somalia, bringing precision irrigation and farmer training to new communities and forging partnerships with international organizations.',
  },
  {
    year: '2024',
    title: '317 Projects Milestone',
    description:
      'Completed 317 projects across 12 regions — including greenhouses, irrigation systems, and comprehensive training programs reaching 5,000+ farmers and academics.',
  },
  {
    year: '2026',
    title: 'CSA Supply Chain Expansion',
    description:
      'Launching a climate-smart agriculture technology supply chain and distribution network to make modern Ag-Tech tools accessible and affordable across the entire Horn of Africa.',
  },
]

export default function Journey() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 })

  return (
    <section className="py-28 sm:py-36 px-4 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight">
            A decade of impact
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-[#E8E8E0] sm:-translate-x-px" />

          <div className="space-y-12 sm:space-y-0">
            {MILESTONES.map((milestone, index) => {
              const isLeft = index % 2 === 0

              return (
                <div
                  key={milestone.year}
                  className={`relative sm:flex sm:items-start transition-all duration-700 ease-out ${
                    isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Mobile: always right of the line */}
                  {/* Desktop: alternating */}

                  {/* Left content (desktop only) */}
                  <div
                    className={`hidden sm:block w-1/2 ${
                      isLeft ? 'pr-12 text-right' : ''
                    }`}
                  >
                    {isLeft && (
                      <div className="pb-16">
                        <span className="text-sm font-extrabold text-[#C5E84D] tracking-wide">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold text-[#1A1A17] mt-2 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-[#1A1A17]/50 leading-[1.7]">
                          {milestone.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="h-3 w-3 rounded-full bg-[#4A8B2C] ring-4 ring-white" />
                  </div>

                  {/* Right content (desktop) / All content (mobile) */}
                  <div
                    className={`pl-14 sm:pl-0 sm:w-1/2 ${
                      isLeft ? 'sm:pl-12' : 'sm:pl-12'
                    }`}
                  >
                    {/* Desktop: show only if right-aligned */}
                    <div className={`${isLeft ? 'sm:hidden' : ''} pb-0 sm:pb-16`}>
                      <span className="text-sm font-extrabold text-[#C5E84D] tracking-wide">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-[#1A1A17] mt-2 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-[#1A1A17]/50 leading-[1.7]">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
