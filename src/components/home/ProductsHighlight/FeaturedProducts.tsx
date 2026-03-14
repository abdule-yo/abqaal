'use client'

import Link from 'next/link'
import { Sprout, ArrowUpRight } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { products } from '@/data/products'

const featuredProducts = products.filter((product) => product.featured)

const CATEGORY_GRADIENTS: Record<string, string> = {
  Seeds: 'from-[#4A8B2C]/20 via-[#81C784]/15 to-[#C5E84D]/20',
  Fertilizers: 'from-[#795548]/20 via-[#A1887F]/15 to-[#D7CCC8]/20',
  Greenhouses: 'from-[#00897B]/20 via-[#80CBC4]/15 to-[#E0F2F1]/20',
  'Irrigation Equipment': 'from-[#1976D2]/20 via-[#64B5F6]/15 to-[#E3F2FD]/20',
  'Plant Protection': 'from-[#F57C00]/20 via-[#FFB74D]/15 to-[#FFF3E0]/20',
  'Farm Machinery': 'from-[#546E7A]/20 via-[#90A4AE]/15 to-[#ECEFF1]/20',
  'Geo-membrane & Dam Liners': 'from-[#5C6BC0]/20 via-[#9FA8DA]/15 to-[#E8EAF6]/20',
  'Hand Tools': 'from-[#8D6E63]/20 via-[#BCAAA4]/15 to-[#EFEBE9]/20',
}

function FeaturedProductCard({
  product,
  index,
}: {
  product: (typeof featuredProducts)[number]
  index: number
}) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 })

  const gradient =
    CATEGORY_GRADIENTS[product.category] ??
    'from-[#4A8B2C]/20 via-[#81C784]/15 to-[#C5E84D]/20'

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ease-out ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        {/* Image Placeholder with Gradient */}
        <div
          className={`relative h-56 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
        >
          <Sprout className="h-16 w-16 text-[#4A8B2C]/30 transition-transform duration-500 group-hover:scale-110" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8F5E9] text-[#4A8B2C] text-xs font-semibold tracking-wide uppercase mb-3">
            {product.category}
          </span>

          <h3 className="text-lg font-bold text-[#1A1A17] mb-2 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-[#1A1A17]/60 leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-base font-extrabold text-[#1A1A17] mb-5">
            {product.price}
          </p>

          {/* View Details Link */}
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#4A8B2C]/25"
          >
            View Details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section className="py-24 px-4 bg-[#FAFAF5]">
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
              Featured Products
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A17] leading-[1.1] tracking-tight">
            Quality Agricultural
            <br />
            Supplies
          </h2>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <FeaturedProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
