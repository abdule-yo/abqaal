import Link from 'next/link'
import Image from 'next/image'
import { COMPANY } from '@/lib/constants'

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Products', href: '/products' },
    { label: 'Blog', href: '/blog' },
    { label: 'Partners', href: '/about#partners' },
    { label: 'Careers', href: '/contact' },
  ],
  Help: [
    { label: 'FAQ', href: '/#faq' },
    { label: 'Support', href: '/contact' },
    { label: 'WhatsApp', href: `https://wa.me/252634234817` },
    { label: 'Email Us', href: `mailto:${COMPANY.email}` },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#111110] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <Image
                src="/logo-transparent.png"
                alt={COMPANY.shortName}
                width={40}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              We are dedicated to transforming the future of agriculture through
              technology, sustainability, and innovation across the Horn of Africa.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white mb-5 tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-white/10" />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/35">
            &copy; Copyright {new Date().getFullYear()}, {COMPANY.shortName} All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/#faq"
              className="text-sm text-white/45 hover:text-white transition-colors duration-300"
            >
              FAQ
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/45 hover:text-white transition-colors duration-300"
            >
              Term of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-white/45 hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/login"
              className="text-sm text-white/20 hover:text-white/45 transition-colors duration-300"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Giant Brand Name */}
      <div className="overflow-hidden px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-[clamp(4rem,15vw,12rem)] font-extrabold leading-none tracking-tighter text-transparent select-none uppercase"
            style={{
              WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.08)',
            }}
          >
            ABQAAL
          </h2>
        </div>
      </div>
    </footer>
  )
}
