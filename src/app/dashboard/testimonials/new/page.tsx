import { TestimonialForm } from '../testimonial-form'

export default function NewTestimonialPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">New Testimonial</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">Add a new client testimonial</p>
      </div>
      <div className="bg-white rounded-2xl p-8 border border-[#E8E8E0]">
        <TestimonialForm />
      </div>
    </div>
  )
}
