'use client'

import { Sprout } from 'lucide-react'
import ProductCategoryCard from './ProductCategoryCard'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  image: string
  featured: boolean
}

interface ProductsHighlightProps {
  products?: Product[]
}

export default function ProductsHighlight({ products }: ProductsHighlightProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  const featured = products?.filter((p) => p.featured).slice(0, 3) ?? []
  // If no featured, take first 3
  const displayProducts = featured.length > 0 ? featured : (products?.slice(0, 3) ?? [])

  if (!products || products.length === 0) {
    return (
      <section id="products-highlight" className="py-28 sm:py-36 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-14 w-14 rounded-2xl bg-[#E8F5E9] flex items-center justify-center mx-auto mb-5">
            <Sprout className="h-7 w-7 text-[#4A8B2C]" strokeWidth={1.5} />
          </div>
          <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
            Fresh Beginnings
          </span>
          <h2 className="text-2xl font-extrabold text-[#1A1A17] mb-3">Our Products</h2>
          <p className="text-[#1A1A17]/40 text-[15px]">Publishing soon — our product catalog is being prepared.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="products-highlight" className="py-28 sm:py-36 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
            Fresh Beginnings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight">
            Bringing you closer to
            <br />
            natural goodness
          </h2>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product, index) => (
            <ProductCategoryCard
              key={product.id}
              number={String(index + 1).padStart(2, '0')}
              title={product.name}
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
