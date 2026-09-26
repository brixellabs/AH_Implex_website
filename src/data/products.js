/**
 * ==============================================================================
 * A&H IMPEX - PRODUCT CATALOG DATA MODULE (FROM SRC/ASSETS/PRODUCT FOLDER)
 * ==============================================================================
 * Configured with images from the dedicated src/assets/Product/ folder:
 * - luxury bedsheets.jpg
 * - High thread count hotel & retail bedding crafted from combed long-staple cotton..jfif
 * - Engineered high-durability fabrics for oil & gas, construction, and utilities..jfif
 * - Plush, ultra-absorbent terry towelling with reinforced double-stitched borders..jfif
 * - Antimicrobial, bleach-safe fabrics for hospital systems and surgical centers..jfif
 * - carded yarn canvas.jfif
 * ==============================================================================
 */

// Local Product Asset Imports (Clean URL-safe filenames for production deployment)
import luxuryBedsheetsImg from '../assets/Product/luxury-bedsheets.jpg';
import highThreadCountImg from '../assets/Product/high-thread-count-bedding.jfif';
import industrialFabricsImg from '../assets/Product/industrial-durability-fabrics.jfif';
import terryTowelsImg from '../assets/Product/plush-terry-towelling.jfif';
import medicalFabricsImg from '../assets/Product/antimicrobial-hospital-fabrics.jfif';
import cardedYarnCanvasImg from '../assets/Product/carded-yarn-canvas.jfif';

export const PRODUCT_IMAGES = {
  luxuryBedsheets: luxuryBedsheetsImg,
  highThreadCount: highThreadCountImg,
  industrialFabrics: industrialFabricsImg,
  terryTowels: terryTowelsImg,
  medicalFabrics: medicalFabricsImg,
  cardedYarnCanvas: cardedYarnCanvasImg,
};

export function getProductFallbackImage(product) {
  if (!product) return luxuryBedsheetsImg;
  
  const text = `${product.id || ''} ${product.title || ''} ${product.category || ''} ${product.category_name || ''} ${product.categoryName || ''} ${product.tagline || ''} ${product.description || ''} ${product.badge || ''}`.toLowerCase();
  
  // 1. Towels & Terry Bath Linens
  if (text.includes('towel') || text.includes('terry') || text.includes('bath') || text.includes('absorbent') || text.includes('plush') || text.includes('resort') || text.includes('dining') || text.includes('550') || text.includes('700')) {
    return terryTowelsImg;
  }
  // 2. Medical, Hospital Scrubs & Autoclavable Fabrics
  if (text.includes('hospital') || text.includes('medical') || text.includes('scrub') || text.includes('autoclav') || text.includes('barrier') || text.includes('drape') || text.includes('surgical') || text.includes('bleach') || text.includes('antimicrobial') || text.includes('poplin')) {
    return medicalFabricsImg;
  }
  // 3. Yarn Cones, Canvas & OEM Weaving
  if (text.includes('canvas') || text.includes('duck') || text.includes('carded') || text.includes('cone') || text.includes('yarn') || text.includes('greige') || text.includes('oem') || text.includes('weaving')) {
    return cardedYarnCanvasImg;
  }
  // 4. Industrial Twill & Workwear Uniforms
  if (text.includes('workwear') || text.includes('twill') || text.includes('industrial') || text.includes('durability') || text.includes('flame') || text.includes('apparel') || text.includes('oil') || text.includes('gas') || text.includes('11612') || text.includes('heavy-duty')) {
    return industrialFabricsImg;
  }
  // 5. High Thread Count Hotel Percale Bedding
  if (text.includes('thread') || text.includes('percale') || text.includes('300tc') || text.includes('hotel') || text.includes('retail bedding') || text.includes('flagship')) {
    return highThreadCountImg;
  }
  // 6. Luxury Sateen Bedding Collection
  if (text.includes('sateen') || text.includes('luxury') || text.includes('bed') || text.includes('sheet') || text.includes('duvet') || text.includes('combed') || text.includes('400tc') || text.includes('1000tc')) {
    return luxuryBedsheetsImg;
  }
  
  return luxuryBedsheetsImg;
}

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'home', label: 'Home Textiles' },
  { id: 'apparel', label: 'Apparel & Workwear' },
  { id: 'hospitality', label: 'Hospitality & Dining' },
  { id: 'medical', label: 'Institutional & Medical' },
  { id: 'oem', label: 'OEM & Yarn Weaving' },
];

