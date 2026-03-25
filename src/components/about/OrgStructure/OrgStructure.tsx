'use client'

import {
  Droplets,
  Factory,
  Wheat,
  FlaskConical,
  TreePine,
  GraduationCap,
  MapPin,
} from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const EXPERTISE = [
  {
    icon: Factory,
    title: 'Greenhouse Farming',
    stat: '317',
    statLabel: 'Installed',
    description: 'State-of-the-art controlled environment agriculture enabling year-round cultivation.',
    span: 'sm:col-span-2 lg:col-span-1 lg:row-span-2',
    tall: true,
  },
  {
    icon: Droplets,
    title: 'Modern Irrigation',
    stat: '60%',
    statLabel: 'Water Saved',
    description: 'Precision drip, micro-sprinkler, rain gun, and center pivot systems.',
    span: '',
    tall: false,
  },
  {
    icon: Wheat,
    title: 'Agricultural Inputs',
    stat: '100%',
    statLabel: 'Yield Boost',
    description: 'Certified seeds, fertilizers, crop protection products.',
    span: '',
    tall: false,
  },
  {
    icon: FlaskConical,
    title: 'Soil Analysis',
    stat: '317',
    statLabel: 'Projects',
    description: 'Comprehensive nutrient profiling and soil health assessments.',
    span: '',
    tall: false,
  },
  {
    icon: TreePine,
    title: 'Plant Nurseries',
    stat: '12',
    statLabel: 'Regions',
    description: 'Disease-resistant seedlings for every farm project.',
    span: '',
    tall: false,
  },
  {
    icon: GraduationCap,
    title: 'Vocational Training',
    stat: '5K+',
    statLabel: 'Trained',
    description: 'Practical skills in irrigation, greenhouse ops, and agribusiness.',
    span: 'sm:col-span-2 lg:col-span-1',
    tall: false,
  },
]

const REGIONS = [
  {
    name: 'Somaliland',
    areas: ['Marodi-jeex', 'Sanaag', 'Awdal', 'Togdheer', 'Sool', 'Saaxil'],
    accent: '#C5E84D',
  },
  {
    name: 'Somalia',
    areas: ['Garowe', 'Galkacyo', 'Qardho', 'Bosasso', 'Dhusamareeb'],
    accent: '#F5A623',
  },
  {
    name: 'Somali Region, Ethiopia',
    areas: ['Jigjiga', 'Dire Dawa'],
    accent: '#81C784',
  },
]

export default function OrgStructure() {
  const { ref: expertiseRef, isIntersecting: expertiseVisible } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: regionsRef, isIntersecting: regionsVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <>
      {/* Core Expertise — Bento Grid */}
      <section className="py-28 sm:py-36 px-4 bg-[#FAFAF5]" ref={expertiseRef}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`mb-16 transition-all duration-700 ease-out ${
              expertiseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
              Core Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight max-w-md">
              Integrated agricultural solutions
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPERTISE.map((item, index) => (
              <div
                key={item.title}
                className={`group relative bg-white rounded-2xl border border-[#E8E8E0] hover:border-[#4A8B2C]/20 overflow-hidden transition-all duration-500 ease-out hover:shadow-lg hover:shadow-[#4A8B2C]/6 hover:-translate-y-0.5 ${item.span} ${
                  item.tall ? 'p-8 flex flex-col justify-between min-h-[320px]' : 'p-7'
                } ${
                  expertiseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${150 + index * 80}ms` }}
              >
                {item.tall ? (
                  <>
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-6 group-hover:bg-[#4A8B2C] transition-colors duration-400">
                        <item.icon className="h-6 w-6 text-[#4A8B2C] group-hover:text-white transition-colors duration-400" strokeWidth={1.8} />
                      </div>
                      <h3 className="text-lg font-bold text-[#1A1A17] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#1A1A17]/50 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-[#E8E8E0]">
                      <span className="text-4xl font-extrabold text-[#4A8B2C]">{item.stat}</span>
                      <span className="block text-xs text-[#1A1A17]/40 font-medium mt-1">{item.statLabel}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-10 w-10 rounded-lg bg-[#E8F5E9] flex items-center justify-center group-hover:bg-[#4A8B2C] transition-colors duration-400">
                        <item.icon className="h-5 w-5 text-[#4A8B2C] group-hover:text-white transition-colors duration-400" strokeWidth={1.8} />
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-[#4A8B2C]">{item.stat}</span>
                        <span className="block text-[10px] text-[#1A1A17]/35 font-medium">{item.statLabel}</span>
                      </div>
                    </div>
                    <h3 className="text-[15px] font-bold text-[#1A1A17] mb-1.5">{item.title}</h3>
                    <p className="text-[13px] text-[#1A1A17]/50 leading-relaxed">{item.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Presence */}
      <section className="relative py-28 sm:py-36 px-4 bg-[#111110] overflow-hidden" ref={regionsRef}>
        {/* Subtle grid bg */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            {/* Left — Text */}
            <div
              className={`transition-all duration-700 ease-out ${
                regionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="block text-[13px] font-semibold text-[#C5E84D] tracking-[0.2em] uppercase mb-5">
                Where We Operate
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                Strategic regional
                <br />
                presence
              </h2>
              <p className="text-white/45 text-[15px] leading-[1.8] max-w-md mb-12">
                Our extensive coverage ensures we reach the most vulnerable and high-potential
                farming communities across Somaliland, Somalia, and the Somali Region of Ethiopia.
                Deeply rooted in local context with over a decade of community trust.
              </p>

              {/* Quick stats row */}
              <div className="flex gap-12">
                {[
                  { value: '12', label: 'Regions' },
                  { value: '3', label: 'Countries' },
                  { value: '10+', label: 'Years' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-extrabold text-[#C5E84D]">{s.value}</div>
                    <div className="text-xs text-white/35 font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Region Cards */}
            <div className="space-y-4">
              {REGIONS.map((region, index) => (
                <div
                  key={region.name}
                  className={`rounded-2xl border border-white/8 p-6 sm:p-8 hover:border-white/15 transition-all duration-500 ease-out ${
                    regionsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: region.accent }} />
                    <h3 className="text-lg font-bold text-white">{region.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.areas.map((area) => (
                      <span
                        key={area}
                        className="inline-block px-3.5 py-1.5 rounded-full bg-white/5 text-[13px] text-white/50 font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
