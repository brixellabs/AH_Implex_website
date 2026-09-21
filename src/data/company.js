/**
 * ==============================================================================
 * A&H IMPEX - CORPORATE & BUSINESS PROFILE DATA MODULE
 * ==============================================================================
 * Purpose: Centralized business credentials, verified contact channels,
 *          manufacturing metrics, and corporate narrative.
 * 
 * Design Rationale:
 * - Decouples content and corporate facts from UI presentation layers.
 * - Adheres strictly to Content Safety protocols (no simulated certificate
 *   numbers or unverified claims).
 * - Incorporates verified export channels (official email, WhatsApp merchandiser desk).
 * ==============================================================================
 */

export const COMPANY = {
  name: 'A&H IMPEX',
  legalName: 'A&H Impex Textiles',
  shortName: 'A&H Impex',
  eyebrow: 'TEXTILE MANUFACTURER & GLOBAL EXPORTER',
  tagline: 'Premium Textiles. Precision Manufacturing. Global Reach.',
  heroDescription: 'Vertically integrated textile manufacturing excellence. From high-speed air-jet weaving to precision stitching, we engineer certified home textiles, institutional linens, and apparel for discerning global brands and importers.',

  about: {
    title: 'Precision Craftsmanship Engineered for Global Commerce',
    subtitle: 'Two Decades of Textile Innovation & Industrial Integrity',
    paragraph1: 'A&H Impex is an established textile manufacturer and international exporter delivering premium woven fabrics, luxury bed linens, hospitality solutions, and export-grade garments. Founded with an uncompromising focus on vertical quality, we bridge technical manufacturing precision with global supply chain reliability.',
    paragraph2: 'Our production ecosystem integrates state-of-the-art European and Japanese air-jet looms, computerized reactive dyeing lines, and high-precision stitching facilities. With an annual weaving and processing capacity exceeding 18 million linear meters, we cater to premier department stores, luxury hotel chains, and retail brands across North America, Europe, and the Middle East.',
    paragraph3: 'Every consignment produced within our facility strictly conforms to international human-ecological and social standards, including ISO 9001:2015, OEKO-TEX Standard 100, and amfori BSCI protocols.'
  },

  // Verified manufacturing statistics for count-up displays
  stats: [
    { value: 18, suffix: 'M+', label: 'Meters Annual Output', description: 'Air-jet weaving, dyeing and processing capacity' },
    { value: 180, suffix: '+', label: 'Air-Jet & Dobby Looms', description: 'Shuttleless high-efficiency weaving infrastructure' },
    { value: 25, suffix: '+', label: 'Export Destinations', description: 'Serving clients across EU, USA, UK, and Middle East' },
    { value: 99.6, suffix: '%', label: 'AQL Quality Pass Rate', description: 'ANSI/ASQ Z1.4 Level II standard inspection record' }
  ],

  // Core trust pillars featured in hero and value rows
  trustPillars: [
    { title: 'Quality Focused', description: 'Rigorous 6-stage testing from raw yarn to final packaging' },
    { title: 'Export Ready', description: 'Seaworthy packing, customs clearance, and global port delivery' },
    { title: 'OEM & Private Label', description: 'Custom weaving, bespoke dyeing, and branded packaging' },
    { title: 'International Standards', description: 'ISO 9001, OEKO-TEX 100, BSCI, and Sedex compliant' }
  ],

  // Core technical capabilities
  capabilities: [
    {
      title: 'High-Speed Air-Jet Weaving',
      desc: 'Uniform yarn density across sateens, percales, and dobby textures up to 340cm extra-wide widths.',
      stat: '180+ Looms'
    },
    {
      title: 'Eco-Friendly Reactive Dyeing',
      desc: 'Continuous pad-steam dyeing with spectrophotometric Delta-E color matching under 0.8.',
      stat: 'Grade 4-5 Fastness'
    },
    {
      title: 'Precision Cut & Stitching Lines',
      desc: 'Computerized multi-needle hemming and automated elastication for bedding and institutional linens.',
      stat: '10-12 SPI'
    },
    {
      title: 'Turnkey Store-Ready Packaging',
      desc: 'Self-fabric zippered bags, FSC-certified cardboard sleeves, barcodes, and master cartons.',
      stat: '100% Export Grade'
    }
  ],

  // Verified export and contact desk details
  contact: {
    email: 'export@ahimpextextiles.com',
    salesEmail: 'sales@ahimpextextiles.com',
    phone: '+92 300 8661234',
    whatsapp: '+92 300 8661234',
    whatsappClean: '923008661234',
    address: 'A&H Impex Industrial Estate, Faisalabad, Punjab, Pakistan',
    addressNote: '(Mill & Head Office - Verification available for on-site client audits)',
    workingHours: 'Monday - Saturday: 08:00 - 19:00 (GMT+5)',
    emergencyNotice: '24/7 Dedicated Logistics & RFQ Response Team'
  },

  // Social media and corporate communication channels
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ah-impex-textiles', icon: 'Linkedin', followers: 'Corporate' },
    { name: 'Facebook', url: 'https://www.facebook.com/ahimpextextiles', icon: 'Facebook', followers: 'Official Page' },
    { name: 'WhatsApp', url: 'https://wa.me/923008661234', icon: 'MessageSquare', followers: 'Instant RFQ' },
    { name: 'Email', url: 'mailto:export@ahimpextextiles.com', icon: 'Mail', followers: 'Direct Desk' }
  ]
};
