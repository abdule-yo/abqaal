import Link from 'next/link'
import { Plus, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { DeleteButton } from '../projects/delete-button'
import { getCurrentAdmin, canCreate, canEdit, canDelete } from '@/lib/auth'
import type { Database } from '@/types/database'

type Testimonial = Database['public']['Tables']['testimonials']['Row']

export default async function TestimonialsPage() {
  const admin = await getCurrentAdmin()
  const role = admin?.role ?? 'editor'
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1A1A17]">Testimonials</h1>
          <p className="text-sm text-[#1A1A17]/40 mt-1">
            Manage client testimonials shown on the homepage
          </p>
        </div>
        {canCreate(role) && (
          <Link
            href="/dashboard/testimonials/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white text-sm font-semibold rounded-full transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Testimonial
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E8E0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E8E8E0] bg-[#FAFAF5]">
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider hidden sm:table-cell">Quote</th>
              <th className="text-left px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">Rating</th>
              <th className="text-right px-6 py-3 text-[11px] font-bold text-[#1A1A17]/40 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E0]">
            {(!testimonials || testimonials.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-[#1A1A17]/40">
                  No testimonials yet. Add your first one.
                </td>
              </tr>
            )}
            {(testimonials as Testimonial[])?.map((t) => (
              <tr key={t.id} className="hover:bg-[#FAFAF5] transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-[#1A1A17]">{t.name}</div>
                  <div className="text-xs text-[#1A1A17]/40 mt-0.5">{t.role}</div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <p className="text-sm text-[#1A1A17]/50 line-clamp-2 max-w-sm">{t.quote}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {canEdit(role) && (
                      <Link
                        href={`/dashboard/testimonials/${t.id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium text-[#4A8B2C] hover:bg-[#E8F5E9] rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                    )}
                    {canDelete(role) && (
                      <DeleteButton id={t.id} type="testimonials" />
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
