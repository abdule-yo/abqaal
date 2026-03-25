import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TestimonialForm } from '../../testimonial-form'
import type { Database } from '@/types/database'

type Testimonial = Database['public']['Tables']['testimonials']['Row']

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()
  const testimonial = data as Testimonial

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Edit Testimonial</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">{testimonial.name}</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  )
}
