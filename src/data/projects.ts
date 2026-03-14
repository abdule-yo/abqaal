import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'hargeisa-greenhouse',
    slug: 'hargeisa-greenhouse',
    title: 'Hargeisa Greenhouse Installation',
    description:
      'Installation of 10 modern greenhouse structures for year-round vegetable production in the Hargeisa region.',
    longDescription:
      'Abqaal partnered with the World Bank to design, supply, and install 10 commercial-grade greenhouse structures across Hargeisa. Each greenhouse was custom-built for the local climate with automated ventilation, shade netting, and drip irrigation integration. The project trained 40 farmers on greenhouse management, seedling production, and integrated pest management — resulting in a 3x increase in vegetable output during the first growing season. Post-installation monitoring continues with quarterly assessments.',
    location: 'Hargeisa',
    partner: 'World Bank',
    images: ['/projects/project-1.jpg'],
    year: 2024,
    category: 'Greenhouse Construction',
    impact: [
      '10 greenhouses installed and operational',
      '40 farmers trained in greenhouse management',
      '3x increase in vegetable output',
      'Year-round production capacity established',
    ],
    duration: '8 months',
    status: 'Completed',
  },
  {
    id: 'erigavo-irrigation',
    slug: 'erigavo-irrigation',
    title: 'Erigavo Drip Irrigation Project',
    description:
      'Implementation of water-efficient drip irrigation systems across 50 hectares of farmland in Erigavo district.',
    longDescription:
      'This USAID-funded project addressed critical water scarcity in Erigavo by installing drip irrigation infrastructure across 50 hectares of mixed-crop farmland. Abqaal conducted initial soil and water assessments, designed customized irrigation layouts for each farm, and provided hands-on installation training. The systems reduced water consumption by 60% while improving crop yields by 45%. The project also included construction of 3 rainwater harvesting reservoirs with geo-membrane lining.',
    location: 'Erigavo',
    partner: 'USAID',
    images: ['/projects/project-2.jpg'],
    year: 2024,
    category: 'Irrigation Systems',
    impact: [
      '50 hectares under drip irrigation',
      '60% reduction in water consumption',
      '45% improvement in crop yields',
      '3 rainwater harvesting reservoirs built',
    ],
    duration: '6 months',
    status: 'Completed',
  },
  {
    id: 'burco-training',
    slug: 'burco-training',
    title: 'Burco Farmer Training Program',
    description:
      'Comprehensive agricultural training for 200+ farmers on modern farming techniques, soil health, and post-harvest handling.',
    longDescription:
      'In collaboration with FAO, Abqaal delivered a 12-week intensive training program for over 200 farmers across the Burco district. The curriculum covered modern cultivation techniques, soil fertility management, integrated pest management, post-harvest handling, and basic farm business planning. Training combined classroom sessions with practical on-farm demonstrations. Participants received starter kits with seeds, hand tools, and reference materials. Follow-up coaching sessions were conducted for 6 months post-training.',
    location: 'Burco',
    partner: 'FAO',
    images: ['/projects/project-3.jpg'],
    year: 2023,
    category: 'Training & Capacity Building',
    impact: [
      '200+ farmers trained over 12 weeks',
      'Starter kits distributed to all participants',
      '6-month post-training coaching program',
      '35% increase in farm productivity reported',
    ],
    duration: '12 weeks + 6 months coaching',
    status: 'Completed',
  },
  {
    id: 'gabiley-farm',
    slug: 'gabiley-farm',
    title: 'Gabiley Commercial Farm Development',
    description:
      'End-to-end commercial farm development including land assessment, irrigation design, and full crop management advisory.',
    longDescription:
      'Abqaal provided comprehensive farm development services for a 120-hectare commercial operation in Gabiley, funded through World Vision. The project encompassed detailed soil analysis and land surveying, irrigation system design (centre pivot and drip), crop selection and rotation planning, and ongoing agronomic advisory. Our team managed the full implementation from land preparation through first harvest, establishing a sustainable production model for tomatoes, onions, and watermelons.',
    location: 'Gabiley',
    partner: 'World Vision',
    images: ['/projects/project-4.jpg'],
    year: 2023,
    category: 'Consulting & Technical Advisory',
    impact: [
      '120-hectare commercial farm established',
      'Centre pivot and drip irrigation installed',
      'Sustainable crop rotation model created',
      'First-season revenue exceeded projections by 20%',
    ],
    duration: '10 months',
    status: 'Completed',
  },
  {
    id: 'boorame-seeds',
    slug: 'boorame-seeds',
    title: 'Boorame Seed Distribution Program',
    description:
      'Large-scale distribution of certified seeds and agricultural inputs to 500 smallholder farmers across Boorame district.',
    longDescription:
      'Partnering with Oxfam, Abqaal procured and distributed certified seeds (vegetables, cereals, and forage) along with fertilizers and basic hand tools to 500 smallholder farming households in the Boorame district. The program included seed selection guidance based on local soil conditions, planting demonstrations, and crop calendar distribution. Follow-up field visits monitored germination rates and provided troubleshooting support throughout the growing season.',
    location: 'Boorame',
    partner: 'Oxfam',
    images: ['/projects/project-5.jpg'],
    year: 2023,
    category: 'Supply & Procurement',
    impact: [
      '500 farming households received inputs',
      '92% average seed germination rate achieved',
      'Crop calendars distributed to all participants',
      'Seasonal follow-up visits to 80% of farms',
    ],
    duration: '4 months',
    status: 'Completed',
  },
  {
    id: 'baki-water',
    slug: 'baki-water',
    title: 'Baki Water Harvesting Infrastructure',
    description:
      'Construction of water harvesting systems and geo-membrane lined reservoirs for agricultural water storage in Baki.',
    longDescription:
      'In one of the most water-scarce areas of Somaliland, Abqaal worked with HAVOYOCO to construct 5 large-capacity water harvesting reservoirs using geo-membrane dam liners. The project included site assessment, catchment area analysis, reservoir design, and installation of distribution piping to nearby farmland. Each reservoir serves 15-20 farming households, providing reliable water access for irrigation during dry seasons. Community water management committees were established and trained.',
    location: 'Baki',
    partner: 'HAVOYOCO',
    images: ['/projects/project-6.jpg'],
    year: 2024,
    category: 'Irrigation Systems',
    impact: [
      '5 water harvesting reservoirs constructed',
      '100+ households with reliable water access',
      'Community water committees established',
      'Year-round irrigation capacity created',
    ],
    duration: '7 months',
    status: 'Completed',
  },
  {
    id: 'garowe-research',
    slug: 'garowe-research',
    title: 'Garowe Agricultural Gap Research',
    description:
      'Comprehensive agriculture gap study identifying constraints and opportunities for farming development in the Garowe region.',
    longDescription:
      'Abqaal conducted a 4-month research study in Garowe in partnership with the Ministry of Agriculture Development, mapping the current state of agricultural production, identifying bottlenecks in the value chain, and recommending interventions for sustainable growth. The study covered soil quality assessments across 30 sites, water resource mapping, market access analysis, and farmer needs surveys. Findings were published in a policy brief that informed subsequent government and NGO investment decisions in the region.',
    location: 'Garowe',
    partner: 'Ministry of Agriculture Development',
    images: ['/projects/project-7.jpg'],
    year: 2024,
    category: 'Research & Development',
    impact: [
      '30 soil assessment sites surveyed',
      'Policy brief published and adopted',
      'Value chain bottlenecks identified',
      'Investment roadmap created for the region',
    ],
    duration: '4 months',
    status: 'Completed',
  },
  {
    id: 'arabsiyo-livestock',
    slug: 'arabsiyo-livestock',
    title: 'Arabsiyo Livestock Farm Management',
    description:
      'Turnkey management of a 200-head livestock operation including breeding program, feed optimization, and veterinary care coordination.',
    longDescription:
      'An investor-funded livestock operation in Arabsiyo engaged Abqaal for full farm management services. Our team manages a 200-head cattle operation with integrated fodder production, breeding program oversight, veterinary care coordination, and financial reporting. We introduced hydroponic fodder systems to supplement grazing during dry periods, resulting in improved animal health metrics and a 25% increase in milk production. Monthly investor reports provide full transparency on operations.',
    location: 'Arabsiyo',
    partner: 'BDO',
    images: ['/projects/project-8.jpg'],
    year: 2024,
    category: 'Farm Management',
    impact: [
      '200-head cattle operation managed',
      'Hydroponic fodder system introduced',
      '25% increase in milk production',
      'Monthly transparent investor reporting',
    ],
    duration: 'Ongoing',
    status: 'Ongoing',
  },
]
