'use client'

import { useState } from 'react'
import { Sprout, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface TestimonialItem {
  name: string
  role: string
  quote: string
  rating: number
}

interface TestimonialsProps {
  testimonials?: TestimonialItem[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  if (!testimonials || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-24 px-4 bg-[#FAFAF5]" ref={ref}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-14 w-14 rounded-2xl bg-[#4A8B2C]/10 flex items-center justify-center mx-auto mb-5">
            <Quote className="h-7 w-7 text-[#4A8B2C]" />
          </div>
          <span className="block text-[13px] font-semibold text-[#4A8B2C] tracking-[0.2em] uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl font-extrabold text-[#1A1A17] mb-3">What Our Clients Say</h2>
          <p className="text-[#1A1A17]/40 text-[15px]">Publishing soon — client stories are being collected.</p>
        </div>
      </section>
    )
  }

  const goTo = (index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 px-4 bg-[#FAFAF5]" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Header */}
          <div className="lg:col-span-2">
            <div
              className={`transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Sprout className="h-5 w-5 text-[#4A8B2C]" />
                <span className="text-sm font-semibold text-[#4A8B2C] tracking-wide">
                  Testimonials
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A17] leading-[1.08] tracking-tight mb-6">
                What Our
                <br />
                Clients Say
              </h2>
              <p className="text-[#1A1A17]/50 text-base leading-relaxed mb-8 max-w-sm">
                Hear from the farmers, organizations, and investors who have
                partnered with us to transform agriculture.
              </p>

              {/* Navigation arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => goTo(activeIndex - 1)}
                  className="h-12 w-12 rounded-full border-2 border-[#4A8B2C]/20 hover:border-[#4A8B2C] hover:bg-[#4A8B2C] hover:text-white text-[#4A8B2C] flex items-center justify-center transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => goTo(activeIndex + 1)}
                  className="h-12 w-12 rounded-full bg-[#4A8B2C] hover:bg-[#1B5E20] text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="ml-3 text-sm text-[#1A1A17]/40 font-medium">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Right — Testimonial Card */}
          <div className="lg:col-span-3">
            <div
              className={`transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-sm">
                {/* Quote icon */}
                <div className="h-12 w-12 rounded-2xl bg-[#4A8B2C]/10 flex items-center justify-center mb-6">
                  <Quote className="h-6 w-6 text-[#4A8B2C]" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="text-lg sm:text-xl text-[#1A1A17] leading-relaxed font-medium mb-8 min-h-[120px]">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#E8F5E9]">
                  <div className="h-12 w-12 rounded-full bg-[#4A8B2C] flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#1A1A17]">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-sm text-[#1A1A17]/50">
                      {testimonials[activeIndex].role}
                    </div>
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-2 mt-6">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'w-8 bg-[#4A8B2C]' : 'w-2 bg-[#4A8B2C]/20'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
