import { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'supply-procurement',
    title: 'Supply & Procurement',
    description:
      'Abqaal delivers a full spectrum of agricultural inputs and equipment, ensuring farmers and agribusinesses across the Horn of Africa have reliable access to quality supplies. From certified seeds and fertilizers to complete greenhouse construction and advanced irrigation systems, we are a single-source procurement partner for every stage of the farming cycle.',
    icon: 'Package',
    features: [
      'Certified seeds and high-quality fertilizers sourced from trusted global and regional suppliers',
      'Greenhouse supply and full construction services — polyhouse, shade net, tunnel, and multi-span structures',
      'Irrigation system design and installation including drip, sprinkler, centre pivot, furrow, and rain gun systems',
      'Farm machinery procurement — tractors, tillers, harvesters, and post-harvest processing equipment',
      'Specialized hand tools, plant protection chemicals, and crop care inputs',
      'Geo-membrane and dam liner supply for water harvesting and storage infrastructure',
      'Water tanks and reservoir solutions for farms operating in arid and semi-arid regions',
      'Seed trays and propagation materials for nursery and seedling production',
    ],
    image: '/services/service-supply-procurement.jpg',
    slug: 'supply-procurement',
  },
  {
    id: 'consulting-advisory',
    title: 'Consulting & Technical Advisory',
    description:
      'Our consulting division provides evidence-based advisory services to farmers, investors, NGOs, and government agencies. We combine deep local knowledge with international best practices to deliver actionable strategies that drive agricultural productivity, business growth, and sustainable land use across Somaliland, Somalia, and the wider Horn of Africa.',
    icon: 'ClipboardList',
    features: [
      'Business consulting and agribusiness development for startups, cooperatives, and established enterprises',
      'Comprehensive soil analysis and nutrient management recommendations',
      'Water quality analysis and sustainable water resource planning',
      'Plant health clinic services including disease identification and integrated pest management guidance',
      'Crop calendar development and precision farm assessment for optimal planting and harvest schedules',
      'Precision land management using GIS mapping and remote sensing data',
      'Risk management frameworks and entry/exit strategies for agricultural investors',
      'Economic modelling, feasibility studies, and targeted marketing programs for agri-products',
    ],
    image: '/services/service-consulting-advisory.jpg',
    slug: 'consulting-advisory',
  },
  {
    id: 'training-capacity',
    title: 'Training & Capacity Building',
    description:
      'Abqaal empowers farmers, technicians, and agricultural professionals through hands-on training programs rooted in modern agronomic science. Our capacity-building initiatives cover everything from greenhouse assembly and irrigation setup to hydroponics and water conservation, ensuring knowledge transfer that creates lasting impact on the ground.',
    icon: 'GraduationCap',
    features: [
      'Greenhouse construction training — assembly, covering, ventilation, and climate control techniques',
      'Drip irrigation setup and maintenance training for smallholder and commercial farms',
      'Modern agriculture practices including integrated crop management and soil health restoration',
      'In-house classroom sessions and on-farm practical training tailored to participant skill levels',
      'Agronomy research workshops on crop trials, data collection, and adaptive experimentation',
      'One-on-one farm coaching and mentorship programs for emerging farmers',
      'Hydroponics and hydroponic fodder growing systems for livestock feed production',
      'Water conservation techniques including rainwater harvesting, mulching, and deficit irrigation',
    ],
    image: '/services/service-training-capacity.jpg',
    slug: 'training-capacity',
  },
  {
    id: 'farm-management',
    title: 'Farm Management',
    description:
      'Abqaal offers turnkey farm management services for investors and landowners who seek professional oversight of their agricultural operations. From initial planning through harvest and post-harvest handling, we manage every aspect of the farm — delivering consistent results, transparent reporting, and maximized returns across livestock, dairy, horticulture, and broad acre cropping enterprises.',
    icon: 'Tractor',
    features: [
      'End-to-end farm management tailored for absentee investors and institutional landowners',
      'Livestock and dairy operation management including breeding programs and feed optimization',
      'Broad acre cropping management for cereal, pulse, and oilseed production systems',
      'Horticulture management covering fruit, vegetable, and flower production under open field and protected conditions',
      'Crop rotation planning and soil fertility management for long-term land productivity',
      'Fertilization and fertigation scheduling based on soil test results and crop nutrient demand',
      'Integrated pest and weed control programs with minimal chemical input strategies',
      'Harvesting coordination, post-harvest quality control, and post-installation monitoring of farm infrastructure',
    ],
    image: '/services/service-farm-management.jpg',
    slug: 'farm-management',
  },
  {
    id: 'research-development',
    title: 'Research & Development',
    description:
      'Our R&D division conducts applied agricultural research to bridge knowledge gaps and introduce evidence-based innovations to the farming sector in Somaliland, Somalia, and the broader Horn of Africa. We collaborate with academic institutions, development partners, and farming communities to generate data that informs policy, investment, and on-the-ground practice.',
    icon: 'Microscope',
    features: [
      'Agronomy research including varietal trials, planting density studies, and input optimization experiments',
      'Agriculture gap research identifying critical constraints and opportunities specific to Somaliland and Somalia',
      'Market research and demand analysis for high-value crops and agricultural commodities',
      'Value chain analysis mapping production, processing, distribution, and market access bottlenecks',
      'On-farm adaptive research conducted in partnership with local farmers under real-world conditions',
      'Environmental and water catchment research supporting sustainable natural resource management',
    ],
    image: '/services/service-research-development.jpg',
    slug: 'research-development',
  },
]
