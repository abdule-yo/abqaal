'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sprout, Expand } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const GALLERY_ITEMS = [
  {
    src: '/gallery/gallery-1.jpg',
    alt: 'Greenhouse installation in Hargeisa',
    category: 'Greenhouse',
    span: 'row-span-2',
  },
  {
    src: '/gallery/gallery-2.jpg',
    alt: 'Drip irrigation system setup',
    category: 'Irrigation',
    span: '',
  },
  {
    src: '/gallery/gallery-3.jpg',
    alt: 'Farm training session with local farmers',
    category: 'Training',
    span: '',
  },
  {
    src: '/gallery/gallery-4.jpg',
    alt: 'Crop yield field inspection',
    category: 'Field Work',
    span: '',
  },
  {
    src: '/gallery/gallery-5.jpg',
    alt: 'Soil analysis and testing on-site',
    category: 'Research',
    span: 'row-span-2',
  },
  {
    src: '/gallery/gallery-6.jpg',
    alt: 'Harvesting fresh vegetables',
    category: 'Harvest',
    span: '',
  },
]

const PLACEHOLDER_COLORS = [
  'from-[#2D6A2E] to-[#4A8B2C]',
  'from-[#1B5E20] to-[#2D7A3A]',
  'from-[#3E7B27] to-[#5FA03A]',
  'from-[#267A30] to-[#4A8B2C]',
  'from-[#1B6B2B] to-[#3E8B35]',
  'from-[#2D6A2E] to-[#1B5E20]',
]

export default function ProjectsShowcase() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <section id="gallery" className="py-24 px-4 bg-white" ref={ref}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14">
            <div
              className={`transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Sprout className="h-5 w-5 text-[#4A8B2C]" />
                <span className="text-sm font-semibold text-[#4A8B2C] tracking-wide">
                  Our Gallery
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A17] leading-[1.08] tracking-tight mb-4">
                From the Field
              </h2>
              <p className="text-[#1A1A17]/50 text-base max-w-lg mx-auto">
                A glimpse into our agricultural projects, training sessions, and
                field operations across the Horn of Africa.
              </p>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] sm:auto-rows-[260px] gap-4">
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span} transition-all duration-700 ease-out ${
                  isIntersecting
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                onClick={() => setLightboxIndex(index)}
              >
                {/* Placeholder gradient — will be replaced by real images */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${PLACEHOLDER_COLORS[index]} transition-transform duration-700 group-hover:scale-105`}
                />

                {/* Image (will load when real files exist) */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 relative z-[1]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                  }}
                />

                {/* Placeholder text when no image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 z-[0]">
                  <Sprout className="h-10 w-10 mb-3 opacity-40" strokeWidth={1.2} />
                  <span className="text-xs font-medium opacity-50">{item.alt}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e0a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]" />

                {/* Info on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-[3]">
                  <span className="inline-block px-3 py-1 bg-[#C5E84D] text-[#1A1A17] text-xs font-semibold rounded-full mb-2">
                    {item.category}
                  </span>
                  <p className="text-white text-sm font-medium">{item.alt}</p>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 z-[3]">
                  <Expand className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-4xl w-full aspect-[16/10] rounded-2xl overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${PLACEHOLDER_COLORS[lightboxIndex]}`}
            />
            <Image
              src={GALLERY_ITEMS[lightboxIndex].src}
              alt={GALLERY_ITEMS[lightboxIndex].alt}
              fill
              className="object-cover relative z-[1]"
              sizes="90vw"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 z-[0]">
              <Sprout className="h-16 w-16 mb-4 opacity-30" strokeWidth={1} />
              <span className="text-sm font-medium opacity-50">
                {GALLERY_ITEMS[lightboxIndex].alt}
              </span>
              <span className="text-xs mt-2 opacity-30">Image coming soon</span>
            </div>
            <div className="absolute bottom-6 left-6 z-[2]">
              <span className="inline-block px-4 py-1.5 bg-[#C5E84D] text-[#1A1A17] text-sm font-semibold rounded-full">
                {GALLERY_ITEMS[lightboxIndex].category}
              </span>
              <p className="text-white text-lg font-semibold mt-2">
                {GALLERY_ITEMS[lightboxIndex].alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
