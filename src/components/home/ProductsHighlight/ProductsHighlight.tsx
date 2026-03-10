'use client'

import { Sprout } from 'lucide-react'
import ProductCategoryCard from './ProductCategoryCard'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const FEATURED_PRODUCTS = [
  {
    number: '01',
    title: "Nature's Harmony",
    description:
      'Premium organic seeds and fertilizers sourced from certified suppliers, ensuring optimal crop nutrition and sustainable soil health improvement across the Horn of Africa.',
    image: '/product-img-1.webp',
  },
  {
    number: '02',
    title: 'Pure Cultivation',
    description:
      'Advanced greenhouse kits and irrigation systems designed for the arid climate of Somaliland. Water-efficient drip systems suitable for various crop types and farm sizes.',
    image: '/product-img-2.webp',
  },
  {
    number: '03',
    title: 'Nature Nurtured',
    description:
      'Complete plant protection solutions including certified pesticides, herbicides, and fungicides for effective crop protection and maximum agricultural productivity.',
    image: '/product-img-3.webp',
  },
]

export default function ProductsHighlight() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section id="products-highlight" className="py-24 px-4 bg-[#FAFAF5]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sprout className="h-5 w-5 text-[#4A8B2C]" />
            <span className="text-sm font-semibold text-[#4A8B2C] tracking-wide">
              Fresh Beginnings
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight">
            Bringing You Closer to
            <br />
            Natural Goodness
          </h2>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product, index) => (
            <ProductCategoryCard
              key={product.number}
              number={product.number}
              title={product.title}
              description={product.description}
              image={product.image}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
