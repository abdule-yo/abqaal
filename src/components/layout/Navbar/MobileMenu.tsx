'use client'

import Link from 'next/link'
import { NAV_LINKS, COMPANY } from '@/lib/constants'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Phone, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt={COMPANY.shortName}
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg text-[#1B5E20]">
                {COMPANY.shortName}
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'text-[#4A8B2C] bg-[#E8F5E9]'
                        : 'text-[#1A1A17] hover:text-[#4A8B2C] hover:bg-[#E8F5E9]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <Separator className="my-6" />

        <div className="space-y-4 px-4">
          <a
            href={`tel:${COMPANY.phone}`}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#4A8B2C] transition-colors"
          >
            <Phone className="h-4 w-4 text-[#4A8B2C]" />
            {COMPANY.phone}
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#4A8B2C] transition-colors"
          >
            <Mail className="h-4 w-4 text-[#4A8B2C]" />
            {COMPANY.email}
          </a>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-[#4A8B2C]" />
            {COMPANY.location}
          </div>
        </div>

        <div className="mt-6 px-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full text-center px-6 py-3 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-medium rounded-full transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
