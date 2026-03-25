'use client'

import Image from 'next/image'
import { Mail, Sprout } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const DIVISIONS = [
  { number: '01', name: 'Supply & Procurement', focus: 'Global sourcing of certified Ag-Tech products' },
  { number: '02', name: 'Consulting & Advisory', focus: 'Soil analysis, irrigation design, land management' },
  { number: '03', name: 'Training & Capacity', focus: 'Vocational programs for farmers and graduates' },
  { number: '04', name: 'Farm Management', focus: 'End-to-end operations for investors and cooperatives' },
  { number: '05', name: 'Research & Development', focus: 'Crop trials, climate-smart tech innovation' },
]

export default function Team() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section className="py-28 sm:py-36 px-4 bg-[#FAFAF5]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight max-w-md">
            The people behind
            <br />
            the mission
          </h2>
        </div>

        {/* CEO — Full-width editorial card */}
        <div
          className={`mb-24 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="grid lg:grid-cols-5 gap-0 rounded-[2rem] overflow-hidden bg-white border border-[#E8E8E0]">
            {/* Photo */}
            <div className="relative lg:col-span-2 h-80 lg:h-auto bg-gradient-to-br from-[#1B5E20] to-[#4A8B2C]">
              <Image
                src="/images/team/ceo.jpg"
                alt="Mohamed Ahmed Nouh — CEO & Founder"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <Sprout className="h-20 w-20" strokeWidth={0.8} />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-3 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <span className="text-[11px] font-bold text-[#F5A623] tracking-[0.25em] uppercase mb-4">
                Founder & Chief Executive Officer
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A17] mb-4">
                Mohamed Ahmed Nouh
              </h3>
              <p className="text-[#1A1A17]/55 text-[15px] leading-[1.8] mb-6 max-w-lg">
                Visionary leader with deep expertise in agribusiness management and agricultural
                development. Founded Abqaal in 2016 with a mission to bridge the critical
                agricultural technology gap across the Horn of Africa — directly addressing
                climate change, water scarcity, and food security challenges.
              </p>
              <div>
                <a
                  href="mailto:abqaalconsulting@gmail.com"
                  className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#4A8B2C] hover:text-[#1B5E20] transition-colors duration-300"
                >
                  <Mail className="h-4 w-4" />
                  abqaalconsulting@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Five Divisions */}
        <div
          className={`transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 mb-10">
            <div>
              <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
                Organization
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A17] leading-[1.1]">
                Five specialized
                <br />
                divisions
              </h3>
            </div>
            <p className="lg:col-span-2 text-[#1A1A17]/50 text-[15px] leading-[1.8] self-end">
              Delivering end-to-end agricultural solutions — from global procurement
              and expert consulting to hands-on training, full-scale farm management,
              and cutting-edge research and development.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DIVISIONS.map((division, index) => (
              <div
                key={division.number}
                className={`group bg-white rounded-xl p-6 border border-[#E8E8E0] hover:border-[#4A8B2C]/20 hover:shadow-md transition-all duration-500 ease-out hover:-translate-y-0.5 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${500 + index * 80}ms` }}
              >
                <span className="block text-[11px] font-bold text-[#4A8B2C]/30 tracking-widest mb-4">
                  {division.number}
                </span>
                <h4 className="text-[14px] font-bold text-[#1A1A17] mb-2 leading-snug group-hover:text-[#1B5E20] transition-colors duration-300">
                  {division.name}
                </h4>
                <p className="text-[12px] text-[#1A1A17]/40 leading-relaxed">
                  {division.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
