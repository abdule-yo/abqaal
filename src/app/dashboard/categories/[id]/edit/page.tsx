import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CategoryForm } from '../../category-form'
import type { Database } from '@/types/database'

type Category = Database['public']['Tables']['categories']['Row']

interface EditCategoryPageProps {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()
  const category = data as Category

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Edit Category</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">{category.name}</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <CategoryForm category={category} />
      </div>
    </div>
  )
}
