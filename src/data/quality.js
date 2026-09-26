// A&H IMPEX - 6-Stage Quality Control Pipeline Data
// Incorporating user-supplied quality laboratory and inspection assets

import rawMaterialImg from '../assets/raw material and yarn inspection.jpeg';
import greyFabricImg from '../assets/grey fabric inspection.jfif';
import labTestingImg from '../assets/dyeing and finishing.jfif';
import inlineStitchingImg from '../assets/In-Line Stitching & Seam Inspection.jfif';
import finalAQLImg from '../assets/Final AQL Inspection.jfif';
import metalDetectionImg from '../assets/Metal Detection & Container Loading Check.jfif';

export const QUALITY_STAGES = [
  {
    id: 'stage-1',
    step: '01',
    name: 'Raw Material & Yarn Inspection',
    tag: 'Incoming QC',
    description: 'Every consignment of raw cotton & yarn is checked for fiber length, Micronaire value, tensile strength, & twist per inch. Lot-wise verification guarantees uniform lot dyeing later.',
    checkpoints: [
      'Fiber length & micronaire testing',
      'Yarn count verification (Ne)',
      'Tensile & elongation at break'
    ],
    image: rawMaterialImg,
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
    image: greyFabricImg,
    tolerance: '< 18 penalty points / 100 sq yds'
  },
  {
    id: 'stage-3',
    step: '03',
    name: 'Color Fastness & Shrinkage Testing',
    tag: 'Laboratory QC',
    description: 'In-house physical & wet laboratory conducting accelerated commercial wash trials, rub fastness (Crockmeter), spectrophotometric Delta-E color evaluation, & warp/weft shrinkage tests.',
    checkpoints: [
      'Delta-E < 0.8 color variance',
      'Wash fastness (ISO 105-C06) Grade 4–5',
      'Dimensional stability (shrinkage < 2.5%)'
    ],
    image: labTestingImg,
    tolerance: 'Zero hazardous heavy metals'
  },
  {
    id: 'stage-4',
    step: '04',
    name: 'In-Line Stitching & Seam Inspection',
    tag: 'Production QC',
    description: 'Stationed quality auditors check stitch tension, SPI (stitches per inch), hemming accuracy, & seam elasticity during active assembly to prevent batch defects before completion.',
    checkpoints: [
      '10–12 SPI uniform lockstitch check',
      'Tension balance & thread trimming',
      'Measurement specs against tech packs'
    ],
    image: inlineStitchingImg,
    tolerance: 'Zero skipped or broken stitches'
  },
  {
    id: 'stage-5',
    step: '05',
    name: 'Final AQL Inspection',
    tag: 'International Audit',
    description: 'Independent QA managers randomly pull packaged cartons in accordance with ANSI/ASQ Z1.4 (ISO 2859-1) Level II sampling, validating packaging, labeling, barcode accuracy, & aesthetics.',
    checkpoints: [
      'AQL 1.5 Major / AQL 4.0 Minor',
      'Carton drop test & barcode scan',
      'Complete retail folding presentation'
    ],
    image: finalAQLImg,
    tolerance: '100% Pass Required for Release'
  },
  {
    id: 'stage-6',
    step: '06',
    name: 'Metal Detection & Container Loading Check',
    tag: 'Pre-Shipment QC',
    description: 'All consumer textile units pass through 9-point calibrated metal detectors to detect broken needle tips. Containers are inspected for clean dry floors, odor-free walls, & desiccant placement.',
    checkpoints: [
      'Ferrous & non-ferrous needle detection',
      'Container floor moisture < 12%',
      'Seaworthy packaging & tamper-evident seals'
    ],
    image: metalDetectionImg,
    tolerance: '0.8mm Ferrous calibration sensitivity'
  }
];
