'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface ServiceData {
  id: string
  number: string
  icon: LucideIcon
  title: string
  description: string
  highlights: string[]
  color: string
}

interface ServiceCardProps {
  service: ServiceData
  index: number
  isVisible: boolean
  isActive: boolean
  onHover: (id: string | null) => void
}

export default function ServiceCard({
  service,
  index,
  isVisible,
  isActive,
  onHover,
}: ServiceCardProps) {
  const Icon = service.icon

  return (
    <div
      className={`group relative bg-white rounded-3xl p-7 border border-transparent hover:border-[#4A8B2C]/15 transition-all duration-500 ease-out cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isActive ? 'shadow-xl shadow-[#4A8B2C]/8 -translate-y-1' : 'shadow-sm hover:shadow-xl hover:shadow-[#4A8B2C]/8 hover:-translate-y-1'}`}
      style={{ transitionDelay: `${300 + index * 100}ms` }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Top row: number + icon */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-bold text-[#4A8B2C]/40 tracking-widest">
          {service.number}
        </span>
        <div
          className="h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
          style={{ backgroundColor: `${service.color}10` }}
        >
          <Icon
            className="h-6 w-6 transition-colors duration-300"
            style={{ color: service.color }}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#1A1A17] mb-3 group-hover:text-[#1B5E20] transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#1A1A17]/55 leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Highlight list */}
      <ul className="space-y-2.5 mb-6">
        {service.highlights.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm">
            <ChevronRight
              className="h-4 w-4 text-[#4A8B2C] mt-0.5 flex-shrink-0"
              strokeWidth={2.5}
            />
            <span className="text-[#1A1A17]/70 leading-snug">{item}</span>
          </li>
        ))}
      </ul>

      {/* Bottom link */}
      <Link
        href={`/services#${service.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A8B2C] group-hover:text-[#1B5E20] transition-all duration-300"
      >
        Learn More
        <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ backgroundColor: service.color }}
      />
    </div>
  )
}
