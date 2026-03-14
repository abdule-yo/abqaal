'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const FAQS = [
  {
    question: 'What agricultural services does Abqaal provide?',
    answer:
      'Abqaal operates through five divisions: Supply & Procurement, Consulting & Technical Advisory, Training & Capacity Building, Farm Management, and Research & Development. We cover everything from seed sourcing and greenhouse construction to precision land management and post-harvest advisory across the Horn of Africa.',
  },
  {
    question: 'Which regions does Abqaal serve?',
    answer:
      'We primarily serve Somaliland, Somalia, and Ethiopia across the Horn of Africa. Our projects span 11+ regions including Hargeisa, Erigavo, Burco, Boorame, Baki, Las\'anod, Garowe, Buhoodle, Arabsiyo, Gabiley, and Darasalaam.',
  },
  {
    question: 'Do you provide greenhouse construction and installation?',
    answer:
      'Yes. We supply and construct all types of greenhouses with complete components — from polytunnels to multi-span structures. We also offer training on greenhouse construction, installation, and management for farmers and agricultural professionals.',
  },
  {
    question: 'What irrigation systems do you offer?',
    answer:
      'We provide a full range of irrigation solutions including drip irrigation, sprinkler systems, centre pivot, furrow irrigation, and rain gun systems. Each is designed for water efficiency in arid and semi-arid climates typical of our operating regions.',
  },
  {
    question: 'Can Abqaal manage my farm on my behalf?',
    answer:
      'Absolutely. Our Farm Management division offers end-to-end management on behalf of investors — including livestock and dairy farming, horticulture, crop rotation planning, fertigation, pest and weed control, harvesting management, and post-installation monitoring.',
  },
  {
    question: 'Do you offer training programs for farmers?',
    answer:
      'We offer comprehensive in-house and practical on-farm training covering modern agriculture techniques, drip irrigation setup, hydroponics and fodder growing, water conservation, and agronomy research extension services. We also run farm coaching sessions.',
  },
]

export default function CTA() {
  const [openIndex, setOpenIndex] = useState(0)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 px-4 bg-[#1B5E20] overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column — Header */}
          <div className="lg:col-span-2">
            <div
              className={`transition-all duration-700 ease-out ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-sm font-semibold text-[#C5E84D] tracking-wide mb-4 block">
                FAQ&apos;s
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
                Frequently
                <br />
                Asked
                <br />
                Questions
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-sm">
                We offer a range of services tailored to support the needs of modern
                agriculture across the Horn of Africa.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-[#C5E84D] hover:bg-[#d4f060] text-[#1A1A17] font-semibold text-sm rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#C5E84D]/30"
              >
                Read More
                <span className="h-9 w-9 rounded-full bg-[#1A1A17] flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column — Accordion */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index

                return (
                  <div
                    key={index}
                    className={`rounded-2xl transition-all duration-500 ease-out ${
                      isOpen
                        ? 'bg-white/10 backdrop-blur-sm'
                        : 'bg-transparent border-b border-white/10'
                    } ${
                      isIntersecting
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: `${200 + index * 80}ms` }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className={`w-full flex items-center justify-between gap-4 text-left px-6 py-5 group ${
                        isOpen ? '' : 'hover:bg-white/5 rounded-2xl'
                      }`}
                    >
                      <span
                        className={`text-base font-semibold transition-colors duration-300 ${
                          isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#C5E84D] text-[#1A1A17]'
                            : 'bg-white/10 text-white/60'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" strokeWidth={2.5} />
                        ) : (
                          <Plus className="h-4 w-4" strokeWidth={2.5} />
                        )}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="px-6 pb-5 text-sm text-white/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
