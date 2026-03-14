import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'

interface NavLinksProps {
  pathname: string
  isScrolled: boolean
}

export default function NavLinks({ pathname, isScrolled }: NavLinksProps) {
  return (
    <ul className="flex items-center gap-2">
      {NAV_LINKS.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href)

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`inline-flex items-center px-5 py-2.5 text-[15px] font-medium rounded-full transition-all duration-300 ${
                isActive
                  ? 'text-[#C5E84D]'
                  : isScrolled
                    ? 'text-[#1A1A17] hover:text-[#4A8B2C] hover:bg-[#E8F5E9]/60'
                    : 'text-white/90 hover:text-[#C5E84D] hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
