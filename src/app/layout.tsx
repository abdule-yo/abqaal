import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://abqaal.com'),
  title: {
    default: 'Abqaal Agricultural Consulting Firm | Modern Farming Solutions in Somaliland',
    template: '%s | Abqaal Agricultural Firm',
  },
  description: 'Abqaal is a specialist agribusiness consulting firm providing advanced agro-tech solutions, training, research, and agricultural supply services across Somaliland, Somalia, Ethiopia, and the Horn of Africa.',
  keywords: [
    'agriculture Somaliland',
    'farming consulting Somalia',
    'agro-tech Horn of Africa',
    'greenhouse installation Somaliland',
    'drip irrigation Somalia',
    'agricultural training Hargeisa',
    'farm management consulting',
    'Abqaal agricultural firm',
    'seeds fertilizers Somaliland',
    'crop production Somalia',
  ],
  authors: [{ name: 'Abqaal Agricultural Consulting Firm' }],
  creator: 'Abqaal Agricultural Consulting Firm',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abqaal.com',
    siteName: 'Abqaal Agricultural Consulting Firm',
    title: 'Abqaal Agricultural Consulting Firm | Modern Farming Solutions',
    description: 'Bridging agro-tech gaps with modern farming solutions across the Horn of Africa.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abqaal Agricultural Consulting Firm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abqaal Agricultural Consulting Firm',
    description: 'Modern farming solutions across the Horn of Africa.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
