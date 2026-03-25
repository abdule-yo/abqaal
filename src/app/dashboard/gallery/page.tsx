import { createClient } from '@/lib/supabase/server'
import { GalleryUploadForm } from './gallery-upload-form'
import { GalleryItemCard } from './gallery-item-card'
import type { Database } from '@/types/database'

type GalleryItem = Database['public']['Tables']['gallery']['Row']

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('gallery')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Gallery</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">
          Manage the homepage gallery photos
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <GalleryUploadForm />
        </div>

        {/* Gallery Grid */}
        <div className="lg:col-span-2">
          {(!items || items.length === 0) ? (
            <div className="bg-white rounded-2xl p-12 border border-[#E8E8E0] text-center">
              <p className="text-sm text-[#1A1A17]/40">No gallery items yet. Upload your first photo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(items as GalleryItem[]).map((item) => (
                <GalleryItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
