/**
 * ==============================================================================
 * A&H IMPEX - COMPANY PILLARS & STRATEGIC HIGHLIGHTS
 * ==============================================================================
 * Purpose: Tri-column value row directly bridging the hero visual with company
 *          principles (inspired by the reference textile manufacturer design).
 * 
 * Key Pillars:
 * 1. Vision & Mission: Long-term strategic excellence & eco-conscious weaving.
 * 2. Quality & Integrity: In-line testing, tensile checks, zero defect mindset.
 * 3. Social & HR Policy: amfori BSCI, fair wages, employee safety & ethics.
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, Users2, ArrowUpRight } from 'lucide-react';

export const PILLARS = [
  {
    icon: Target,
    title: 'Vision & Mission',
    subtitle: 'Strategic Global Excellence',
    description: 'To be the most reliable international partner for high-precision woven textiles and home furnishings, championing vertical innovation and sustainable manufacturing practices.',
    linkText: 'Explore Strategy',
    href: '#about'
  },
  {
    icon: Award,
    title: 'Quality & Integrity',
    subtitle: 'Zero Defect Philosophy',
    description: 'From yarn tension monitoring to 100% light-table review and ANSI/ASQ Z1.4 sampling, every meter is guaranteed to meet stringent international tensile and colorfast standards.',
    linkText: 'View QC Pipeline',
    href: '#quality'
  },
  {
    icon: Users2,
    title: 'Social & HR Policy',
    subtitle: 'Ethical Workplace Culture',
    description: 'Operating in strict accordance with amfori BSCI and Sedex SMETA principles—ensuring fair living wages, workplace safety, female empowerment, and zero child labor.',
    linkText: 'Read Standards',
    href: '#certifications'
  }
];

export default function CompanyPillars() {
  return (
    <section aria-label="Core Strategic Pillars" className="relative -mt-10 lg:-mt-14 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.a
              key={idx}
              href={pillar.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative glass-card glass-card-hover rounded-2xl p-7 shadow-xl border border-white/10 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Subtle gold top border line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent group-hover:via-gold-400 transition-all" />

              <div>
                {/* Icon Container with metallic gold finish */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5 group-hover:scale-105 group-hover:border-gold-400/60 transition-all shadow-md">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-gold-300 transition-colors font-display">
                    {pillar.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </div>
                
                <p className="text-xs uppercase tracking-wider text-gold-500/90 font-semibold mb-3 font-mono">
                  {pillar.subtitle}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1 text-xs font-semibold text-gold-400 group-hover:text-gold-300">
                <span>{pillar.linkText}</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
