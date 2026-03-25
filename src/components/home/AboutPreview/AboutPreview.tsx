'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function AboutPreview() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section id="about-preview" className="py-28 sm:py-36 px-4 bg-[#FAFAF5]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left — Image */}
          <div
            className={`relative transition-all duration-700 ease-out ${
              isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#E8F5E9]">
              <Image
                src="/about-preview.jpg"
                alt="Abqaal agricultural projects in the Horn of Africa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating experience badge */}
            <div className="absolute -bottom-5 -right-4 sm:right-8 bg-white rounded-2xl px-6 py-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="h-11 w-11 rounded-full bg-[#4A8B2C] flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                    10+
                  </div>
                  <div className="h-11 w-11 rounded-full bg-[#C5E84D] flex items-center justify-center text-[#1A1A17] text-xs font-bold ring-2 ring-white">
                    YRS
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1A17]">Years of Experience</p>
                  <p className="text-xs text-[#1A1A17]/40">Across the Horn of Africa</p>
                </div>
              </div>
            </div>

            {/* Accent blocks */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-2xl bg-[#C5E84D] -z-10 hidden lg:block" />
          </div>

          {/* Right — Content */}
          <div>
            <span
              className={`block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-6 transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Who We Are
            </span>

            <h2
              className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight mb-8 transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              Cultivating growth,
              <br />
              empowering farmers
            </h2>

            <div
              className={`space-y-5 mb-10 transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              {[
                {
                  number: '01',
                  title: 'Sustainable Crop Solutions',
                  description:
                    'We deliver modern agro-tech systems — from drip irrigation to greenhouse installations — designed for the arid landscapes of the Horn of Africa, boosting crop yields while conserving water.',
                },
                {
                  number: '02',
                  title: 'Expert Agricultural Consulting',
                  description:
                    'Our team partners with farmers, NGOs, and government bodies to provide hands-on training, soil analysis, and value-chain advisory that transforms subsistence farming into profitable agribusiness.',
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="bg-white rounded-2xl px-6 py-5 border border-[#E8E8E0] hover:border-[#4A8B2C]/15 hover:shadow-md transition-all duration-400"
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-sm font-bold text-[#4A8B2C]/40">{item.number}</span>
                    <h3 className="text-[15px] font-bold text-[#1A1A17]">{item.title}</h3>
                  </div>
                  <p className="text-sm text-[#1A1A17]/50 leading-[1.7]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div
              className={`transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '650ms' }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-semibold text-[15px] rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#4A8B2C]/25"
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
