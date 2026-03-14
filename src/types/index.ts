export interface Product {
  id: string
  name: string
  description: string
  category: string
  image: string
  price: string
  featured: boolean
  slug: string
  highlights: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  image: string
  slug: string
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  location: string
  partner: string
  images: string[]
  year: number
  category: string
  impact: string[]
  duration: string
  status: 'Completed' | 'Ongoing' | 'Upcoming'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  slug: string
  tags: string[]
}
