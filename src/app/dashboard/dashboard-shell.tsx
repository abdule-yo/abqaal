'use client'

import { useState } from 'react'
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
  Users,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sprout,
} from 'lucide-react'
import type { AdminRole } from '@/lib/auth'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  requiredRole?: AdminRole
  group: 'main' | 'content' | 'system'
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, group: 'main' },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban, group: 'content' },
  { label: 'Products', href: '/dashboard/products', icon: Package, group: 'content' },
  { label: 'Categories', href: '/dashboard/categories', icon: Tag, group: 'content' },
  { label: 'Gallery', href: '/dashboard/gallery', icon: ImageIcon, group: 'content' },
  { label: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquareQuote, group: 'content' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, group: 'system' },
  { label: 'Team', href: '/dashboard/users', icon: Users, requiredRole: 'super_admin', group: 'system' },
]

const ROLE_CONFIG: Record<AdminRole, { label: string; color: string; bg: string }> = {
  super_admin: { label: 'Super Admin', color: 'text-purple-700', bg: 'bg-purple-500' },
  admin: { label: 'Admin', color: 'text-blue-700', bg: 'bg-blue-500' },
  editor: { label: 'Editor', color: 'text-gray-500', bg: 'bg-gray-400' },
}

export function DashboardShell({
  children,
  adminName,
  adminEmail,
  adminRole,
}: {
  children: React.ReactNode
  adminName?: string
  adminEmail: string
  adminRole: AdminRole
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.requiredRole || item.requiredRole === adminRole
  )

  const mainItems = visibleItems.filter((i) => i.group === 'main')
  const contentItems = visibleItems.filter((i) => i.group === 'content')
  const systemItems = visibleItems.filter((i) => i.group === 'system')

  const roleConfig = ROLE_CONFIG[adminRole]
  const displayName = adminName || adminEmail.split('@')[0]
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  function NavLink({ item, compact }: { item: NavItem; compact?: boolean }) {
    const isActive =
      pathname === item.href ||
      (item.href !== '/dashboard' && pathname.startsWith(item.href))

    return (
      <Link
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
          isActive
            ? 'bg-[#4A8B2C] text-white shadow-sm shadow-[#4A8B2C]/20'
            : 'text-[#1A1A17]/50 hover:bg-[#E8E8E0]/50 hover:text-[#1A1A17]'
        }`}
      >
        <item.icon className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? 'text-white' : 'text-[#1A1A17]/30 group-hover:text-[#4A8B2C]'}`} />
        {!compact && <span>{item.label}</span>}
        {!compact && isActive && (
          <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />
        )}
      </Link>
    )
  }

  function SidebarContent() {
    return (
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-5 pt-6 pb-8">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <div className="h-9 w-9 rounded-xl bg-[#4A8B2C] flex items-center justify-center">
              <Sprout className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <span className="text-[15px] font-extrabold text-[#1A1A17] tracking-tight block leading-none">
                Abqaal
              </span>
              <span className="text-[10px] font-semibold text-[#1A1A17]/30 tracking-[0.1em] uppercase leading-none">
                Admin
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-6 overflow-y-auto">
          {/* Main */}
          <div className="space-y-1">
            {mainItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* Content */}
          <div>
            <p className="px-3 mb-2 text-[10px] font-bold text-[#1A1A17]/25 uppercase tracking-[0.15em]">
              Content
            </p>
            <div className="space-y-1">
              {contentItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </div>

          {/* System */}
          <div>
            <p className="px-3 mb-2 text-[10px] font-bold text-[#1A1A17]/25 uppercase tracking-[0.15em]">
              System
            </p>
            <div className="space-y-1">
              {systemItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </div>
        </nav>

        {/* View site link */}
        <div className="px-3 py-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-[#1A1A17]/40 hover:bg-[#E8E8E0]/50 hover:text-[#1A1A17] transition-all duration-200"
          >
            <ExternalLink className="h-[18px] w-[18px] text-[#1A1A17]/25" />
            View Website
          </Link>
        </div>

        {/* User profile + sign out */}
        <div className="border-t border-[#E8E8E0] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-full ${roleConfig.bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1A17] truncate">
                {displayName}
              </p>
              <p className={`text-[10px] font-bold ${roleConfig.color}`}>
                {roleConfig.label}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#1A1A17]/30 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-[260px] lg:flex-col bg-white border-r border-[#E8E8E0] z-40">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-[#1A1A17]/30 hover:text-[#1A1A17] hover:bg-[#E8E8E0]/50 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* Main content area */}
      <div className="lg:pl-[260px]">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 lg:hidden bg-white border-b border-[#E8E8E0]">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => setMobileOpen(true)}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-[#1A1A17]/50 hover:bg-[#E8E8E0]/50 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-[#4A8B2C] flex items-center justify-center">
                <Sprout className="h-4 w-4 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm font-extrabold text-[#1A1A17]">Abqaal</span>
            </Link>

            <div className={`h-8 w-8 rounded-full ${roleConfig.bg} flex items-center justify-center text-white text-[10px] font-bold`}>
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          {children}
        </main>
      </div>
    </div>
  )
}
