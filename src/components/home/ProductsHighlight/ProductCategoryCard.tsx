'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface ProductCategoryCardProps {
  number: string
  title: string
  description: string
  image: string
  delay: number
}

export default function ProductCategoryCard({
  number,
  title,
  description,
  image,
  delay,
}: ProductCategoryCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ease-out ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
        {/* Image Container */}
        <div className="relative h-72 bg-[#F0F0EA] overflow-hidden">
          {/* Scalloped number badge */}
          <div className="absolute top-0 right-0 z-10">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <path
                d="M90,0 L90,70 Q82,65 75,70 Q68,75 61,70 Q54,65 47,70 Q40,75 33,70 Q26,65 19,70 Q12,75 5,70 L0,70 Q5,62 0,55 Q-5,48 0,41 Q5,34 0,27 Q-5,20 0,13 L0,0 Z"
                fill="#7B8B6F"
              />
            </svg>
            <span className="absolute top-4 right-5 text-white font-bold text-xl">
              {number}
            </span>
          </div>

          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-5">
          <h3 className="text-xl font-bold text-[#1A1A17] mb-2">{title}</h3>
          <p className="text-sm text-[#1A1A17]/60 leading-relaxed mb-5 line-clamp-3">
            {description}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C5E84D] hover:bg-[#b8d944] text-[#1A1A17] text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03]"
          >
            More View
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
