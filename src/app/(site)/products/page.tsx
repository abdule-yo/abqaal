import { Metadata } from 'next'
import { Sprout } from 'lucide-react'
import { getProducts, getCategories } from '@/lib/data'
import { ProductCategoryFilter } from './product-category-filter'
import { ComingSoon } from '@/components/shared/ComingSoon'

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Browse our range of agricultural products including seeds, fertilizers, greenhouses, irrigation equipment, and farm machinery for modern farming across the Horn of Africa.',
}

export const revalidate = 60

export default async function ProductsPage() {
  const { products } = await getProducts()

  if (products.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAFAF5]">
        <section className="relative bg-[#1B5E20] pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="block text-[13px] font-semibold text-[#C5E84D] tracking-[0.2em] uppercase mb-5">Agricultural Supplies</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">Our Products</h1>
          </div>
        </section>
        <ComingSoon
          title="Products Coming Soon"
          description="We're preparing our product catalog. Check back soon for our full range of agricultural supplies, tools, and equipment."
          backHref="/"
          backLabel="Back to Home"
        />
      </main>
    )
  }

  const dbCategories = await getCategories()
  const categoryNames = dbCategories.length > 0
    ? dbCategories.map((c) => c.name)
    : Array.from(new Set(products.map((p) => p.category)))
  const categories = ['All', ...categoryNames]
  const featuredProducts = products.filter((p) => p.featured)

  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className="relative bg-[#1B5E20] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#4A8B2C]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#C5E84D]/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-5">
              <Sprout className="h-5 w-5 text-[#C5E84D]" />
              <span className="text-[13px] font-semibold text-[#C5E84D] tracking-[0.2em] uppercase">
                Agricultural Supplies
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Our Products
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              Quality agricultural tools and inputs built for the demands of East African
              farming — from certified seeds and fertilizers to greenhouse kits, irrigation
              systems, and farm machinery.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-white/10">
            {[
              { value: products.length.toString(), label: 'Products' },
              { value: new Set(products.map((p) => p.category)).size.toString(), label: 'Categories' },
              { value: featuredProducts.length.toString(), label: 'Featured' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[#C5E84D]">{s.value}</div>
                <div className="text-xs text-white/40 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <ProductCategoryFilter categories={categories} products={products} />
      </section>
    </main>
  )
}
