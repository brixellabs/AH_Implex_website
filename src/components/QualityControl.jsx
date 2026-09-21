/**
 * ==============================================================================
 * A&H IMPEX - QUALITY CONTROL & LABORATORY PIPELINE SECTION
 * ==============================================================================
 * Purpose: Dedicated section showcasing the 6-stage international quality assurance
 *          protocol governing every meter of exported fabric and apparel.
 * 
 * Quality Stages:
 * 01. Raw Material & Yarn Inspection - Uster evenness & count testing.
 * 02. Grey Fabric Inspection - ASTM D5430 4-Point system for weaving flaws.
 * 03. Color Fastness & Shrinkage - In-house lab tests (ISO 105-C06, Delta-E < 0.8).
 * 04. In-Line Stitching - Automated tension balance & SPI verification.
 * 05. Final AQL Inspection - ANSI/ASQ Z1.4 (ISO 2859-1) Level II standard.
 * 06. Metal Detection & Container Check - 9-point calibrated needle detection.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, FlaskConical, Check } from 'lucide-react';
import SafeImage from './SafeImage';
import { QUALITY_STAGES } from '../data/quality';

export default function QualityControl({ onOpenQuoteModal }) {
  const [activeStageId, setActiveStageId] = useState(QUALITY_STAGES[0].id);
  const activeStage = QUALITY_STAGES.find((s) => s.id === activeStageId) || QUALITY_STAGES[0];

  return (
    <section id="quality" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>International Quality Assurance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Six-Stage <span className="gold-gradient-text">Quality Control</span> Pipeline
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 font-light">
              We eliminate export defects before packaging. Every meter is systematically audited against ASTM, ISO, and AQL 1.5 international acceptance benchmarks.
            </p>
          </div>

          <div className="bg-navy-900/80 p-4 rounded-xl border border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <FlaskConical className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Testing Standard</p>
                <p className="text-sm font-bold text-white font-mono">ANSI/ASQ Z1.4 Level II</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Stage Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {QUALITY_STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-navy-800 border-gold-400/80 shadow-lg shadow-gold-500/10 ring-2 ring-gold-500/20'
                    : 'bg-navy-900/70 border-white/10 hover:border-white/20 hover:bg-navy-850'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-gold-500 text-navy-950' : 'bg-white/10 text-slate-300'
                  }`}>
                    {stage.step}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium truncate ml-1 font-mono">
                    {stage.tag}
                  </span>
                </div>
                <span className={`text-xs font-bold line-clamp-2 ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}>
                  {stage.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Stage Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                    Stage {activeStage.step} • {activeStage.tag}
                  </span>
                  <span className="text-xs text-gold-400 font-semibold font-mono">
                    {activeStage.tolerance}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 font-display">
                  {activeStage.name}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {activeStage.description}
                </p>

                {/* Audit Checkpoints */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold font-mono">
                    Primary Quality Verification Checkpoints:
                  </h4>
                  {activeStage.checkpoints.map((cp, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <span className="font-light">{cp}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onOpenQuoteModal({ subject: `Inquiry: ${activeStage.name} Testing Specs` })}
                    className="px-6 py-2.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white border border-white/15 text-xs font-semibold transition-all"
                  >
                    Request Lab Testing Protocol
                  </button>
                  <span className="text-xs text-slate-400 font-light">
                    Third-party lab certificates available (SGS / Intertek on request)
                  </span>
                </div>
              </div>

              {/* Right Column: Inspection Photograph */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
                <SafeImage
                  src={activeStage.image}
                  alt={activeStage.name}
                  className="w-full h-80 sm:h-96"
                  zoomOnHover={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-navy-950/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Pass Standard</p>
                    <p className="text-xs font-bold text-white font-mono">{activeStage.tolerance}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
