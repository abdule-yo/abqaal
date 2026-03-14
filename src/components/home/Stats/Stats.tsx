'use client'

import { useEffect, useState, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const STATS = [
  { value: 15, suffix: '+', label: 'Years of Experience', description: 'Serving the Horn of Africa' },
  { value: 11, suffix: '+', label: 'Regions Covered', description: 'Across Somaliland & Somalia' },
  { value: 500, suffix: '+', label: 'Farmers Trained', description: 'Through capacity building' },
  { value: 200, suffix: '+', label: 'Projects Delivered', description: 'With trusted partners' },
]

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
    const interval = duration / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section id="stats" className="py-20 px-4 bg-[#1B5E20] relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#C5E84D] mb-2 tracking-tight">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isIntersecting} />
              </div>
              <div className="text-white font-bold text-base mb-1">{stat.label}</div>
              <div className="text-white/40 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
