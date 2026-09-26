/**
 * ==============================================================================
 * A&H IMPEX - ABOUT & INDUSTRIAL STORYTELLING SECTION (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faIndustry,
  faStar,
  faBuilding,
  faBoxOpen
} from '@fortawesome/free-solid-svg-icons';
import SafeImage from './SafeImage';
import { COMPANY } from '../data/company';
import airJetWeavingImg from '../assets/air jet weaving.jpg';

export default function AboutSection({ onOpenQuoteModal }) {
  const capabilities = [
    {
      icon: faIndustry,
      title: 'High-Speed Air-Jet Weaving',
      desc: 'Uniform density sateens, percales, twills, and dobby weaves up to 340cm width on Japanese & European looms.',
      stat: '180+ Looms'
    },
    {
      icon: faStar,
      title: 'Eco-Friendly Reactive Dyeing',
      desc: 'Continuous pad-steam dyeing with spectrophotometer computer color matching (Delta-E < 0.8).',
      stat: 'Grade 4-5 Fastness'
    },
    {
      icon: faBuilding,
      title: 'Precision Cut & Stitching',
      desc: 'Automated flatbed lockstitch, multi-needle elastic hemming, and bar-tack reinforcement for bedding & apparel.',
      stat: '10-12 SPI'
    },
    {
      icon: faBoxOpen,
      title: 'Turnkey Retail Packaging',
      desc: 'Store-ready packaging: self-fabric zippered bags, FSC-certified sleeves, barcodes, and export carton strapping.',
      stat: '100% Export Grade'
    }
  ];

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Section: Story & Factory Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer decorative frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
              <SafeImage
                src={airJetWeavingImg}
                fallbackSrc={airJetWeavingImg}
                alt="A&H IMPEX Modern Air-Jet Textile Weaving Looms"
                className="w-full h-64 sm:h-80 md:h-[480px] object-cover"
                zoomOnHover={true}
              />
            </div>
          </motion.div>

          {/* Right Column: Company Story & Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <p className="text-xs sm:text-sm font-bold tracking-widest text-brand-600 uppercase font-mono mb-3 sm:mb-4">
              About A&amp;H Impex
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4 font-serif">
              {COMPANY.about.title}
            </h2>

            <p className="text-sm sm:text-base text-brand-700 font-semibold mb-3 sm:mb-4">
              {COMPANY.about.subtitle}
            </p>

            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 font-normal">
              {COMPANY.about.paragraph1}
            </p>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-light">
              {COMPANY.about.paragraph2}
            </p>

            {/* Strategic Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {[
                'Direct-to-port ocean container exports',
                'Comprehensive OEM & private labeling',
                'OEKO-TEX & ISO 9001:2015 audited mill',
                'Strict ANSI/ASQ Z1.4 AQL 1.5 inspection'
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faCheck} className="text-[10px]" aria-hidden="true" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] shimmer-sweep text-center"
              >
                Request Mill Capabilities Profile
              </button>
              <a
                href="#manufacturing"
                className="px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-sm text-center"
              >
                Inspect Manufacturing Timeline
              </a>
            </div>

          </motion.div>

        </div>

        {/* Underneath: Our Capabilities Grid */}
        <div className="mt-14 sm:mt-20 pt-12 sm:pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-brand-700 font-bold text-[11px] sm:text-xs uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Industrial Manufacturing Prowess
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight font-serif mt-3">
              Core Manufacturing Capabilities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              Engineered infrastructure supporting large-scale contract production and boutique private label runs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {capabilities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-brand-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-100 group-hover:bg-brand-600 text-brand-700 group-hover:text-white flex items-center justify-center transition-colors">
                      <FontAwesomeIcon icon={item.icon} className="text-sm sm:text-base" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-white text-brand-700 border border-slate-200 font-mono shadow-sm">
                      {item.stat}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 tracking-wide font-serif group-hover:text-brand-700 transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

