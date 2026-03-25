import Link from 'next/link'
import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { DeleteButton } from '../projects/delete-button'
import type { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row']

export default async function DashboardProductsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const products = (data ?? []) as Product[]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A17]">Products</h1>
          <p className="text-sm text-[#1A1A17]/40 mt-1">
            {products.length} products
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A17] hover:bg-[#111110] text-white text-sm font-semibold rounded-full transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E8E0] overflow-hidden">
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E8E8E0]">
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase">Name</th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase hidden sm:table-cell">Category</th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase hidden md:table-cell">Price</th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase hidden lg:table-cell">Featured</th>
                  <th className="text-right px-6 py-4 text-[11px] font-bold text-[#1A1A17]/30 tracking-[0.15em] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-[#E8E8E0] last:border-0 hover:bg-[#FAFAF5] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#1A1A17]">{product.name}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-[#1A1A17]/50">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="font-semibold text-[#1A1A17]">{product.price}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {product.featured ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-[#C5E84D]/20 text-[#4A8B2C] text-[10px] font-bold">
                          Featured
                        </span>
                      ) : (
                        <span className="text-[#1A1A17]/25 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="px-3 py-1.5 text-xs font-medium text-[#4A8B2C] hover:bg-[#E8F5E9] rounded-lg transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton id={product.id} type="products" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#1A1A17]/40 text-sm">No products yet</p>
            <Link
              href="/dashboard/products/new"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#1A1A17] text-white text-sm font-semibold rounded-full"
            >
              <Plus className="h-4 w-4" />
              Create First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
