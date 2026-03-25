'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const HERO_STATS = [
  { value: 317, suffix: '', label: 'Projects Completed' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 5000, suffix: '+', label: 'Farmers & Academics Trained' },
  { value: 12, suffix: '', label: 'Regions Covered' },
]

export default function CompanyStory() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/about-preview.jpg"
          alt="Abqaal agricultural operations across the Horn of Africa"
          fill
          priority
          className={`object-cover transition-transform duration-[2500ms] ease-out ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0a1f0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f0a]/30 via-transparent to-[#0a1f0a]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-40">
        {/* Overline */}
        <div
          className={`transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <span className="inline-block text-[13px] font-semibold text-[#C5E84D] tracking-[0.2em] uppercase">
            Est. 2016 &mdash; Hargeisa, Somaliland
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`mt-6 text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold text-white leading-[1.02] tracking-[-0.03em] max-w-4xl transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          Transforming Agriculture
          <br />
          <span className="text-[#C5E84D]">Across the Horn</span>
          <br />
          of Africa
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-8 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          Pioneering climate-smart solutions that bridge the gap between
          traditional farming and modern agricultural technology.
        </p>
      </div>

      {/* Bottom Stats Bar */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="bg-white/5 px-6 py-6 sm:py-8 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs sm:text-sm text-white/40 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1400ms' }}
      >
        <ChevronDown className="h-5 w-5 text-white/30 animate-bounce" />
      </div>
    </section>
  )
}
