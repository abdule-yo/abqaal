'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Sprout } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const HIGHLIGHTS = [
  {
    number: '01',
    title: 'Sustainable Crop Solutions',
    description:
      'We deliver modern agro-tech systems — from drip irrigation to greenhouse installations — designed for the arid landscapes of Somaliland and the Horn of Africa, boosting crop yields while conserving water.',
  },
  {
    number: '02',
    title: 'Expert Agricultural Consulting',
    description:
      'Our team of specialists partners with farmers, NGOs, and government bodies to provide hands-on training, soil analysis, and value-chain advisory that transforms subsistence farming into profitable agribusiness.',
  },
]

export default function AboutPreview() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section id="about-preview" className="py-24 px-4 bg-[#FAFAF5]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left — Image */}
          <div
            className={`relative transition-all duration-700 ease-out ${
              isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#E8F5E9]">
              <Image
                src="/about-preview.jpg"
                alt="Lush crop yield from Abqaal agricultural projects"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating accent badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="h-10 w-10 rounded-full bg-[#4A8B2C] flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                      15+
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[#C5E84D] flex items-center justify-center text-[#1A1A17] text-xs font-bold ring-2 ring-white">
                      YRS
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A17]">Years of Experience</p>
                    <p className="text-xs text-[#1A1A17]/50">Across the Horn of Africa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative dot grid */}
            <div className="absolute -top-4 -left-4 w-24 h-24 opacity-20">
              <svg viewBox="0 0 100 100" fill="none">
                {[...Array(5)].map((_, row) =>
                  [...Array(5)].map((_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={10 + col * 20}
                      cy={10 + row * 20}
                      r="3"
                      fill="#4A8B2C"
                    />
                  ))
                )}
              </svg>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 mb-5 transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Sprout className="h-5 w-5 text-[#4A8B2C]" />
              <span className="text-sm font-semibold text-[#4A8B2C] tracking-wide">
                Who We Are
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`text-4xl sm:text-5xl font-extrabold text-[#1A1A17] leading-[1.08] tracking-tight mb-10 transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              Cultivating Growth,
              <br />
              Empowering Farmers
            </h2>

            {/* Highlight Cards */}
            <div className="flex flex-col gap-5 mb-10">
              {HIGHLIGHTS.map((item, index) => (
                <div
                  key={item.number}
                  className={`bg-white rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-all duration-500 ease-out ${
                    isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${500 + index * 150}ms` }}
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-lg font-bold text-[#4A8B2C]">{item.number} .</span>
                    <h3 className="text-lg font-bold text-[#1A1A17]">{item.title}</h3>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#4A8B2C]/20 via-[#4A8B2C]/10 to-transparent mb-3" />
                  <p className="text-sm text-[#1A1A17]/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-semibold text-sm rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#4A8B2C]/25"
              >
                About Us
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
