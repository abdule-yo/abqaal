'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
      <div className="rounded-3xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/[0.06] border border-[#E8E8E0]/60">
        <div className={`relative h-56 bg-gradient-to-br ${gradient} overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl text-[#4A8B2C]/50 font-extrabold">
                {product.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#1A1A17]/70 tracking-wide">
              {product.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-extrabold text-[#1A1A17] leading-snug mb-2 group-hover:text-[#4A8B2C] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-[#1A1A17]/60 leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-base font-extrabold text-[#1A1A17]">
              {product.price}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#4A8B2C] group-hover:gap-2 transition-all">
              View Details
              <ArrowRight className="h-4 w-4" />
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
      {/* Pill bar */}
      <div className="mb-10 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                active === cat
                  ? 'bg-[#4A8B2C] text-white shadow-sm'
                  : 'bg-white text-[#1A1A17] border border-[#E8E8E0] hover:border-[#4A8B2C]/30 hover:bg-[#4A8B2C]/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product count */}
      <p className="text-sm text-[#1A1A17]/50 mb-6 font-medium">
        {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        {active !== 'All' ? ` in ${active}` : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
