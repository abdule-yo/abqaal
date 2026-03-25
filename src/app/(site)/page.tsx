import { Hero } from '@/components/home/Hero'
import { AboutPreview } from '@/components/home/AboutPreview'
import { Stats } from '@/components/home/Stats'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { ProductsHighlight } from '@/components/home/ProductsHighlight'
import { GalleryMarquee } from '@/components/home/ServicesOverview'
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase'
import { Partners } from '@/components/home/Partners'
import { Testimonials } from '@/components/home/Testimonials'
import { CTA } from '@/components/home/CTA'
import { getHeroStats, getGalleryItems, getTestimonials, getProducts } from '@/lib/data'

export const revalidate = 60

export default async function HomePage() {
  const [stats, galleryItems, testimonials, { products }] = await Promise.all([
    getHeroStats(),
    getGalleryItems(),
    getTestimonials(),
    getProducts(),
  ])

  return (
    <main>
      <Hero />
      <AboutPreview />
      <Stats stats={stats} />
      <ServicesOverview />
      <ProductsHighlight products={products} />
      <GalleryMarquee />
      <ProjectsShowcase galleryItems={galleryItems} />
      <Partners />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </main>
  )
}
