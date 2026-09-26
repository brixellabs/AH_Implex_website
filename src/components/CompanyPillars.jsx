/**
 * ==============================================================================
 * A&H IMPEX - COMPANY PILLARS & STRATEGIC HIGHLIGHTS (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullseye,
  faAward,
  faUsers,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';

export const PILLARS = [
  {
    icon: faBullseye,
    title: 'Vision & Mission',
    subtitle: 'Strategic Global Excellence',
    description: 'To be the most reliable international partner for high-precision woven textiles and home furnishings, championing vertical innovation and sustainable manufacturing practices.',
    linkText: 'Explore Strategy',
    href: '#about'
  },
  {
    icon: faAward,
    title: 'Quality & Integrity',
    subtitle: 'Zero Defect Philosophy',
    description: 'From yarn tension monitoring to 100% light-table review and ANSI/ASQ Z1.4 sampling, every meter is guaranteed to meet stringent international tensile and colorfast standards.',
    linkText: 'View QC Pipeline',
    href: '#quality'
  },
  {
    icon: faUsers,
    title: 'Social & HR Policy',
    subtitle: 'Ethical Workplace Culture',
    description: 'Operating in strict accordance with amfori BSCI and Sedex SMETA principles—ensuring fair living wages, workplace safety, female empowerment, and zero child labor.',
    linkText: 'Read Standards',
    href: '#certifications'
  }
];

export default function CompanyPillars() {
  return (
    <section aria-label="Core Strategic Pillars" className="relative mt-6 sm:-mt-6 lg:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {PILLARS.map((pillar, idx) => (
          <motion.a
            key={idx}
            href={pillar.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative glass-card glass-card-hover rounded-2xl p-5 sm:p-7 shadow-xl border border-brand-700/60 flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Subtle blue top border line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent group-hover:via-brand-300 transition-all" />

            <div>
              {/* Icon Container with metallic brand navy finish */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brand-800 to-brand-900 border border-brand-500/30 flex items-center justify-center text-brand-300 mb-4 sm:mb-5 group-hover:scale-105 group-hover:border-brand-300/60 transition-all shadow-md">
                <FontAwesomeIcon icon={pillar.icon} className="text-base sm:text-lg" aria-hidden="true" />
              </div>

              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-brand-200 transition-colors font-serif">
                  {pillar.title}
                </h3>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs text-slate-400 group-hover:text-brand-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </div>
              
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-brand-300 font-semibold mb-2 sm:mb-3 font-mono">
                {pillar.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>

            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-brand-700/40 flex items-center gap-1 text-xs font-semibold text-brand-300 group-hover:text-white">
              <span>{pillar.linkText}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

