'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { COMPANY } from '@/lib/constants'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import { Menu, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo-transparent.png"
              alt={COMPANY.shortName}
              width={44}
              height={44}
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className={`font-extrabold text-2xl tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-[#1B5E20]' : 'text-white'
              }`}
            >
              {COMPANY.shortName}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:block">
            <NavLinks pathname={pathname} isScrolled={isScrolled} />
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-5">
            {/* CTA Button */}
            <Link
              href="/contact"
              className={`hidden sm:inline-flex items-center gap-2 px-7 py-3 font-semibold text-[15px] rounded-full transition-all duration-300 hover:scale-[1.03] ${
                isScrolled
                  ? 'bg-[#4A8B2C] text-white hover:bg-[#1B5E20] shadow-lg shadow-[#4A8B2C]/20'
                  : 'bg-[#FAFAF5] text-[#1A1A17] hover:bg-white shadow-lg shadow-black/10'
              }`}
            >
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'text-[#1A1A17] hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />
    </header>
  )
}
