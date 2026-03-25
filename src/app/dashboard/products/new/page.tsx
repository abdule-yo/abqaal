import { getCategories } from '@/lib/data'
import { ProductForm } from '../product-form'

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">New Product</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">Add a new product to the catalog</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <ProductForm categories={categories} />
      </div>
    </div>
  )
}
