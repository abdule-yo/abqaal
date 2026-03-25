'use client'

import {
  Sprout,
  Droplets,
  GraduationCap,
  Handshake,
  ShieldCheck,
  Globe,
} from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const VALUES = [
  {
    icon: Sprout,
    title: 'Sustainability',
    description:
      'Environmentally responsible farming that balances productivity with ecological integrity for generations to come.',
  },
  {
    icon: Droplets,
    title: 'Water Stewardship',
    description:
      'Precision irrigation systems that reduce water consumption by up to 60% in water-stressed regions of East Africa.',
  },
  {
    icon: GraduationCap,
    title: 'Knowledge Transfer',
    description:
      'Empowering farmers with practical skills in modern agriculture, greenhouse management, and climate-smart techniques.',
  },
  {
    icon: Handshake,
    title: 'Inclusive Growth',
    description:
      'Targeting 50% women and 40% youth beneficiaries — ensuring equitable distribution of agricultural technology benefits.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality & Integrity',
    description:
      'International Ag-Tech best practices paired with rigorous monitoring and evaluation frameworks in every project.',
  },
  {
    icon: Globe,
    title: 'Local Roots, Global Standards',
    description:
      'Deep community trust and regional expertise combined with international technical benchmarks for world-class outcomes.',
  },
]

export default function Values() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section className="py-28 sm:py-36 px-4 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header — Left-aligned editorial style */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 mb-16">
          <div
            className={`lg:col-span-1 transition-all duration-700 ease-out ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight">
              What we
              <br />
              stand for
            </h2>
          </div>
          <p
            className={`lg:col-span-2 text-[#1A1A17]/55 text-base sm:text-[17px] leading-[1.8] self-end transition-all duration-700 ease-out ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            The principles that guide every project, partnership, and decision we make —
            rooted in a commitment to transform the agricultural landscape of the Horn of Africa
            while maintaining the highest standards of environmental and social responsibility.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {VALUES.map((value, index) => (
            <div
              key={value.title}
              className={`group transition-all duration-500 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${250 + index * 80}ms` }}
            >
              {/* Icon */}
              <div className="h-11 w-11 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-5 group-hover:bg-[#4A8B2C] transition-colors duration-400">
                <value.icon
                  className="h-5 w-5 text-[#4A8B2C] group-hover:text-white transition-colors duration-400"
                  strokeWidth={1.8}
                />
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-[#1A1A17] mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#1A1A17]/50 leading-[1.7]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
