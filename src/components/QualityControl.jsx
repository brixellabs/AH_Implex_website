/**
 * ==============================================================================
 * A&H IMPEX - QUALITY CONTROL & LABORATORY PIPELINE SECTION (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faCircleCheck,
  faFlask,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import SafeImage from './SafeImage';
import { QUALITY_STAGES } from '../data/quality';

export default function QualityControl({ onOpenQuoteModal }) {
  const [activeStageId, setActiveStageId] = useState(QUALITY_STAGES[0].id);
  const activeStage = QUALITY_STAGES.find((s) => s.id === activeStageId) || QUALITY_STAGES[0];

  return (
    <section id="quality" className="py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wider uppercase mb-3 font-mono">
              <FontAwesomeIcon icon={faShieldHalved} className="text-xs text-brand-600" aria-hidden="true" />
              <span>International Quality Assurance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight font-serif">
              Six-Stage <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-blue-600">Quality Control</span> Pipeline
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 font-normal">
              We eliminate export defects before packaging. Every meter is systematically audited against ASTM, ISO, and AQL 1.5 international acceptance benchmarks.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-100 border border-brand-200 text-brand-700 flex items-center justify-center">
                <FontAwesomeIcon icon={faFlask} className="text-base" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Testing Standard</p>
                <p className="text-sm font-bold text-slate-900 font-mono">ANSI/ASQ Z1.4 Level II</p>
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
                    ? 'bg-brand-700 border-brand-600 text-white shadow-lg shadow-brand-700/20 ring-2 ring-brand-500/30'
                    : 'bg-slate-50 border-slate-200 hover:border-brand-500 hover:bg-white text-slate-700 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-white text-brand-800' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {stage.step}
                  </span>
                  <span className={`text-[10px] uppercase font-medium truncate ml-1 font-mono ${
                    isActive ? 'text-brand-200' : 'text-slate-500'
                  }`}>
                    {stage.tag}
                  </span>
                </div>
                <span className={`text-xs font-bold line-clamp-2 ${
                  isActive ? 'text-white' : 'text-slate-800'
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
            className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Stage Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider font-mono">
                    Stage {activeStage.step} • {activeStage.tag}
                  </span>
                  <span className="text-xs text-brand-700 font-bold font-mono">
                    {activeStage.tolerance}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4 font-serif">
                  {activeStage.name}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {activeStage.description}
                </p>

                {/* Audit Checkpoints */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold font-mono">
                    Primary Quality Verification Checkpoints:
                  </h4>
                  {activeStage.checkpoints.map((cp, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <FontAwesomeIcon icon={faCheck} className="text-xs" aria-hidden="true" />
                      </div>
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onOpenQuoteModal({ subject: `Inquiry: ${activeStage.name} Testing Specs` })}
                    className="px-6 py-2.5 rounded-lg bg-brand-700 hover:bg-brand-600 text-white text-xs font-bold shadow-md transition-all"
                  >
                    Request Lab Testing Protocol
                  </button>
                  <span className="text-xs text-slate-500">
                    Third-party lab certificates available (SGS / Intertek on request)
                  </span>
                </div>
              </div>

              {/* Right Column: Inspection Photograph */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-300 group">
                <SafeImage
                  src={activeStage.image}
                  alt={activeStage.name}
                  className="w-full h-80 sm:h-96"
                  zoomOnHover={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-brand-950/90 backdrop-blur-md p-3.5 rounded-xl border border-brand-700/60 flex items-center justify-between shadow">
                  <div>
                    <p className="text-[11px] text-slate-300 uppercase tracking-wider font-mono">Pass Standard</p>
                    <p className="text-xs font-bold text-white font-mono">{activeStage.tolerance}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-lg" aria-hidden="true" />
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
