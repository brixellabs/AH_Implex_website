// A&H IMPEX - Product Catalog Data
// High-resolution photography from Unsplash curated specifically for textile manufacturing and export

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'home', label: 'Home Textiles' },
  { id: 'apparel', label: 'Apparel & Garments' },
  { id: 'hospitality', label: 'Hospitality & Dining' },
  { id: 'oem', label: 'OEM & Private Label' },
];

export const PRODUCTS = [
  {
    id: 'ht-001',
    category: 'home',
    categoryName: 'Home Textiles',
    title: 'Luxury Sateen Bedding Collection',
    tagline: 'Ultra-soft 400–1000 Thread Count Combed Cotton',
    description: 'Engineered for five-star comfort, our premium sateen bed linen sets feature long-staple combed cotton with silky luster, breathable weave, and durable hemstitching.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=80',
    specs: {
      composition: '100% Long-Staple Combed Cotton',
      threadCount: '300 TC – 1000 TC Sateen / Percale',
      gsm: '125 – 160 GSM',
      finish: 'Mercerized, Anti-Pilling, Pre-Shrunk',
      sizes: 'Single, Double, Queen, King, Super King, Custom Sizing',
      colors: 'Reactive dyed / High Fastness (Pantone matched)',
      moq: '500 Sets / Color',
      leadTime: '30–45 Days'
    },
    features: ['Silky soft drape', 'Breathable natural fibers', 'Commercial laundry tested (200+ washes)', 'OEKO-TEX Certified dyes'],
    badge: 'Flagship Export'
  },
  {
    id: 'ht-002',
    category: 'home',
    categoryName: 'Home Textiles',
    title: 'Crisp Percale Duvet & Pillowcase Suites',
    tagline: 'Cool, Matte Finish in 100% Organic & BCI Cotton',
    description: 'Crisp, lightweight hotel-grade percale weave designed for warmer climates and breathable luxury. Finished with hidden button closures and reinforced envelope flaps.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=900&q=80',
    specs: {
      composition: '100% BCI Cotton or 60/40 Poly-Cotton Blend',
      threadCount: '200 TC – 400 TC Plain Percale',
      gsm: '115 – 135 GSM',
      finish: 'Bio-wash, Soft hand feel, Easy Iron',
      sizes: 'Custom European & American sizing',
      colors: 'Solid White, Pastels, Yarn-dyed stripes',
      moq: '800 Sets',
      leadTime: '25–35 Days'
    },
    features: ['Crisp hotel touch', 'Exceptional tensile strength', 'Fast-drying construction', 'Minimal shrinkage (< 2%)'],
    badge: 'Best Seller'
  },
  {
    id: 'ap-001',
    category: 'apparel',
    categoryName: 'Apparel & Garments',
    title: 'Precision Stretch Chinos & Trousers',
    tagline: 'Export-Grade Twill with Ergonomic Flex Weave',
    description: 'Premium tailored casual trousers crafted on modern high-speed air-jet looms. Treated with garment-wash enzyme treatments for an elevated hand-feel and consistent color fastness.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
    specs: {
      composition: '98% Combed Cotton, 2% Spandex / Elastane',
      weave: '3/1 Left-hand Twill',
      gsm: '240 – 280 GSM',
      finish: 'Garment dyed, Peach finish, Enzyme wash',
      sizes: 'Waist 28" – 42" / Inseam 30" – 36"',
      colors: 'Navy, Khaki, Olive, Stone, Charcoal, Custom',
      moq: '1,000 Pairs / Style',
      leadTime: '40–50 Days'
    },
    features: ['Reinforced pocket bags & waistband', 'YKK metal zippers', 'Bar-tacked stress points', 'Pre-washed for zero shrinkage'],
    badge: 'Global Apparel'
  },
  {
    id: 'ap-002',
    category: 'apparel',
    categoryName: 'Apparel & Garments',
    title: 'Athleisure French Terry & Fleece Tracksuits',
    tagline: 'Heavyweight Loopback Knits & Combed Fleece',
    description: 'Designed for international retail brands, featuring dense loopback French terry and brushed interior fleece. Double-needle coverstitch construction throughout.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    specs: {
      composition: '80% Cotton, 20% Polyester / 100% Cotton Fleece',
      gsm: '320 – 420 GSM Heavyweight',
      finish: 'Carbonized peach finish, Anti-pilling silicone bath',
      sizes: 'XS – 3XL Unisex & Custom Brand Fit',
      colors: 'Custom Lab Dip (Pantone Matching System)',
      moq: '600 Sets / Colorway',
      leadTime: '30–45 Days'
    },
    features: ['High-density ribbed cuffs and hem', 'Heavyweight braided drawstrings', 'Custom branded silicone/woven labels', 'Colorfast reactive dyeing'],
    badge: 'Export Ready'
  },
  {
    id: 'hosp-001',
    category: 'hospitality',
    categoryName: 'Hospitality & Dining',
    title: 'Institutional White Hotel Bedding',
    tagline: 'Heavy-Duty Industrial Laundry Resistant Weave',
    description: 'Built to withstand chlorine washing, high-temperature calendaring, and frequent commercial cycles without graying or fiber degradation. Standard choice for resort chains and luxury boutique hotels.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    specs: {
      composition: '50% Cotton / 50% Polyester or 100% Ring-Spun Cotton',
      threadCount: '250 TC – 400 TC Stripe & Plain',
      gsm: '130 – 150 GSM',
      finish: 'Optical Bright White (CIE Whiteness 150+)',
      sizes: 'Standard Twin, Full, Queen, King (Hospitality Specs)',
      moq: '1,500 Pieces',
      leadTime: '30 Days'
    },
    features: ['Chlorine-resistant optical whiteness', 'Color-coded sizing hem threads for housekeeping', 'High-tensile selvage edges', 'Zero pilling after 150 commercial washes'],
    badge: 'Hospitality Grade'
  },
  {
    id: 'hosp-002',
    category: 'hospitality',
    categoryName: 'Hospitality & Dining',
    title: 'Jacquard Damask Table Linen & Napkins',
    tagline: 'Spun Polyester & Combed Cotton Banquet Linens',
    description: 'Stain-release treated damask jacquard and satin-band napkins for premium event centers, convention halls, and banquet catering services.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80',
    specs: {
      composition: '100% Spun Polyester (Cotton Hand-feel) or 80/20 Cotton-Poly',
      gsm: '210 – 240 GSM Heavy Weave',
      finish: 'Fluorocarbon Soil & Stain Release, Mercerized',
      sizes: 'Napkins 20"x20", Cloths: 54"x54" up to 132" Round',
      colors: 'Pure White, Ivory, Burgundy, Navy, Black',
      moq: '1,000 Napkins / 300 Tablecloths',
      leadTime: '25–35 Days'
    },
    features: ['Exceptional soil release performance', 'Lint-free hemmed edge execution', 'Retains crisp body wash after wash', 'Non-fading vat dye coloration'],
    badge: 'Commercial'
  },
  {
    id: 'oem-001',
    category: 'oem',
    categoryName: 'OEM & Private Label',
    title: 'Custom Fabric Weaving & Yarn Dyeing',
    tagline: 'Bespoke Warp/Weft Constructions from Greige to Finish',
    description: 'Full OEM vertical manufacturing capability. Provide us your target GSM, yarn count, and weave specification (Twill, Dobby, Oxford, Satin, Canvas) to produce custom greige or dyed master rolls.',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=900&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80',
    specs: {
      composition: 'Cotton, Poly-Cotton, Viscose, Modal, Linen Blends',
      widths: '60" to 126" (Narrow & Extra-Wide Looms)',
      gsm: '90 – 450 GSM',
      capabilities: 'Greige fabric rolls, Bleached, Pigment printed, Reactive printed, Rotary printed',
      moq: '5,000 Linear Meters',
      leadTime: '35–45 Days'
    },
    features: ['Comprehensive lab dip matching (Delta E < 0.8)', 'Air-jet and projectile loom capacity', 'AQL 1.5 export quality standard', 'Export seaworthy roll packing in polyethylene + woven poly'],
    badge: 'OEM Solution'
  },
  {
    id: 'oem-002',
    category: 'oem',
    categoryName: 'OEM & Private Label',
    title: 'Turnkey Retail Packaging & Private Labeling',
    tagline: 'Store-Ready Packaging, Barcoding & Customs Compliance',
    description: 'We handle entire packaging workflows: custom photo-insert cards, self-fabric zippered bags, FSC-certified cardboard sleeves, UPC barcodes, and export carton marking.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80',
    specs: {
      packagingTypes: 'PVC Wire Bags, Self-Fabric Pouches, Ribbon Tie Bundles, FSC Paper Sleeves',
      branding: 'Woven jacquard labels, Satin wash care labels, Hangtags, RFID tags',
      cartonSpecs: '5-Ply / 7-Ply Heavy Corrugated with strapping',
      compliance: 'Retail Barcodes (EAN/UPC), Drop-test approved cartons',
      moq: 'Flexible based on product line',
      leadTime: 'Integrated with production'
    },
    features: ['Direct-to-warehouse palletization', 'Amazon FBA & Big Box compliance', 'Anti-mildew silica gel & humidity protection', 'Inspection audit report with high-res photos prior to container seal'],
    badge: 'Private Label'
  }
];
