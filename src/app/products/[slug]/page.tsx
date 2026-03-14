import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Tag, MessageSquareQuote, ChevronRight, ArrowRight } from 'lucide-react'
import { products } from '@/data/products'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// ── Static generation ───────────────────────────────────────
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.name} | Abqaal Agricultural Firm`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Abqaal Agricultural Firm`,
      description: product.description.slice(0, 160),
      images: [product.image],
    },
  }
}

// ── Category-aware gradient map ─────────────────────────────
const categoryGradients: Record<string, string> = {
  Seeds: 'from-[#4A8B2C]/25 via-[#C5E84D]/20 to-[#E8F5E9]',
  Fertilizers: 'from-[#F5A623]/25 via-[#FFF8E1] to-[#E8F5E9]',
  Greenhouses: 'from-[#1B5E20]/20 via-[#E8F5E9] to-[#C5E84D]/15',
  'Irrigation Equipment': 'from-[#2196F3]/20 via-[#E3F2FD] to-[#E8F5E9]',
  'Hand Tools': 'from-[#795548]/20 via-[#EFEBE9] to-[#E8F5E9]',
  'Plant Protection': 'from-[#FF7043]/20 via-[#FBE9E7] to-[#E8F5E9]',
  'Farm Machinery': 'from-[#546E7A]/20 via-[#ECEFF1] to-[#E8F5E9]',
  'Geo-membrane & Dam Liners': 'from-[#26A69A]/20 via-[#E0F2F1] to-[#E8F5E9]',
}

// ── Helpers ─────────────────────────────────────────────────
function getRelatedProducts(currentSlug: string, category: string, count: number) {
  const sameCategory = products.filter(
    (p) => p.category === category && p.slug !== currentSlug
  )
  if (sameCategory.length >= count) return sameCategory.slice(0, count)

  const others = products.filter(
    (p) => p.category !== category && p.slug !== currentSlug
  )
  return [...sameCategory, ...others].slice(0, count)
}

// ── Page ────────────────────────────────────────────────────
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const related = getRelatedProducts(product.slug, product.category, 3)
  const gradient =
    categoryGradients[product.category] ?? 'from-[#E8F5E9] via-[#F1F8E9] to-[#FFF8E1]'

  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-6">
        <nav className="flex items-center gap-1.5 text-sm text-[#1A1A17]/50">
          <Link
            href="/products"
            className="hover:text-[#4A8B2C] transition-colors font-medium"
          >
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="hover:text-[#4A8B2C] transition-colors font-medium">
            {product.category}
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#1A1A17] font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Detail card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-white overflow-hidden border border-[#E8E8E0]/60">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — image area */}
            <div
              className={`relative min-h-[360px] lg:min-h-[540px] bg-gradient-to-br ${gradient}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-3xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-4xl font-extrabold text-[#4A8B2C]/40">
                    {product.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right — info */}
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              {/* Category badge */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#4A8B2C] text-xs font-semibold tracking-wide uppercase">
                  <Tag className="h-3 w-3" />
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A17] leading-tight mb-5">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-[#1A1A17]/65 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Key Features */}
              {product.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-extrabold text-[#1A1A17] mb-4">
                    Key Features
                  </h2>
                  <ul className="space-y-3">
                    {product.highlights.map((hl) => (
                      <li
                        key={hl}
                        className="flex items-start gap-3 text-sm text-[#1A1A17]/70"
                      >
                        <CheckCircle2 className="h-[18px] w-[18px] text-[#4A8B2C] mt-0.5 flex-shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-[#E8E8E0]">
                <span className="text-xs font-semibold text-[#1A1A17]/40 uppercase tracking-widest">
                  Price
                </span>
                <p className="text-2xl font-extrabold text-[#1A1A17] mt-1">
                  {product.price}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C5E84D] hover:bg-[#b8db3f] text-[#1A1A17] font-bold rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#C5E84D]/25 text-center"
                >
                  <MessageSquareQuote className="h-5 w-5" />
                  Request Quote
                </Link>
                <a
                  href={`https://wa.me/252634000000?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Can you share more details?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.02] text-center"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A17] mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rp) => {
              const rpGradient =
                categoryGradients[rp.category] ??
                'from-[#E8F5E9] via-[#F1F8E9] to-[#FFF8E1]'
              return (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="group block"
                >
                  <div className="rounded-3xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/[0.06] border border-[#E8E8E0]/60">
                    <div
                      className={`relative h-44 bg-gradient-to-br ${rpGradient} overflow-hidden`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-xl font-extrabold text-[#4A8B2C]/40">
                            {rp.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#1A1A17]/70 tracking-wide">
                          {rp.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-extrabold text-[#1A1A17] leading-snug mb-1.5 group-hover:text-[#4A8B2C] transition-colors">
                        {rp.name}
                      </h3>
                      <p className="text-xs text-[#1A1A17]/55 line-clamp-2 leading-relaxed mb-3">
                        {rp.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-[#1A1A17]">
                          {rp.price}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A8B2C] group-hover:gap-1.5 transition-all">
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
