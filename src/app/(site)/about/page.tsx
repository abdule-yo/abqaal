import { Metadata } from 'next'
import { CompanyStory } from '@/components/about/CompanyStory'
import { VisionMission } from '@/components/about/VisionMission'
import { Values } from '@/components/about/Values'
import { OrgStructure } from '@/components/about/OrgStructure'
import { Journey } from '@/components/about/Journey'
import { Team } from '@/components/about/Team'
import { AboutPartners } from '@/components/about/Partners'
import { ImpactCTA } from '@/components/about/ImpactCTA'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Abqaal Agricultural Consulting Firm — pioneering climate-smart agriculture across Somaliland, Puntland, and the Horn of Africa since 2018. 500+ projects, 317 greenhouses, 5,000+ farmers trained.',
}

export default function AboutPage() {
  return (
    <main>
      <CompanyStory />
      <VisionMission />
      <OrgStructure />
      <Journey />
      <Values />
      <Team />
      <AboutPartners />
      <ImpactCTA />
    </main>
  )
}
