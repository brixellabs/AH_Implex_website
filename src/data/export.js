// A&H IMPEX - Export Markets & Logistics Data

export const EXPORT_REGIONS = [
  {
    id: 'europe',
    name: 'European Union',
    countries: ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Poland'],
    share: '38%',
    description: 'Supplying hotel chains, department stores, & retail brands with high-thread-count bed linen & certified OEKO-TEX textiles.',
    ports: ['Rotterdam', 'Hamburg', 'Antwerp', 'Valencia'],
    transitDays: '22–28 Days'
  },
  {
    id: 'north-america',
    name: 'North America',
    countries: ['United States', 'Canada'],
    share: '32%',
    description: 'High-volume contract supply of fitted sheet suites, sateen sets, & casual apparel with US Customs & C-TPAT compliant container packing.',
    ports: ['New York / New Jersey', 'Los Angeles / Long Beach', 'Savannah', 'Vancouver'],
    transitDays: '26–34 Days'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    countries: ['England', 'Scotland', 'Wales'],
    share: '15%',
    description: 'Institutional dining linens, boutique resort bedding, & custom private-label home furnishings.',
    ports: ['Felixstowe', 'Southampton', 'London Gateway'],
    transitDays: '24–30 Days'
  },
  {
    id: 'middle-east',
    name: 'Middle East & GCC',
    countries: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait'],
    share: '10%',
    description: 'Five-star hospitality linens, luxury jacquard damask sets, & heavy-density hotel bath & bed collections.',
    ports: ['Jebel Ali (Dubai)', 'Dammam', 'Jeddah', 'Hamad'],
    transitDays: '8–14 Days'
  },
  {
    id: 'oceania',
    name: 'Australia & New Zealand',
    countries: ['Australia', 'New Zealand'],
    share: '5%',
    description: 'Pure cotton percale & breathable linen blends formatted specifically for Southern Hemisphere seasonal cycles.',
    ports: ['Sydney', 'Melbourne', 'Brisbane', 'Auckland'],
    transitDays: '18–24 Days'
  }
];

export const SHIPPING_CAPABILITIES = [
  {
    title: 'FCL & LCL Ocean Freight',
    description: 'Full Container Load (20ft, 40ft High Cube) & Less than Container Load consolidated sea freight with real-time GPS container tracking.',
    icon: 'Ship'
  },
  {
    title: 'Air Freight for Samples & Urgent POs',
    description: 'Rapid door-to-door courier samples (DHL/FedEx) & commercial air cargo chartering for critical seasonal rollouts.',
    icon: 'Plane'
  },
  {
    title: 'Flexible Incoterms 2020',
    description: 'Seamless execution of FOB, CIF, CFR, DDP, & EXW agreements tailored to your freight forwarder or direct consignee requirements.',
    icon: 'FileCheck'
  },
  {
    title: 'Customs & Seaworthy Packing',
    description: 'Heavy-duty 5-to-7-ply corrugated cartons with strapping, moisture-barrier lining, silica desiccant bags, & phytosanitary-certified heat-treated pallets.',
    icon: 'ShieldCheck'
  }
];
