'use client'

import { useEffect, useState, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { Sprout } from 'lucide-react'

interface StatItem {
  value: number
  suffix: string
  label: string
  description: string
}

interface StatsProps {
  stats?: StatItem[]
}

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
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

    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats({ stats }: StatsProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })

  if (!stats || stats.length === 0) {
    return (
      <section id="stats" className="relative py-24 sm:py-28 px-4 bg-[#111110] overflow-hidden" ref={ref}>
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="h-14 w-14 rounded-2xl bg-[#C5E84D]/10 flex items-center justify-center mx-auto mb-5">
            <Sprout className="h-7 w-7 text-[#C5E84D]" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3">Our Impact</h2>
          <p className="text-white/30 text-[15px]">Publishing soon — stats are being prepared.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="stats" className="relative py-24 sm:py-28 px-4 bg-[#111110] overflow-hidden" ref={ref}>
      {/* Background */}
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
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-[13px] font-semibold text-[#C5E84D] tracking-[0.2em] uppercase mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
            Numbers that speak
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 120}ms` }}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#C5E84D] mb-3 tracking-tight">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isIntersecting} />
              </div>
              <div className="text-white font-semibold text-[15px] mb-1">{stat.label}</div>
              <div className="text-white/30 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