export const PRODUCTS = [
  {
    id: 'prod-01',
    category: 'home',
    categoryName: 'Home Textiles',
    title: 'Luxury Sateen Bedding Collection',
    tagline: 'Ultra-soft 400–1000 Thread Count Combed Cotton',
    description: 'Engineered for five-star comfort, our premium bed linen sets feature long-staple combed cotton with silky luster, breathable weave, and durable hemstitching.',
    image: luxuryBedsheetsImg,
    fallbackImage: luxuryBedsheetsImg,
    specs: {
      composition: '100% Long-Staple Combed Cotton',
      threadCount: '400 TC – 1000 TC Sateen / Percale',
      gsm: '125 – 160 GSM',
      finish: 'Mercerized, Anti-Pilling, Pre-Shrunk',
      sizes: 'Single, Double, Queen, King, Super King',
      colors: 'Reactive dyed / High Fastness',
      moq: '500 Sets / Color',
      leadTime: '30–45 Days'
    },
    features: ['Silky soft drape', 'Breathable natural fibers', 'Commercial laundry tested (200+ washes)', 'OEKO-TEX Certified dyes'],
    badge: 'Luxury Bedding'
  },
  {
    id: 'prod-02',
    category: 'home',
    categoryName: 'Home Textiles',
    title: 'High Thread-Count Hotel & Retail Bedding',
    tagline: 'High thread count hotel & retail bedding crafted from combed long-staple cotton',
    description: 'Crisp, lightweight hotel-grade percale and sateen weave designed for breathable luxury. Finished with hidden button closures and reinforced envelope pillow flaps.',
    image: highThreadCountImg,
    fallbackImage: highThreadCountImg,
    specs: {
      composition: '100% Combed Cotton / Egyptian Blend',
      threadCount: '300 TC – 800 TC Sateen & Percale',
      gsm: '120 – 150 GSM',
      finish: 'Bio-wash, Soft hand feel, Easy Iron',
      sizes: 'Custom European & American sizing',
      colors: 'Solid White, Pastels, Yarn-dyed stripes',
      moq: '600 Sets',
      leadTime: '25–35 Days'
    },
    features: ['Crisp hotel touch', 'Exceptional tensile strength', 'Fast-drying construction', 'Minimal shrinkage (< 2%)'],
    badge: 'Flagship Export'
  },
  {
    id: 'prod-03',
    category: 'apparel',
    categoryName: 'Apparel & Workwear',
    title: 'Industrial Workwear & High-Durability Twill',
    tagline: 'Engineered high-durability fabrics for oil & gas, construction, and utilities',
    description: 'Precision woven 3/1 twill fabrics engineered for harsh industrial environments. Optional flame-retardant (FR), anti-static, and water-repellent finishes.',
    image: industrialFabricsImg,
    fallbackImage: industrialFabricsImg,
    specs: {
      composition: '100% Cotton / 65-35 Poly-Cotton / FR Blend',
      weave: '3/1 Left-Hand Heavy Twill',
      gsm: '240 – 350 GSM',
      finish: 'Enzyme wash, Flame-Retardant, Oil/Water Repellent',
      sizes: 'Custom Workwear Uniforms & Fabric Rolls',
      colors: 'Navy, Hi-Vis Orange, Khaki, Royal Blue',
      moq: '1,500 Meters',
      leadTime: '35–45 Days'
    },
    features: ['Tear strength exceeds 25N (ISO 13937-2)', 'EN ISO 11612 Compliant Finish', 'Reinforced bar-tacking', 'Zero shrinkage after high-temp wash'],
    badge: 'EN ISO Compliant'
  },
  {
    id: 'prod-04',
    category: 'hospitality',
    categoryName: 'Hospitality & Dining',
    title: '550 - 700 GSM Combed Ring-Spun Hotel Towels',
    tagline: 'Plush, ultra-absorbent terry towelling with reinforced double-stitched borders',
    description: 'Designed specifically for high-turnover industrial laundering in luxury hotel chains and resorts. Woven from 100% 2-ply ring-spun combed loops for maximum absorbency.',
    image: terryTowelsImg,
    fallbackImage: terryTowelsImg,
    specs: {
      composition: '100% Long-Staple Combed Cotton',
      gsm: '550 – 700 GSM Heavyweight Terry',
      finish: 'Chlorine-Resistant Optical Whiteness, Soft Touch',
      sizes: 'Face, Hand, Bath Towel, Bath Sheet, Pool Towel',
      colors: 'Optical White, Sand, Sage, Navy, Charcoal',
      moq: '1,000 Pcs / Size',
      leadTime: '30 Days'
    },
    features: ['Double-needle lockstitched hems', 'Chlorine & peroxide resistant vat dyeing', 'Fast water absorption (< 3 seconds)', 'Zero loop pulling or fraying'],
    badge: '5-Star Resort Grade'
  },
  {
    id: 'prod-05',
    category: 'medical',
    categoryName: 'Institutional & Medical',
    title: 'Autoclavable Hospital Scrubs & Barrier Drapes',
    tagline: 'Antimicrobial, bleach-safe fabrics for hospital systems and surgical centers',
    description: 'Medical grade poplin and micro-twill fabrics treated with antimicrobial finishes. Highly resistant to repeated high-temperature industrial autoclave wash cycles.',
    image: medicalFabricsImg,
    fallbackImage: medicalFabricsImg,
    specs: {
      composition: '65% Poly / 35% Cotton Poplin / CVC Blend',
      gsm: '145 – 190 GSM Poplin',
      finish: 'Antimicrobial, Chlorine Bleach Resistant, Fluid Barrier',
      sizes: 'XS – 4XL Unisex Scrubs & Surgical Drapes',
      colors: 'Ceil Blue, Hunter Green, Medical Navy, White',
      moq: '1,000 Sets',
      leadTime: '25–35 Days'
    },
    features: ['Withstands 75°C+ high-temperature sterilization', 'Fluid-repellent fluorocarbon barrier finish', 'Lint-free spun yarns for surgical cleanrooms', 'Silvadur antimicrobial protection'],
    badge: 'Medical Grade'
  },
  {
    id: 'prod-06',
    category: 'oem',
    categoryName: 'OEM & Yarn Weaving',
    title: 'Carded Yarn Cones, Canvas & Custom Weaving',
    tagline: 'Bespoke Warp/Weft Constructions from Greige to Finish',
    description: 'Direct procurement of ring-spun & carded yarn cones. Shuttleless air-jet weaving of canvas, heavy duck, oxford, and greige master rolls up to 340cm width.',
    image: cardedYarnCanvasImg,
    fallbackImage: cardedYarnCanvasImg,
    specs: {
      yarnCounts: 'Ne 10/1 to Ne 100/1 Carded & Combed',
      widths: '60" to 134" Extra-Wide Weaving',
      gsm: '120 – 480 GSM Heavy Canvas & Duck',
      finish: 'Greige master rolls, Bleached, Vat dyed',
      moq: '5,000 Linear Meters',
      leadTime: '30–45 Days'
    },
    features: ['Spectrophotometric Delta E < 0.8 lab dip match', '180+ Air-jet and dobby looms', 'AQL 1.5 export quality standard', 'Export seaworthy roll packing in polyethylene'],
    badge: 'OEM Solution'
  }
];
