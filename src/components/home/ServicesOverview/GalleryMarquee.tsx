'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Sprout } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const MARQUEE_WORDS = [
  'SmartFarming',
  'GreenLeaf',
  'AgroTech',
  'CropYield',
  'Sustainable',
  'Irrigation',
  'Greenhouse',
  'Harvest',
]

export default function GalleryMarquee() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [imageCount, setImageCount] = useState(0)

  useEffect(() => {
    let count = 0
    const check = async () => {
      for (let i = 1; i <= 20; i++) {
        try {
          const res = await fetch(`/marque-img-${i}.png`, { method: 'HEAD' })
          if (res.ok) {
            count = i
          } else {
            break
          }
        } catch {
          break
        }
      }
      setImageCount(count)
    }
    check()
  }, [])

  const images = Array.from({ length: imageCount }, (_, i) => ({
    src: `/marque-img-${i + 1}.png`,
    alt: `Abqaal agricultural project ${i + 1}`,
  }))

  return (
    <section id="gallery-marquee" className="py-24 overflow-hidden bg-white">
      <div
        ref={ref}
        className={`text-center mb-14 px-4 transition-all duration-700 ease-out ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Sprout className="h-5 w-5 text-[#4A8B2C]" />
          <span className="text-sm font-semibold text-[#4A8B2C] tracking-wide">
            Agro Solutions
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A17] leading-[1.08] tracking-tight">
          Caring for the Land,
          <br />
          Growing for Life
        </h2>
      </div>

      {imageCount > 0 && (
        <div
          className={`px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {images.slice(0, 3).map((img, index) => (
              <div
                key={img.src}
                className={`relative flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-auto snap-center aspect-[4/3] rounded-3xl overflow-hidden bg-[#E8F5E9] group transition-all duration-700 ease-out ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${350 + index * 150}ms` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 33vw"
                />
              </div>
            ))}
          </div>

          {imageCount > 1 && (
            <div className="flex justify-center gap-2 mt-6 lg:hidden">
              {images.slice(0, 3).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === 0 ? 'w-6 bg-[#4A8B2C]' : 'w-2 bg-[#4A8B2C]/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div
        className={`mt-10 overflow-hidden transition-all duration-700 ease-out ${
          isIntersecting ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '700ms' }}
      >
        <div className="marquee-track">
          <div className="marquee-content">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
              <span
                key={i}
                className="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-transparent select-none"
                style={{
                  WebkitTextStroke: '2px rgba(26, 26, 23, 0.15)',
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
              <span
                key={i}
                className="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-transparent select-none"
                style={{
                  WebkitTextStroke: '2px rgba(26, 26, 23, 0.15)',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
