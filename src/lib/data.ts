import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type DBProduct = Database['public']['Tables']['products']['Row']
type DBProject = Database['public']['Tables']['projects']['Row']
type DBCategory = Database['public']['Tables']['categories']['Row']
type DBGallery = Database['public']['Tables']['gallery']['Row']
type DBTestimonial = Database['public']['Tables']['testimonials']['Row']

// Normalize DB product to match the shape the UI expects
function normalizeProduct(p: DBProduct) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    category: p.category,
    category_id: p.category_id,
    image: p.image || '/products/placeholder.jpg',
    price: p.price,
    featured: p.featured,
    highlights: p.highlights || [],
  }
}

// Normalize DB project to match the shape the UI expects
function normalizeProject(p: DBProject) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    longDescription: p.long_description,
    location: p.location,
    partner: p.partner,
    images: p.images || [],
    year: p.year,
    category: p.category,
    impact: p.impact || [],
    duration: p.duration,
    status: p.status as 'Completed' | 'Ongoing' | 'Upcoming',
    coverImage: p.cover_image || '',
    coverColor: p.cover_color || '',
  }
}

export async function getProducts() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) {
      return { products: [], source: 'database' as const }
    }

    return {
      products: (data as DBProduct[]).map(normalizeProduct),
      source: 'database' as const,
    }
  } catch {
    return { products: [], source: 'database' as const }
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) return null
    return normalizeProduct(data as DBProduct)
  } catch {
    return null
  }
}

export async function getAllProductSlugs() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('products').select('slug')

    if (error || !data) return []
    return (data as { slug: string }[]).map((p) => p.slug)
  } catch {
    return []
  }
}

export async function getProjects() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false })

    if (error || !data) {
      return { projects: [], source: 'database' as const }
    }

    return {
      projects: (data as DBProject[]).map(normalizeProject),
      source: 'database' as const,
    }
  } catch {
    return { projects: [], source: 'database' as const }
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) return null
    return normalizeProject(data as DBProject)
  } catch {
    return null
  }
}

export async function getAllProjectSlugs() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('projects').select('slug')

    if (error || !data) return []
    return (data as { slug: string }[]).map((p) => p.slug)
  } catch {
    return []
  }
}

// ─── Categories ──────────────────────────────────────────────

export async function getCategories() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data) return []
    return data as DBCategory[]
  } catch {
    return []
  }
}

// ─── Hero Stats (site_settings) ─────────────────────────────

export type HeroStat = {
  value: number
  suffix: string
  label: string
  description: string
}

export async function getHeroStats(): Promise<HeroStat[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'hero_stats')
      .single()

    if (error || !data) return []
    return (data.value as unknown as HeroStat[]) ?? []
  } catch {
    return []
  }
}

// ─── Gallery ────────────────────────────────────────────────

export async function getGalleryItems() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data) return []
    return data as DBGallery[]
  } catch {
    return []
  }
}

// ─── Testimonials ───────────────────────────────────────────

export async function getTestimonials() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data) return []
    return data as DBTestimonial[]
  } catch {
    return []
  }
}
