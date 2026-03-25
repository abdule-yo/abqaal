import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCategories } from '@/lib/data'
import { ProductForm } from '../../product-form'
import type { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row']

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data }, categories] = await Promise.all([
    supabase.from('products').select('*').eq('id', id).single(),
    getCategories(),
  ])

  if (!data) notFound()
  const product = data as Product

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Edit Product</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">{product.name}</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  )
}
