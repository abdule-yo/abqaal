'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Leaf, Sprout, Tractor, Droplets, Sun } from 'lucide-react'

const STATS = [
  { label: 'Crop Yield Efficiency', value: 98 },
  { label: 'Soil Health Index', value: 85 },
  { label: 'Water Usage', value: 60 },
]

const FEATURES = [
  { icon: Sprout, label: 'Greener Yield' },
  { icon: Sun, label: 'Eco Productivity' },
  { icon: Tractor, label: 'Smart Farming' },
  { icon: Leaf, label: 'Organic Progress' },
  { icon: Droplets, label: 'Greener Yield' },
  { icon: Sprout, label: 'Eco Productivity' },
  { icon: Tractor, label: 'Smart Farming' },
  { icon: Leaf, label: 'Organic Progress' },
]

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.png"
          alt="Agricultural landscape in Somaliland"
          fill
          priority
          className={`object-cover transition-transform duration-[2000ms] ease-out ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e0a]/75 via-[#0a2e0a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e0a]/50 via-transparent to-[#0a2e0a]/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div>
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2.5 mb-8 transition-all duration-700 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <span className="text-2xl">🌱</span>
                <span className="text-base font-semibold text-[#C5E84D]">
                  Advancing organic farming
                </span>
              </div>

              {/* Heading */}
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold text-white leading-[1.02] tracking-[-0.02em] transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                Where Innovation
                <br />
                Meets Nature
              </h1>

              {/* CTA */}
              <div
                className={`mt-12 transition-all duration-700 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#C5E84D] hover:bg-[#d4f060] text-[#1A1A17] font-bold rounded-full transition-all duration-300 text-base hover:scale-[1.03] hover:shadow-lg hover:shadow-[#C5E84D]/30"
                >
                  Explore More
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right — Stats Cards */}
            <div className="hidden lg:flex flex-col gap-3.5 items-end">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex items-center justify-between w-80 px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 transition-all duration-700 ease-out hover:bg-white/15 hover:translate-x-[-4px] ${
                    isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  <span className="text-[15px] text-white font-medium">{stat.label}</span>
                  <span className="text-sm font-bold text-white bg-[#4A8B2C] px-4 py-1.5 rounded-lg min-w-[52px] text-center">
                    {stat.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Marquee */}
      <div
        className={`relative z-10 w-full overflow-hidden py-6 transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
          {[...FEATURES, ...FEATURES].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 shrink-0">
              <div className="h-14 w-14 rounded-full flex items-center justify-center">
                <feature.icon className="h-10 w-10 text-[#C5E84D]" strokeWidth={1.5} />
              </div>
              <span className="text-xl font-bold text-white">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
