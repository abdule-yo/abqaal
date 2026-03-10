import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Abqaal Agricultural Consulting Firm',
    short_name: 'Abqaal',
    description: 'Modern farming solutions across the Horn of Africa',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF5',
    theme_color: '#2D6A2E',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
