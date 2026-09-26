// A&H IMPEX - Manufacturing Process Data
// Interactive 5-step timeline data with user-provided mill assets and technical specifications

import yarnWarpingImg from '../assets/yarn selection and weaving.jfif';
import airJetWeavingImg from '../assets/air jet weaving.jpg';
import dyeingFinishingImg from '../assets/dyeing and finishing.jfif';
import stitchingDetailingImg from '../assets/stitching and detailing.jfif';
import qualityInspectionImg from '../assets/quality inspection.jfif';

export const MANUFACTURING_STEPS = [
  {
    step: '01',
    title: 'Yarn Selection and Warping',
    tagline: 'Precision Fiber Sourcing and High-Tension Creeling',
    description: 'We procure ring-spun, combed, and compact yarns from ISO-accredited spinning mills. Yarns undergo testing for Uster CV%, count uniformity, and tensile strength before high-speed computerized direct warping.',
    image: yarnWarpingImg,
    fallbackImage: yarnWarpingImg,
    specs: [
      { label: 'Yarn Counts', value: '10s Ne to 100s Ne Combed' },
      { label: 'Warping Speed', value: 'Up to 1,000 m/min' },
      { label: 'Quality Audit', value: 'Uster Evenness & Twist per Inch (TPI)' }
    ],
    highlights: ['Zero yarn mixing controls', 'Automated beam tensioning', 'Micro-defect stop motion sensors']
  },
  {
    step: '02',
    title: 'Air-Jet Weaving',
    tagline: 'High-Speed Shuttleless Weaving Looms',
    description: 'Our weaving facility runs modern high-speed air-jet looms capable of producing tight, flawless plain weaves, sateens, percales, twills, and dobby textures with uniform selvages up to 340cm width.',
    image: airJetWeavingImg,
    fallbackImage: airJetWeavingImg,
    specs: [
      { label: 'Loom Type', value: 'European & Japanese Air-Jet Looms' },
      { label: 'Max Width', value: 'Up to 340 cm (134 inches)' },
      { label: 'Weave Capabilities', value: 'Percale, Sateen, Twill, Dobby, Oxford' }
    ],
    highlights: ['Electronic let-off and take-up', 'Optical weft insertion detectors', 'Low air-consumption eco-valves']
  },
  {
    step: '03',
    title: 'Dyeing and Finishing',
    tagline: 'Continuous Bleaching and Eco-Friendly Reactive Dyeing',
    description: 'Fabrics are processed using continuous pad-steam and thermofix dyeing lines. We utilize low-salt, OEKO-TEX Standard 100 compliant reactive dyestuffs followed by mercerizing, stenter heat-setting, and calendaring.',
    image: dyeingFinishingImg,
    fallbackImage: dyeingFinishingImg,
    specs: [
      { label: 'Dye Chemistry', value: 'Low-Impact Reactive & Vat Dyes' },
      { label: 'Color Fastness', value: 'Grade 4–5 to Washing & Rubbing' },
      { label: 'Finishes', value: 'Silicone Softener, Bio-Polish, Anti-Shrink' }
    ],
    highlights: ['Spectrophotometer computer color matching', 'Continuous washing to ensure zero residue', 'Controlled residual shrinkage (< 2%)']
  },
  {
    step: '04',
    title: 'Stitching and Detailing',
    tagline: 'Automated Hemming and Precision Unit Assembly',
    description: 'Equipped with computerized lockstitch, overlock, and automatic multi-needle flatbed machines. Our skilled operators assemble fitted sheets, duvet covers, pillowcases, and garments with reinforced stress seams.',
    image: stitchingDetailingImg,
    fallbackImage: stitchingDetailingImg,
    specs: [
      { label: 'Stitch Density', value: '10–12 Stitches Per Inch (SPI)' },
      { label: 'Seam Types', value: 'French Seams, 5-Thread Overlock, Bar-Tack' },
      { label: 'Needle Type', value: 'Ballpoint & Microtex German Needles' }
    ],
    highlights: ['Automated elastic inserting for fitted sheets', 'Computerized bar-tacking on stress points', 'Laser cut precision paneling']
  },
  {
    step: '05',
    title: 'Quality Inspection and Dispatch',
    tagline: '100% Light-Table Review, Metal Detection and Packing',
    description: 'Every finished unit passes through illuminated light tables for optical grading, needle detection, and barcode verification before being sealed in export-grade cartons with moisture barrier lining.',
    image: qualityInspectionImg,
    fallbackImage: qualityInspectionImg,
    specs: [
      { label: 'AQL Standard', value: 'MIL-STD-105E / AQL 1.5 & 2.5' },
      { label: 'Safety', value: 'Ferrous & Non-Ferrous Needle Detector' },
      { label: 'Packaging', value: 'Drop-Test Certified Heavy Corrugated Cartons' }
    ],
    highlights: ['Comprehensive pre-shipment audit dossier', 'Container palletization with humidity desiccants', 'Full bill of lading and export documentation']
  }
];
