'use client'

import { useState } from 'react'
import { ArrowRight, Sprout, Mail } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.15 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section id="newsletter" className="py-24 px-4 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative bg-[#4A8B2C] rounded-3xl overflow-hidden px-6 sm:px-12 lg:px-20 py-16 lg:py-20 transition-all duration-700 ease-out ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#C5E84D]/10" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <Sprout className="h-5 w-5 text-[#C5E84D]" />
                <span className="text-sm font-semibold text-[#C5E84D] tracking-wide">
                  Stay Updated
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.08] tracking-tight mb-4">
                Agricultural Insights,
                <br />
                Delivered to You
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-md">
                Get the latest on agro-tech innovations, farming best practices,
                and Abqaal project updates — straight to your inbox.
              </p>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="h-14 w-14 rounded-full bg-[#C5E84D] flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-7 w-7 text-[#1A1A17]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">You&apos;re Subscribed!</h3>
                  <p className="text-white/60 text-sm">
                    Thank you for joining. We&apos;ll keep you updated with the latest agricultural insights.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-6 py-4 pr-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder:text-white/40 text-base focus:outline-none focus:border-[#C5E84D]/60 focus:ring-2 focus:ring-[#C5E84D]/20 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#C5E84D] hover:bg-[#d4f060] text-[#1A1A17] flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-white/35 text-xs pl-2">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
