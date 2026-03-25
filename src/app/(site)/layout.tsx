import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Abqaal Agricultural Consulting Firm',
            url: 'https://abqaal.com',
            logo: 'https://abqaal.com/logo.png',
            description: 'Specialist agribusiness consulting firm providing advanced agro-tech solutions across the Horn of Africa.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Hargeisa',
              addressCountry: 'Somaliland',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+252-63-4234817',
              contactType: 'customer service',
              email: 'abqaalconsulting@gmail.com',
            },
            sameAs: [],
          }),
        }}
      />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
