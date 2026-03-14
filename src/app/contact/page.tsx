import { Metadata } from 'next'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
  Sprout,
} from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import { ContactFormClient } from './contact-form-client'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Abqaal Agricultural Consulting Firm. Reach us in Hargeisa, Somaliland for agricultural consulting, equipment supply, and training services.',
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    description: 'Send us an email anytime',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone}`,
    description: 'Mon-Sat, 8am to 6pm',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: COMPANY.phone,
    href: `https://wa.me/252634234817`,
    description: 'Quick response guaranteed',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: COMPANY.location,
    href: '#',
    description: 'Visit us in Hargeisa',
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Hero */}
      <section className="relative bg-[#1B5E20] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sprout className="h-5 w-5 text-[#C5E84D]" />
            <span className="text-sm font-semibold text-[#C5E84D] tracking-wide">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Let&apos;s Grow Together
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70 leading-relaxed">
            Whether you need agricultural supplies, consulting, or training — our team is
            ready to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_INFO.map((info) => (
            <a
              key={info.label}
              href={info.href}
              target={info.href.startsWith('http') ? '_blank' : undefined}
              rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group bg-white rounded-2xl p-5 border border-[#E8E8E0] hover:border-[#4A8B2C]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-10 w-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-4 group-hover:bg-[#4A8B2C] transition-colors duration-300">
                <info.icon className="h-5 w-5 text-[#4A8B2C] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="text-xs text-[#1A1A17]/40 font-medium mb-1">{info.label}</div>
              <div className="text-sm font-bold text-[#1A1A17] mb-1">{info.value}</div>
              <div className="text-xs text-[#1A1A17]/50">{info.description}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E8E0]">
              <h2 className="text-2xl font-extrabold text-[#1A1A17] mb-2">
                Send Us a Message
              </h2>
              <p className="text-sm text-[#1A1A17]/50 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
              <ContactFormClient />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map placeholder */}
            <div className="bg-[#1B5E20] rounded-3xl p-8 h-64 flex flex-col items-center justify-center text-center">
              <MapPin className="h-10 w-10 text-[#C5E84D] mb-3" strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-white mb-1">Hargeisa, Somaliland</h3>
              <p className="text-white/50 text-sm">Horn of Africa</p>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E8E0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#4A8B2C]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A17]">Office Hours</h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: 'Saturday - Thursday', time: '8:00 AM - 6:00 PM' },
                  { day: 'Friday', time: 'Closed' },
                ].map((schedule) => (
                  <div key={schedule.day} className="flex justify-between items-center">
                    <span className="text-sm text-[#1A1A17]/60">{schedule.day}</span>
                    <span className="text-sm font-semibold text-[#1A1A17]">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick CTA */}
            <div className="bg-[#FAFAF5] rounded-3xl p-6 border border-[#E8F5E9]">
              <h3 className="text-base font-bold text-[#1A1A17] mb-2">Prefer WhatsApp?</h3>
              <p className="text-sm text-[#1A1A17]/50 mb-4">
                Get a faster response through WhatsApp — we typically reply within an hour.
              </p>
              <a
                href="https://wa.me/252634234817"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-semibold text-sm rounded-full transition-all duration-300 hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
