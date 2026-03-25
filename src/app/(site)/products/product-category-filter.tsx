'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Tag } from 'lucide-react'
import type { Product } from '@/types'

const categoryGradients: Record<string, string> = {
  Seeds: 'from-[#4A8B2C]/20 via-[#C5E84D]/15 to-[#E8F5E9]',
  Fertilizers: 'from-[#F5A623]/20 via-[#FFF8E1] to-[#E8F5E9]',
  Greenhouses: 'from-[#1B5E20]/15 via-[#E8F5E9] to-[#C5E84D]/10',
  'Irrigation Equipment': 'from-[#2196F3]/15 via-[#E3F2FD] to-[#E8F5E9]',
  'Hand Tools': 'from-[#795548]/15 via-[#EFEBE9] to-[#E8F5E9]',
  'Plant Protection': 'from-[#FF7043]/15 via-[#FBE9E7] to-[#E8F5E9]',
  'Farm Machinery': 'from-[#546E7A]/15 via-[#ECEFF1] to-[#E8F5E9]',
  'Geo-membrane & Dam Liners': 'from-[#26A69A]/15 via-[#E0F2F1] to-[#E8F5E9]',
}

function ProductCard({ product }: { product: Product }) {
  const gradient =
    categoryGradients[product.category] ?? 'from-[#E8F5E9] via-[#F1F8E9] to-[#FFF8E1]'

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4A8B2C]/6 border border-[#E8E8E0] hover:border-[#4A8B2C]/15">
        {/* Image area */}
        <div className={`relative h-52 bg-gradient-to-br ${gradient} overflow-hidden`}>
          {/* Product image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          {/* Fallback */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl text-[#4A8B2C]/40 font-extrabold">
                {product.name.charAt(0)}
              </span>
            </div>
          </div>
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-[#1A1A17]/60 tracking-wide">
              <Tag className="h-3 w-3" />
              {product.category}
            </span>
          </div>
          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#C5E84D] text-[10px] font-bold text-[#1A1A17] tracking-wide uppercase">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-[15px] font-bold text-[#1A1A17] leading-snug mb-2 group-hover:text-[#4A8B2C] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-[13px] text-[#1A1A17]/50 leading-relaxed line-clamp-2 mb-5">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-[#E8E8E0]">
            <span className="text-sm font-extrabold text-[#1A1A17]">
              {product.price}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#4A8B2C] group-hover:gap-2.5 transition-all duration-300">
              Details
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

interface ProductCategoryFilterProps {
  categories: string[]
  products: Product[]
}

export function ProductCategoryFilter({
  categories,
  products,
}: ProductCategoryFilterProps) {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <>
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-3">
            Browse Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A17] leading-tight">
            All Products
          </h2>
        </div>
        <p className="text-sm text-[#1A1A17]/40 font-medium">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {active !== 'All' ? ` in ${active}` : ''}
        </p>
      </div>

      {/* Filter pills */}
      <div className="mb-10 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-1">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? products.length
                : products.filter((p) => p.category === cat).length

            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  active === cat
                    ? 'bg-[#1A1A17] text-white'
                    : 'bg-white text-[#1A1A17]/60 border border-[#E8E8E0] hover:border-[#4A8B2C]/20 hover:text-[#1A1A17]/80'
                }`}
              >
                {cat}
                <span
                  className={`text-[11px] font-semibold ${
                    active === cat ? 'text-white/50' : 'text-[#1A1A17]/30'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
