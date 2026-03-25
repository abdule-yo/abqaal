import Link from 'next/link'
import { FolderKanban, Package, Tag, ImageIcon, MessageSquareQuote, ArrowUpRight, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getCurrentAdmin, canCreate, canManageUsers, getRoleLabel } from '@/lib/auth'

export default async function DashboardPage() {
  const admin = await getCurrentAdmin()
  const role = admin?.role ?? 'editor'
  const supabase = await createClient()

  const [
    { count: projectCount },
    { count: productCount },
    { count: categoryCount },
    { count: galleryCount },
    { count: testimonialCount },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('gallery').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      label: 'Projects',
      value: projectCount ?? 0,
      href: '/dashboard/projects',
      icon: FolderKanban,
      color: '#4A8B2C',
    },
    {
      label: 'Products',
      value: productCount ?? 0,
      href: '/dashboard/products',
      icon: Package,
      color: '#F5A623',
    },
    {
      label: 'Categories',
      value: categoryCount ?? 0,
      href: '/dashboard/categories',
      icon: Tag,
      color: '#2196F3',
    },
    {
      label: 'Gallery',
      value: galleryCount ?? 0,
      href: '/dashboard/gallery',
      icon: ImageIcon,
      color: '#9C27B0',
    },
    {
      label: 'Testimonials',
      value: testimonialCount ?? 0,
      href: '/dashboard/testimonials',
      icon: MessageSquareQuote,
      color: '#E65100',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1A1A17]">Dashboard</h1>
        <p className="text-sm text-[#1A1A17]/40 mt-1">
          Manage your projects, products, and site content
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white rounded-2xl p-6 border border-[#E8E8E0] hover:border-[#4A8B2C]/15 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#1A1A17]/20 group-hover:text-[#4A8B2C] transition-colors" />
            </div>
            <p className="text-3xl font-extrabold text-[#1A1A17]">{stat.value}</p>
            <p className="text-sm text-[#1A1A17]/40 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-bold text-[#1A1A17]/50 mb-4">
          Quick Actions
          <span className="ml-2 text-xs font-normal text-[#1A1A17]/30">
            ({getRoleLabel(role)})
          </span>
        </h2>
        <div className="flex flex-wrap gap-3">
          {canCreate(role) && (
            <>
              <Link
                href="/dashboard/projects/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white text-sm font-semibold rounded-full transition-colors"
              >
                New Project
              </Link>
              <Link
                href="/dashboard/products/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A17] hover:bg-[#111110] text-white text-sm font-semibold rounded-full transition-colors"
              >
                New Product
              </Link>
              <Link
                href="/dashboard/categories/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2196F3] hover:bg-[#1976D2] text-white text-sm font-semibold rounded-full transition-colors"
              >
                New Category
              </Link>
              <Link
                href="/dashboard/testimonials/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E65100] hover:bg-[#BF360C] text-white text-sm font-semibold rounded-full transition-colors"
              >
                New Testimonial
              </Link>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E8E8E0] hover:border-[#4A8B2C]/20 text-[#1A1A17]/60 text-sm font-semibold rounded-full transition-colors"
              >
                Edit Hero Stats
              </Link>
            </>
          )}
          {canManageUsers(role) && (
            <Link
              href="/dashboard/users/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-full transition-colors"
            >
              <Users className="h-3.5 w-3.5" />
              Add Team Member
            </Link>
          )}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E8E8E0] hover:border-[#4A8B2C]/20 text-[#1A1A17]/60 text-sm font-semibold rounded-full transition-colors"
          >
            View Site
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
