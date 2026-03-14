import { Metadata } from 'next'
import { products } from '@/data/products'
import { ProductCategoryFilter } from './product-category-filter'

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Browse our range of agricultural products including seeds, fertilizers, greenhouses, irrigation equipment, and farm machinery for modern farming in Somaliland.',
}

const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className="bg-[#1B5E20] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Our Products
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
            Quality agricultural supplies built for the demands of East African farming
            — from certified seeds and fertilizers to irrigation systems and farm machinery.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductCategoryFilter categories={categories} products={products} />
      </section>
    </main>
  )
}
