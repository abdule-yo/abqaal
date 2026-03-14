import { Product } from '@/types'

export const products: Product[] = [
  // ── Seeds ──────────────────────────────────────────────
  {
    id: 'seeds-vegetable',
    name: 'Premium Vegetable Seeds Collection',
    slug: 'premium-vegetable-seeds-collection',
    description:
      'A comprehensive collection of high-germination vegetable seeds including tomato, pepper, onion, lettuce, cabbage, and eggplant. Sourced from certified international suppliers and tested for the arid climate of the Horn of Africa. Each variety is selected for disease resistance, drought tolerance, and high yield potential to ensure maximum productivity for smallholder and commercial farms alike.',
    category: 'Seeds',
    image: '/products/product-1.jpg',
    price: '$45',
    featured: true,
    highlights: [
      'Germination rate above 90% guaranteed',
      'Drought-tolerant varieties for arid climates',
      'Includes 12 vegetable varieties per kit',
      'Certified disease-free seed stock',
      'Detailed planting guide included',
    ],
  },
  {
    id: 'seeds-cereal',
    name: 'Cereal & Grain Seeds',
    slug: 'cereal-grain-seeds',
    description:
      'High-yield cereal and grain seeds including sorghum, maize, wheat, and millet — specifically adapted for dryland farming conditions. These varieties have been trialled across East Africa and selected for their superior performance under low-rainfall scenarios, making them ideal for rainfed agriculture in Somaliland and the wider region.',
    category: 'Seeds',
    image: '/products/product-2.jpg',
    price: '$38',
    featured: false,
    highlights: [
      'Adapted for dryland farming conditions',
      'Includes sorghum, maize, wheat, and millet',
      'Short maturity cycle of 90–120 days',
      'High protein content varieties available',
      'Bulk packaging for commercial farms',
    ],
  },

  // ── Fertilizers ────────────────────────────────────────
  {
    id: 'fertilizers-npk',
    name: 'NPK Compound Fertilizer (15-15-15)',
    slug: 'npk-compound-fertilizer',
    description:
      'Balanced NPK compound fertilizer delivering equal parts nitrogen, phosphorus, and potassium for all-round crop nutrition. Designed to improve soil fertility and boost yields across a wide range of crops including vegetables, cereals, and fruit trees. Granular formulation ensures even distribution and slow nutrient release for sustained plant growth throughout the growing season.',
    category: 'Fertilizers',
    image: '/products/product-3.jpg',
    price: '$120',
    featured: true,
    highlights: [
      'Balanced 15-15-15 nutrient ratio',
      'Slow-release granular formulation',
      'Suitable for vegetables, cereals, and fruit trees',
      '50 kg bags — easy to transport and store',
      'Improves soil structure over successive applications',
    ],
  },
  {
    id: 'fertilizers-organic',
    name: 'Organic Compost & Bio-Fertilizer',
    slug: 'organic-compost-bio-fertilizer',
    description:
      'Certified organic compost enriched with beneficial microorganisms for sustainable soil health improvement. This bio-fertilizer restores depleted soils, increases water retention, and promotes healthy root development without synthetic chemicals. Ideal for organic farming operations and farmers transitioning to sustainable agricultural practices.',
    category: 'Fertilizers',
    image: '/products/product-4.jpg',
    price: '$85',
    featured: false,
    highlights: [
      'Certified organic — no synthetic chemicals',
      'Rich in beneficial microorganisms',
      'Improves soil water retention by up to 40%',
      'Supports organic certification compliance',
      'Available in 25 kg and 50 kg bags',
    ],
  },

  // ── Greenhouses ────────────────────────────────────────
  {
    id: 'greenhouse-standard',
    name: 'Standard Greenhouse Kit (8m x 30m)',
    slug: 'standard-greenhouse-kit',
    description:
      'Complete greenhouse structure kit including galvanized steel framework, UV-stabilized polyethylene covering, ventilation windows, drip irrigation hookups, and entry doors. Engineered for high-wind conditions common in the Horn of Africa. The 240 sqm growing area is ideal for year-round tomato, pepper, and cucumber production with controlled climate management.',
    category: 'Greenhouses',
    image: '/products/product-5.jpg',
    price: 'Contact for pricing',
    featured: true,
    highlights: [
      '240 sqm growing area (8m x 30m)',
      'Galvanized steel frame — 15-year lifespan',
      'UV-stabilized polyethylene covering',
      'Integrated ventilation and drip irrigation hookups',
      'Engineered for high-wind conditions',
    ],
  },
  {
    id: 'greenhouse-tunnel',
    name: 'Tunnel Greenhouse (6m x 20m)',
    slug: 'tunnel-greenhouse',
    description:
      'Cost-effective tunnel greenhouse designed for small-to-medium farms. Features a curved steel pipe frame with reinforced plastic film covering. Easy to assemble with minimal tools and includes roll-up side ventilation for temperature control. Perfect for nursery operations, seedling production, and protected vegetable cultivation.',
    category: 'Greenhouses',
    image: '/products/product-6.jpg',
    price: 'Contact for pricing',
    featured: false,
    highlights: [
      '120 sqm growing area (6m x 20m)',
      'Quick assembly — under 2 days with basic tools',
      'Roll-up side ventilation included',
      'Ideal for nursery and seedling production',
      'Affordable entry point for protected farming',
    ],
  },

  // ── Irrigation Equipment ───────────────────────────────
  {
    id: 'irrigation-drip',
    name: 'Complete Drip Irrigation System',
    slug: 'complete-drip-irrigation-system',
    description:
      'Water-efficient drip irrigation system suitable for up to 1 hectare of cropland. Includes main line, sub-main, laterals, drippers, filters, connectors, and a detailed installation manual. Reduces water consumption by up to 60% compared to flood irrigation while delivering precise moisture to the root zone for healthier, more productive crops.',
    category: 'Irrigation Equipment',
    image: '/products/product-7.jpg',
    price: '$650',
    featured: true,
    highlights: [
      'Covers up to 1 hectare of cropland',
      'Reduces water usage by up to 60%',
      'Includes filters, connectors, and drippers',
      'Pressure-compensating drippers for uniform flow',
      'Detailed installation manual provided',
    ],
  },
  {
    id: 'irrigation-sprinkler',
    name: 'Portable Sprinkler Irrigation Kit',
    slug: 'portable-sprinkler-irrigation-kit',
    description:
      'Versatile portable sprinkler system with adjustable spray patterns for field crops, lawns, and orchards. The kit includes impact sprinklers, aluminium risers, quick-connect couplings, and a portable pump adapter. Designed for easy setup and relocation across multiple field sections.',
    category: 'Irrigation Equipment',
    image: '/products/product-8.jpg',
    price: '$420',
    featured: false,
    highlights: [
      'Adjustable spray radius up to 15 metres',
      'Impact sprinklers with brass nozzles',
      'Quick-connect aluminium risers',
      'Portable — easy to relocate between fields',
      'Compatible with most water pump systems',
    ],
  },

  // ── Hand Tools ─────────────────────────────────────────
  {
    id: 'tools-essential-kit',
    name: 'Essential Farm Hand Tool Kit',
    slug: 'essential-farm-hand-tool-kit',
    description:
      'A curated set of 8 essential farm hand tools including a flat hoe, pointed shovel, garden rake, pruning shears, hand trowel, weeding fork, machete, and wheelbarrow. All tools feature forged steel heads with hardwood or fibreglass handles for durability and comfort during extended field work.',
    category: 'Hand Tools',
    image: '/products/product-9.jpg',
    price: '$95',
    featured: false,
    highlights: [
      '8-piece professional tool set',
      'Forged carbon steel heads',
      'Hardwood and fibreglass handles',
      'Includes wheelbarrow for transport',
      'Ideal for smallholder farms',
    ],
  },
  {
    id: 'tools-pruning-set',
    name: 'Professional Pruning & Grafting Set',
    slug: 'professional-pruning-grafting-set',
    description:
      'Precision pruning and grafting toolkit for orchard management and nursery operations. Includes bypass pruners, anvil loppers, grafting knife, budding tape, and a carry case. Japanese-style blades deliver clean cuts that promote faster healing and reduce disease risk in fruit trees and ornamental plants.',
    category: 'Hand Tools',
    image: '/products/product-10.jpg',
    price: '$68',
    featured: false,
    highlights: [
      'Japanese-style precision blades',
      'Includes bypass pruners and anvil loppers',
      'Grafting knife with budding tape included',
      'Ergonomic non-slip grip handles',
      'Protective carry case for field use',
    ],
  },

  // ── Plant Protection ───────────────────────────────────
  {
    id: 'protection-integrated-kit',
    name: 'Integrated Pest Management Kit',
    slug: 'integrated-pest-management-kit',
    description:
      'Complete IPM kit containing certified insecticides, fungicides, and herbicides along with a manual knapsack sprayer and protective equipment (gloves, mask, goggles). Designed for safe and effective crop protection following FAO guidelines. Each product carries clear dosage instructions and safety data sheets.',
    category: 'Plant Protection',
    image: '/products/product-11.jpg',
    price: '$175',
    featured: true,
    highlights: [
      'FAO-compliant certified chemicals',
      'Includes 16L knapsack sprayer',
      'Full PPE included (gloves, mask, goggles)',
      'Clear dosage and safety instructions',
      'Covers insecticide, fungicide, and herbicide needs',
    ],
  },
  {
    id: 'protection-bio-pesticide',
    name: 'Biological Pest Control Agents',
    slug: 'biological-pest-control-agents',
    description:
      'Eco-friendly biological pest control solutions including neem-based sprays, Bacillus thuringiensis (Bt) formulations, and beneficial insect attractants. Safe for use in organic farming systems and around water sources. These bio-pesticides target harmful insects while preserving pollinators and beneficial organisms in the farm ecosystem.',
    category: 'Plant Protection',
    image: '/products/product-12.jpg',
    price: '$55',
    featured: false,
    highlights: [
      'Neem-based and Bt bio-pesticide formulations',
      'Safe for organic farming systems',
      'Preserves pollinators and beneficial insects',
      'No chemical residue on harvested produce',
      'Effective against aphids, caterpillars, and whitefly',
    ],
  },

  // ── Farm Machinery ─────────────────────────────────────
  {
    id: 'machinery-tractor-25hp',
    name: 'Compact Utility Tractor (25 HP)',
    slug: 'compact-utility-tractor-25hp',
    description:
      'Reliable 25 HP compact tractor suitable for ploughing, tilling, hauling, and general farm work on small-to-medium farms. Features a diesel engine with low fuel consumption, 4WD capability, and a standard 3-point hitch for attaching implements. Compact frame navigates narrow rows and tight farm lanes with ease.',
    category: 'Farm Machinery',
    image: '/products/product-13.jpg',
    price: 'Contact for pricing',
    featured: true,
    highlights: [
      '25 HP diesel engine — low fuel consumption',
      '4WD capability for uneven terrain',
      'Standard 3-point hitch for implements',
      'Compact frame for narrow rows and tight spaces',
      '1-year manufacturer warranty included',
    ],
  },
  {
    id: 'machinery-power-tiller',
    name: 'Walk-Behind Power Tiller',
    slug: 'walk-behind-power-tiller',
    description:
      'Versatile walk-behind power tiller with adjustable tilling width and depth. Powered by a fuel-efficient 7 HP diesel engine, this tiller is perfect for land preparation, seedbed formation, and inter-row cultivation. Lightweight design and ergonomic handlebars reduce operator fatigue during extended use.',
    category: 'Farm Machinery',
    image: '/products/product-14.jpg',
    price: '$1,800',
    featured: false,
    highlights: [
      '7 HP diesel engine — fuel efficient',
      'Adjustable tilling width (60–90 cm)',
      'Tilling depth up to 25 cm',
      'Lightweight and easy to manoeuvre',
      'Suitable for land prep and inter-row cultivation',
    ],
  },

  // ── Geo-membrane & Dam Liners ──────────────────────────
  {
    id: 'liner-hdpe-dam',
    name: 'HDPE Dam Liner (1mm Thickness)',
    slug: 'hdpe-dam-liner-1mm',
    description:
      'Heavy-duty 1mm HDPE geo-membrane for water reservoir and dam lining applications. UV-resistant and puncture-resistant with a lifespan exceeding 20 years. Available in custom roll sizes to match any dam or reservoir dimensions. Essential for water harvesting and storage projects in arid and semi-arid regions of East Africa.',
    category: 'Geo-membrane & Dam Liners',
    image: '/products/product-15.jpg',
    price: 'Contact for pricing',
    featured: false,
    highlights: [
      '1mm thick HDPE — maximum durability',
      'UV and puncture resistant',
      'Lifespan exceeding 20 years',
      'Custom roll sizes available',
      'Ideal for water harvesting in arid regions',
    ],
  },
  {
    id: 'liner-fish-pond',
    name: 'Fish Pond & Aquaculture Liner',
    slug: 'fish-pond-aquaculture-liner',
    description:
      'Food-safe HDPE liner specifically formulated for aquaculture and fish pond applications. Non-toxic, smooth inner surface prevents fish injury, and the 0.75mm thickness balances durability with flexibility for easy installation. Available with welding service for seamless large-pond installations.',
    category: 'Geo-membrane & Dam Liners',
    image: '/products/product-16.jpg',
    price: 'Contact for pricing',
    featured: false,
    highlights: [
      'Food-safe and non-toxic formulation',
      'Smooth inner surface — fish safe',
      '0.75mm thickness — durable yet flexible',
      'On-site welding service available',
      'Suitable for tilapia, catfish, and shrimp farming',
    ],
  },
]
