'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  LogOut,
  Tag,
  ImageIcon,
  MessageSquareQuote,
  Settings,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { label: 'Products', href: '/dashboard/products', icon: Package },
  { label: 'Categories', href: '/dashboard/categories', icon: Tag },
  { label: 'Gallery', href: '/dashboard/gallery', icon: ImageIcon },
  { label: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquareQuote },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardShell({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E8E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-lg font-extrabold text-[#1B5E20]">
              Abqaal Admin
            </Link>
            <nav className="hidden sm:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#E8F5E9] text-[#1B5E20]'
                        : 'text-[#1A1A17]/50 hover:text-[#1A1A17] hover:bg-[#FAFAF5]'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs text-[#1A1A17]/40">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-[#1A1A17]/50 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="sm:hidden border-b border-[#E8E8E0] bg-white px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 py-2 min-w-max">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#E8F5E9] text-[#1B5E20]'
                    : 'text-[#1A1A17]/50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
