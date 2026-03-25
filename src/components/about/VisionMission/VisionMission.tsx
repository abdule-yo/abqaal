'use client'

import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function VisionMission() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section className="py-28 sm:py-36 px-4 bg-[#FAFAF5]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Founding Story */}
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
                alt="Agricultural innovation by Abqaal"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Accent block */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-[#C5E84D] -z-10 hidden lg:block" />
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-xl bg-[#1B5E20]/10 -z-10 hidden lg:block" />
          </div>

          {/* Right — Narrative */}
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
              A beacon of agricultural
              <br />
              innovation since 2016
            </h2>

            <div
              className={`space-y-5 transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <p className="text-[#1A1A17]/60 text-base sm:text-[17px] leading-[1.8]">
                Founded in 2016 in Hargeisa, Somaliland, Abqaal Agricultural Consulting Firm
                has emerged as a pivotal agribusiness entity dedicated to revolutionizing
                agricultural practices across Somaliland, Somalia, and the Somali Region of Ethiopia.
              </p>
              <p className="text-[#1A1A17]/60 text-base sm:text-[17px] leading-[1.8]">
                We bridge critical gaps through innovative, climate-smart solutions — from
                precision irrigation and controlled-environment greenhouses to farmer training
                and end-to-end supply chain management. Our work directly addresses the
                challenges of climate change, water scarcity, and limited access to modern
                agricultural technology.
              </p>
            </div>

            {/* Pull quote */}
            <div
              className={`mt-10 pl-6 border-l-[3px] border-[#C5E84D] transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '650ms' }}
            >
              <blockquote className="text-lg sm:text-xl font-semibold text-[#1B5E20] leading-snug italic">
                &ldquo;Bridging agro-tech gaps, cultivating the future.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* Mission & Vision — Editorial Split */}
        <div className="mt-28 sm:mt-36 grid lg:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden">
          {/* Mission */}
          <div className="bg-[#1B5E20] p-10 sm:p-14 lg:p-16">
            <span className="block text-[11px] font-bold text-[#C5E84D] tracking-[0.25em] uppercase mb-5">
              Our Mission
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-[1.15] mb-5">
              Enhance productivity.
              <br />
              Increase income.
              <br />
              Promote sustainability.
            </h3>
            <p className="text-white/55 text-[15px] leading-[1.8]">
              To bridge critical agricultural gaps by providing innovative solutions
              that enhance productivity, increase farmer income, and rigorously promote
              environmentally responsible and sustainable farming methodologies across
              the Horn of Africa.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#162C16] p-10 sm:p-14 lg:p-16">
            <span className="block text-[11px] font-bold text-[#C5E84D] tracking-[0.25em] uppercase mb-5">
              Our Vision
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-[1.15] mb-5">
              A resilient agricultural
              <br />
              future for every farmer.
            </h3>
            <p className="text-white/55 text-[15px] leading-[1.8]">
              Addressing chronic agricultural deficiencies through the introduction of
              modern farming techniques — creating a future where every farmer in
              Somaliland, Somalia, and the Somali Region of Ethiopia has access to
              climate-smart technology and sustainable practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
