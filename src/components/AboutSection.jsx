/**
 * ==============================================================================
 * A&H IMPEX - ABOUT & INDUSTRIAL STORYTELLING SECTION
 * ==============================================================================
 * Purpose: Narrative component bridging corporate heritage with manufacturing
 *          capabilities and vertical export strengths.
 * 
 * Features:
 * - Split layout: Left industrial photo with floating badge, Right corporate narrative.
 * - Sub-section: "Core Manufacturing Capabilities" 4-card grid with key stats.
 * - Scroll reveal animations using Framer Motion.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Factory, Sparkles, Building2, PackageCheck } from 'lucide-react';
import SafeImage from './SafeImage';
import { COMPANY } from '../data/company';

export default function AboutSection({ onOpenQuoteModal }) {
  const capabilities = [
    {
      icon: Factory,
      title: 'High-Speed Air-Jet Weaving',
      desc: 'Uniform density sateens, percales, twills, and dobby weaves up to 340cm width on Japanese & European looms.',
      stat: '180+ Looms'
    },
    {
      icon: Sparkles,
      title: 'Eco-Friendly Reactive Dyeing',
      desc: 'Continuous pad-steam dyeing with spectrophotometer computer color matching (Delta-E < 0.8).',
      stat: 'Grade 4-5 Fastness'
    },
    {
      icon: Building2,
      title: 'Precision Cut & Stitching',
      desc: 'Automated flatbed lockstitch, multi-needle elastic hemming, and bar-tack reinforcement for bedding & apparel.',
      stat: '10-12 SPI'
    },
    {
      icon: PackageCheck,
      title: 'Turnkey Retail Packaging',
      desc: 'Store-ready packaging: self-fabric zippered bags, FSC-certified sleeves, barcodes, and export carton strapping.',
      stat: '100% Export Grade'
    }
  ];

  return (
    <section id="about" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Ambient background weave pattern */}
      <div className="absolute inset-0 bg-fabric-weave opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Section: Story & Factory Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer decorative frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <SafeImage
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                fallbackSrc="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="A&H IMPEX Modern Air-Jet Textile Weaving Looms"
                className="w-full h-[480px] sm:h-[540px]"
                zoomOnHover={true}
              />
              
              {/* Subtle dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />

              {/* Floating Badge at Bottom */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl glass-card border border-white/15 backdrop-blur-md">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                    <Factory className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide font-display">Vertical Manufacturing Facility</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Air-jet weaving, wet processing &amp; finished unit assembly</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Experience Stamp Badge */}
            <div className="absolute -top-5 -left-5 bg-gradient-to-br from-gold-500 to-gold-600 text-navy-950 font-extrabold px-4 py-3 rounded-xl shadow-xl border border-white/20 hidden sm:flex flex-col items-center">
              <span className="text-2xl leading-none font-display">15+</span>
              <span className="text-[10px] uppercase tracking-wider mt-1 text-navy-900 font-bold">Years Heritage</span>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 w-fit">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>About A&amp;H IMPEX</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6 font-display">
              {COMPANY.about.title}
            </h2>

            <p className="text-base text-gold-400/90 font-medium mb-4">
              {COMPANY.about.subtitle}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4 font-light">
              {COMPANY.about.paragraph1}
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
              {COMPANY.about.paragraph2}
            </p>

            {/* Strategic Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'Direct-to-port ocean container exports',
                'Comprehensive OEM & private labeling',
                'OEKO-TEX & ISO 9001:2015 audited mill',
                'Strict ANSI/ASQ Z1.4 AQL 1.5 inspection'
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" aria-hidden="true" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-sm shadow-md hover:shadow-gold-500/20 transition-all hover:scale-[1.02]"
              >
                Request Mill Capabilities Profile
              </button>
              <a
                href="#manufacturing"
                className="px-6 py-3 rounded-lg bg-navy-900 border border-white/15 text-slate-200 hover:text-white hover:border-gold-500/40 text-sm font-semibold transition-all"
              >
                Inspect Manufacturing Timeline
              </a>
            </div>

          </motion.div>

        </div>

        {/* Underneath: Our Capabilities Grid */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              Core Manufacturing Capabilities
            </h3>
            <p className="text-sm text-slate-400 mt-2 font-light">
              Engineered infrastructure supporting large-scale contract production and boutique private label runs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card glass-card-hover rounded-xl p-6 border border-white/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-navy-800 border border-gold-500/25 flex items-center justify-center text-gold-400">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-500/20 font-mono">
                        {item.stat}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 tracking-wide font-display">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
