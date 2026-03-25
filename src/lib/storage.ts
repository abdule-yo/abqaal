import { createClient } from '@/lib/supabase/client'

const BUCKET = 'images'

export async function uploadImage(folder: string, file: File): Promise<string> {
  const supabase = createClient()
  const extension = file.name.split('.').pop() || 'jpg'
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}

export async function deleteImage(publicUrl: string): Promise<void> {
  const supabase = createClient()

  // Extract path from public URL
  // URL format: https://<project>.supabase.co/storage/v1/object/public/images/<path>
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const index = publicUrl.indexOf(marker)
  if (index === -1) return

  const path = publicUrl.slice(index + marker.length)
  await supabase.storage.from(BUCKET).remove([path])
}
