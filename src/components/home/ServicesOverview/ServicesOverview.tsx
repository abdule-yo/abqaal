'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Sprout,
  ArrowUpRight,
  Package,
  FlaskConical,
  GraduationCap,
  Tractor,
  Microscope,
  ChevronRight,
} from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import ServiceCard from './ServiceCard'

const SERVICES = [
  {
    id: 'supply-procurement',
    number: '01',
    icon: Package,
    title: 'Supply & Procurement',
    description:
      'Complete agricultural inputs — from certified seeds and fertilizers to full greenhouse construction, irrigation systems, farm machinery, and plant protection solutions.',
    highlights: [
      'Seeds (fruits, vegetables, tree, forage)',
      'Greenhouses — all types, full construction',
      'Irrigation — drip, sprinklers, centre pivot, rain gun',
      'Geo-membrane & dam liners',
    ],
    color: '#4A8B2C',
  },
  {
    id: 'consulting-advisory',
    number: '02',
    icon: FlaskConical,
    title: 'Consulting & Technical Advisory',
    description:
      'Expert agribusiness consulting — from soil and water analysis to precision land management, risk assessment, and market strategy for agricultural investors.',
    highlights: [
      'Soil analysis & water quality testing',
      'Plant health clinic & disease control',
      'Precision land management (software)',
      'Economic modelling & commodity outlook',
    ],
    color: '#2D7A3A',
  },
  {
    id: 'training-capacity',
    number: '03',
    icon: GraduationCap,
    title: 'Training & Capacity Building',
    description:
      'Hands-on training programs for greenhouse construction, drip irrigation setup, modern agriculture techniques, hydroponics, and water conservation.',
    highlights: [
      'Greenhouse construction & installation',
      'Modern agriculture techniques',
      'Hydroponics & fodder growing',
      'Water conservation & usage control',
    ],
    color: '#1B6B2B',
  },
  {
    id: 'farm-management',
    number: '04',
    icon: Tractor,
    title: 'Farm Management',
    description:
      'End-to-end farm management on behalf of investors — livestock, dairy, horticulture, crop rotation, fertigation, and post-harvest advisory.',
    highlights: [
      'Livestock & dairy farming management',
      'Horticulture — fruit, vegetables, nuts',
      'Crop rotation & fertigation planning',
      'Post-installation monitoring',
    ],
    color: '#267A30',
  },
  {
    id: 'research-development',
    number: '05',
    icon: Microscope,
    title: 'Research & Development',
    description:
      'Pioneering agronomy research, agriculture gap studies for Somaliland and Somalia, market research, and environmental ecosystem analysis.',
    highlights: [
      'Agriculture gap research — Somaliland & Somalia',
      'Market research & value chain analysis',
      'On-farm adaptive research',
      'Environmental & water catchment research',
    ],
    color: '#1B5E20',
  },
]

export default function ServicesOverview() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 })
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section id="services" className="py-28 sm:py-36 px-4 bg-[#FAFAF5] overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div
            className={`transition-all duration-700 ease-out ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight">
              Five divisions,
              <br />
              one mission
            </h2>
          </div>

          <div
            className={`transition-all duration-700 ease-out ${
              isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-[#1A1A17]/50 max-w-md text-[15px] leading-[1.7] mb-6">
              From seed procurement to post-harvest advisory — we provide
              the full spectrum of agricultural services across the Horn of Africa.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-semibold text-[15px] rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#4A8B2C]/25"
            >
              All Services
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* First row: 3 cards */}
          {SERVICES.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isVisible={isIntersecting}
              isActive={activeId === service.id}
              onHover={setActiveId}
            />
          ))}
        </div>

        {/* Second row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-4xl mx-auto">
          {SERVICES.slice(3).map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index + 3}
              isVisible={isIntersecting}
              isActive={activeId === service.id}
              onHover={setActiveId}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
