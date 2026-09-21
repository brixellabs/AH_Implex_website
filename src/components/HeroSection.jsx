/**
 * ==============================================================================
 * A&H IMPEX - HERO SECTION (HIGH-IMPACT TEXTILE VISUAL)
 * ==============================================================================
 * Purpose: First visual touchpoint creating an immediate luxury international
 *          textile manufacturer impression.
 * 
 * Design Features:
 * - Full-screen background showing luxury bedding in a modern architectural room
 *   (directly inspired by the reference textile website).
 * - Smooth Ken Burns scale animation (1.00 -> 1.07 over 22s alternate).
 * - Multi-stop dark navy gradient overlay ensuring optimal contrast for typography.
 * - Eyebrow badge, primary heading, supporting technical copy, dual CTAs.
 * - 4 trust pillars underneath with green verified checkmarks.
 * - Floating glassmorphism manufacturing card on the right displaying real metrics.
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  FileSpreadsheet,
  Globe2
} from 'lucide-react';
import { COMPANY } from '../data/company';

export default function HeroSection({ onOpenQuoteModal }) {
  const trustPillars = [
    { name: 'Quality Focused', desc: 'AQL 1.5 Standard' },
    { name: 'Export Ready', desc: '25+ Global Markets' },
    { name: 'OEM / Private Label', desc: 'Custom Weaving & Stitching' },
    { name: 'International Standards', desc: 'ISO 9001 & OEKO-TEX 100' },
  ];

  return (
    <section className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background Image with Ken Burns animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center animate-kenburns transition-transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=2200&q=85')`,
          }}
        />

        {/* Multi-Stop Dark Navy Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/98 via-navy-950/90 to-navy-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70" />
        <div className="absolute inset-0 bg-fabric-weave opacity-25" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Storytelling & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-850/90 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
              <span>{COMPANY.eyebrow}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 font-display">
              Premium Textiles.{' '}
              <span className="gold-gradient-text">Precision Manufacturing.</span>{' '}
              Global Reach.
            </h1>

            {/* Supporting Body Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-light">
              {COMPANY.heroDescription}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto">
              <a
                href="#products"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm tracking-wide shadow-xl shadow-gold-500/10 hover:shadow-gold-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-navy-900/80 hover:bg-navy-800/90 border border-white/15 hover:border-gold-500/50 text-white font-semibold text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-gold-400" aria-hidden="true" />
                <span>Request a Quote (RFQ)</span>
              </button>
            </div>

            {/* 4 Trust Indicators Underneath */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 w-full">
              {trustPillars.map((pillar, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>{pillar.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{pillar.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Floating Glassmorphism Spec & Trust Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient gold glow behind card */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-gold-500/20 via-navy-700/30 to-emerald-500/10 blur-xl opacity-60" />

            <div className="relative glass-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/15">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Layers className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-wide">A&amp;H IMPEX MILLS</h2>
                    <p className="text-[11px] text-slate-400">Vertical Manufacturing Unit</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active Export Line
                </span>
              </div>

              {/* Manufacturing Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-navy-900/80 rounded-xl p-3.5 border border-white/5">
                  <span className="text-2xl font-extrabold text-white font-display">18M+</span>
                  <p className="text-xs text-gold-400 font-medium mt-0.5">Meters Annual Output</p>
                  <p className="text-[11px] text-slate-400 mt-1">Air-jet weaving capacity</p>
                </div>
                <div className="bg-navy-900/80 rounded-xl p-3.5 border border-white/5">
                  <span className="text-2xl font-extrabold text-white font-display">180+</span>
                  <p className="text-xs text-gold-400 font-medium mt-0.5">Modern Air-Jet Looms</p>
                  <p className="text-[11px] text-slate-400 mt-1">Up to 340cm width</p>
                </div>
                <div className="bg-navy-900/80 rounded-xl p-3.5 border border-white/5">
                  <span className="text-2xl font-extrabold text-white font-display">25+</span>
                  <p className="text-xs text-gold-400 font-medium mt-0.5">Export Destinations</p>
                  <p className="text-[11px] text-slate-400 mt-1">EU, USA, UK &amp; GCC</p>
                </div>
                <div className="bg-navy-900/80 rounded-xl p-3.5 border border-white/5">
                  <span className="text-2xl font-extrabold text-white font-display">99.6%</span>
                  <p className="text-xs text-gold-400 font-medium mt-0.5">AQL Inspection Pass</p>
                  <p className="text-[11px] text-slate-400 mt-1">ANSI/ASQ Z1.4 standard</p>
                </div>
              </div>

              {/* Verified Certifications Bar */}
              <div className="bg-navy-950/60 rounded-xl p-3.5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span className="text-xs text-slate-300 font-medium">Compliance Standards:</span>
                </div>
                <span className="text-[11px] font-semibold text-gold-300">
                  ISO 9001 • OEKO-TEX • BSCI
                </span>
              </div>

              {/* Instant RFQ Fast Track Action */}
              <div className="mt-5">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Globe2 className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                  Inquire For Custom Yarn / Fabric Specs
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom curve separator */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
    </section>
  );
}
