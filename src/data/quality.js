// A&H IMPEX - 6-Stage Quality Control Pipeline Data

export const QUALITY_STAGES = [
  {
    id: 'stage-1',
    step: '01',
    name: 'Raw Material & Yarn Inspection',
    tag: 'Incoming QC',
    description: 'Every consignment of raw cotton and yarn is checked for fiber length, Micronaire value, tensile strength, and twist per inch. Lot-wise verification guarantees uniform lot dyeing later.',
    checkpoints: [
      'Fiber length & micronaire testing',
      'Yarn count verification (Ne)',
      'Tensile & elongation at break'
    ],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tolerance: 'Tolerance ± 1.5%'
  },
  {
    id: 'stage-2',
    step: '02',
    name: 'Grey Fabric Inspection (4-Point System)',
    tag: 'Weaving QC',
    description: '100% of woven greige cloth passes through high-intensity inspection tables. Defects are tagged using the international ASTM D5430 4-Point System to avoid defective processing.',
    checkpoints: [
      'Weft faults, missing ends, broken picks',
      'EPI / PPI density verification',
      'Selvage consistency & usable width'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    tolerance: '< 18 penalty points / 100 sq yds'
  },
  {
    id: 'stage-3',
    step: '03',
    name: 'Color Fastness & Shrinkage Testing',
    tag: 'Laboratory QC',
    description: 'In-house physical and wet laboratory conducting accelerated commercial wash trials, rub fastness (Crockmeter), spectrophotometric Delta-E color evaluation, and warp/weft shrinkage tests.',
    checkpoints: [
      'Delta-E < 0.8 color variance',
      'Wash fastness (ISO 105-C06) Grade 4–5',
      'Dimensional stability (shrinkage < 2.5%)'
    ],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    tolerance: 'Zero hazardous heavy metals'
  },
  {
    id: 'stage-4',
    step: '04',
    name: 'In-Line Stitching & Seam Inspection',
    tag: 'Production QC',
    description: 'Stationed quality auditors check stitch tension, SPI (stitches per inch), hemming accuracy, and seam elasticity during active assembly to prevent batch defects before completion.',
    checkpoints: [
      '10–12 SPI uniform lockstitch check',
      'Tension balance & thread trimming',
      'Measurement specs against tech packs'
    ],
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    tolerance: 'Zero skipped or broken stitches'
  },
  {
    id: 'stage-5',
    step: '05',
    name: 'Final AQL Inspection',
    tag: 'International Audit',
    description: 'Independent QA managers randomly pull packaged cartons in accordance with ANSI/ASQ Z1.4 (ISO 2859-1) Level II sampling, validating packaging, labeling, barcode accuracy, and aesthetics.',
    checkpoints: [
      'AQL 1.5 Major / AQL 4.0 Minor',
      'Carton drop test & barcode scan',
      'Complete retail folding presentation'
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    tolerance: '100% Pass Required for Release'
  },
  {
    id: 'stage-6',
    step: '06',
    name: 'Metal Detection & Container Loading Check',
    tag: 'Pre-Shipment QC',
    description: 'All consumer textile units pass through 9-point calibrated metal detectors to detect broken needle tips. Containers are inspected for clean dry floors, odor-free walls, and desiccant placement.',
    checkpoints: [
      'Ferrous & non-ferrous needle detection',
      'Container floor moisture < 12%',
      'Seaworthy packaging & tamper-evident seals'
    ],
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    tolerance: '0.8mm Ferrous calibration sensitivity'
  }
];
