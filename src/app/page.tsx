import { Hero } from '@/components/home/Hero'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ProductsHighlight } from '@/components/home/ProductsHighlight'
import { FeaturedProducts } from '@/components/home/ProductsHighlight'
import { GalleryMarquee } from '@/components/home/ServicesOverview'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { Stats } from '@/components/home/Stats'
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase'
import { Partners } from '@/components/home/Partners'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'
import { CTA } from '@/components/home/CTA'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      <ProductsHighlight />
      <GalleryMarquee />
      <ServicesOverview />
      <Stats />
      <FeaturedProducts />
      <ProjectsShowcase />
      <Partners />
      <Testimonials />
      <Newsletter />
      <CTA />
    </main>
  )
}
