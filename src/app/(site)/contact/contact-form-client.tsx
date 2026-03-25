'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

const SERVICES = [
  'Supply & Procurement',
  'Consulting & Technical Advisory',
  'Training & Capacity Building',
  'Farm Management',
  'Research & Development',
  'Other',
]

export function ContactFormClient() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="h-16 w-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-[#4A8B2C]" />
        </div>
        <h3 className="text-xl font-bold text-[#1A1A17] mb-2">Message Sent!</h3>
        <p className="text-sm text-[#1A1A17]/50 max-w-sm mx-auto">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-[#4A8B2C] hover:text-[#1B5E20] transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A17] mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/30 focus:outline-none focus:border-[#4A8B2C] focus:ring-2 focus:ring-[#4A8B2C]/10 transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A17] mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/30 focus:outline-none focus:border-[#4A8B2C] focus:ring-2 focus:ring-[#4A8B2C]/10 transition-all"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A17] mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+252 XX XXXXXXX"
            className="w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/30 focus:outline-none focus:border-[#4A8B2C] focus:ring-2 focus:ring-[#4A8B2C]/10 transition-all"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-[#1A1A17] mb-2">
            Service Interest
          </label>
          <select
            id="service"
            className="w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] focus:outline-none focus:border-[#4A8B2C] focus:ring-2 focus:ring-[#4A8B2C]/10 transition-all appearance-none"
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A17] mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tell us about your project or inquiry..."
          className="w-full px-4 py-3 rounded-xl border border-[#E8E8E0] bg-[#FAFAF5] text-sm text-[#1A1A17] placeholder:text-[#1A1A17]/30 focus:outline-none focus:border-[#4A8B2C] focus:ring-2 focus:ring-[#4A8B2C]/10 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-semibold text-sm rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[#4A8B2C]/25"
      >
        Send Message
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}
