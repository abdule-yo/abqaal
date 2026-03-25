import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { CategoryDeleteButton } from './category-delete-button'
import { getCurrentAdmin, canCreate, canEdit, canDelete } from '@/lib/auth'
import type { Database } from '@/types/database'

type Category = Database['public']['Tables']['categories']['Row']

export default async function CategoriesPage() {
  const admin = await getCurrentAdmin()
  const role = admin?.role ?? 'editor'
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  // Get product counts per category
  const { data: products } = await supabase
    .from('products')
    .select('category_id')

  const productCounts: Record<string, number> = {}
  products?.forEach((p) => {
    if (p.category_id) {
      productCounts[p.category_id] = (productCounts[p.category_id] || 0) + 1
    }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A17]">Categories</h1>
          <p className="text-sm text-[#1A1A17]/40 mt-1">
            Manage product categories
          </p>
        </div>
        {canCreate(role) && (
          <Link
            href="/dashboard/categories/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white text-sm font-semibold rounded-full transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Category
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E8E0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E8E8E0] bg-[#FAFAF5]">
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider hidden sm:table-cell">Slug</th>
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">Products</th>
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider hidden sm:table-cell">Order</th>
              <th className="text-right px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E0]">
            {(!categories || categories.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#1A1A17]/40">
                  No categories yet. Create your first one.
                </td>
              </tr>
            )}
            {(categories as Category[])?.map((cat) => (
              <tr key={cat.id} className="hover:bg-[#FAFAF5] transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-[#1A1A17]">{cat.name}</div>
                  {cat.description && (
                    <div className="text-xs text-[#1A1A17]/40 mt-0.5 line-clamp-1">{cat.description}</div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-[#1A1A17]/50 hidden sm:table-cell">{cat.slug}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#4A8B2C]">
                    {productCounts[cat.id] || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#1A1A17]/50 hidden sm:table-cell">{cat.sort_order}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {canEdit(role) && (
                      <Link
                        href={`/dashboard/categories/${cat.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium text-[#4A8B2C] hover:bg-[#E8F5E9] rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                    )}
                    {canDelete(role) && (
                      <CategoryDeleteButton id={cat.id} productCount={productCounts[cat.id] || 0} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
