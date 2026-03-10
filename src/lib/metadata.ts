import { Metadata } from 'next'

export function createMetadata({
  title,
  description,
  path = '',
}: {
  title?: string
  description: string
  path?: string
}): Metadata {
  const baseUrl = 'https://abqaal.com'

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title: title
        ? `${title} | Abqaal Agricultural Firm`
        : 'Abqaal Agricultural Consulting Firm',
      description,
      url: `${baseUrl}${path}`,
    },
  }
}
