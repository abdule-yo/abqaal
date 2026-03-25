import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, Tag, MessageSquareQuote, ChevronRight, ArrowRight, Sprout } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { getProducts, getProductBySlug, getAllProductSlugs } from '@/lib/data'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

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

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const { products: allProducts } = await getProducts()
  const sameCategory = allProducts.filter((p) => p.category === product.category && p.slug !== slug)
  const others = allProducts.filter((p) => p.category !== product.category && p.slug !== slug)
  const related = [...sameCategory, ...others].slice(0, 3)
  const gradient =
    categoryGradients[product.category] ?? 'from-[#E8F5E9] via-[#F1F8E9] to-[#FFF8E1]'

  return (
    <main className="min-h-screen bg-[#FAFAF5]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-6">
        <nav className="flex items-center gap-1.5 text-sm text-[#1A1A17]/40">
          <Link
            href="/products"
            className="hover:text-[#4A8B2C] transition-colors font-medium"
          >
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium">
            {product.category}
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#1A1A17] font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-[2rem] bg-white overflow-hidden border border-[#E8E8E0]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div
              className={`relative min-h-[360px] lg:min-h-[560px] bg-gradient-to-br ${gradient}`}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-20 h-20 rounded-3xl bg-white/40 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-4xl font-extrabold text-[#4A8B2C]/30">
                    {product.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              {/* Category */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] text-[#4A8B2C] text-[11px] font-bold tracking-[0.15em] uppercase">
                  <Tag className="h-3 w-3" />
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A17] leading-tight tracking-tight mb-5">
                {product.name}
              </h1>

              {/* Description */}
              <div className="text-[#1A1A17]/55 text-[15px] leading-[1.8] mb-8 prose prose-sm prose-green max-w-none">
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </div>

              {/* Features */}
              {product.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-sm font-bold text-[#1A1A17] mb-4 tracking-wide">
                    Key Features
                  </h2>
                  <ul className="space-y-3">
                    {product.highlights.map((hl) => (
                      <li
                        key={hl}
                        className="flex items-start gap-3 text-sm text-[#1A1A17]/60"
                      >
                        <CheckCircle2 className="h-[18px] w-[18px] text-[#4A8B2C] mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-[#E8E8E0]">
                <span className="text-[11px] font-bold text-[#1A1A17]/30 uppercase tracking-[0.2em]">
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C5E84D] hover:bg-[#b8db3f] text-[#1A1A17] font-bold text-[15px] rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#C5E84D]/25 text-center"
                >
                  <MessageSquareQuote className="h-5 w-5" />
                  Request Quote
                </Link>
                <a
                  href={`https://wa.me/252634234817?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Can you share more details?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4A8B2C] hover:bg-[#1B5E20] text-white font-bold text-[15px] rounded-full transition-all duration-300 hover:scale-[1.02] text-center"
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="block text-[11px] font-bold text-[#4A8B2C]/50 tracking-[0.2em] uppercase mb-2">
                You may also like
              </span>
              <h2 className="text-2xl font-extrabold text-[#1A1A17]">
                Related Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#4A8B2C] hover:text-[#1B5E20] transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <div className="rounded-2xl bg-white overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4A8B2C]/6 border border-[#E8E8E0] hover:border-[#4A8B2C]/15">
                    <div
                      className={`relative h-44 bg-gradient-to-br ${rpGradient} overflow-hidden`}
                    >
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="w-10 h-10 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-lg font-extrabold text-[#4A8B2C]/30">
                            {rp.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#1A1A17]/60 tracking-wide">
                          {rp.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[14px] font-bold text-[#1A1A17] leading-snug mb-1.5 group-hover:text-[#4A8B2C] transition-colors duration-300">
                        {rp.name}
                      </h3>
                      <p className="text-[12px] text-[#1A1A17]/45 line-clamp-2 leading-relaxed mb-4">
                        {rp.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E0]">
                        <span className="text-sm font-extrabold text-[#1A1A17]">
                          {rp.price}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#4A8B2C] group-hover:gap-2 transition-all duration-300">
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
