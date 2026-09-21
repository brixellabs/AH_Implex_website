/**
 * ==============================================================================
 * A&H IMPEX - MANUFACTURING PROCESS TIMELINE SECTION
 * ==============================================================================
 * Purpose: Interactive 5-step visual timeline narrating the end-to-end textile
 *          production workflow from raw yarn selection to container dispatch.
 * 
 * Timeline Phases:
 * 01. Yarn Selection & Warping - Computerized creels, Uster CV% evenness audits.
 * 02. Air-Jet Weaving - High-speed shuttleless looms up to 340cm extra-wide widths.
 * 03. Dyeing & Finishing - Continuous pad-steam reactive dyeing (Delta-E < 0.8).
 * 04. Stitching & Detailing - Automated multi-needle lockstitch & elastic assembly.
 * 05. Quality Inspection & Dispatch - 100% light table check & needle detection.
 * 
 * Layout:
 * - Desktop: Horizontal interactive progress line with clickable phase triggers.
 * - Mobile: Scrollable step buttons with stacked responsive card.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Cpu,
  Sparkles,
  Scissors,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import SafeImage from './SafeImage';
import { MANUFACTURING_STEPS } from '../data/manufacturing';

const stepIcons = [Layers, Cpu, Sparkles, Scissors, CheckCircle2];

export default function ManufacturingSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = MANUFACTURING_STEPS[activeStepIndex];

  return (
    <section id="manufacturing" className="py-24 bg-navy-950/90 relative overflow-hidden border-t border-b border-white/5">
      {/* Background fabric lines */}
      <div className="absolute inset-0 bg-fabric-weave opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Vertical Production Setup</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
            Precision Manufacturing <span className="gold-gradient-text">Timeline</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-4 font-light">
            Every fiber travels through five strictly controlled manufacturing phases, ensuring exceptional structural strength, color consistency, and international compliance.
          </p>
        </div>

        {/* Desktop Horizontal Interactive Timeline Steps */}
        <div className="hidden lg:block mb-12">
          <div className="relative">
            {/* Connecting background progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-navy-800 -translate-y-1/2 z-0" />
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-gold-500 to-gold-400 -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: `${(activeStepIndex / (MANUFACTURING_STEPS.length - 1)) * 100}%`
              }}
            />

            {/* Step trigger nodes */}
            <div className="relative z-10 flex justify-between">
              {MANUFACTURING_STEPS.map((step, idx) => {
                const Icon = stepIcons[idx] || Layers;
                const isActive = activeStepIndex === idx;
                const isCompleted = activeStepIndex > idx;

                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStepIndex(idx)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl border ${
                        isActive
                          ? 'bg-gradient-to-br from-gold-500 to-gold-600 border-white text-navy-950 scale-110 shadow-gold-500/30 ring-4 ring-gold-500/20'
                          : isCompleted
                          ? 'bg-navy-800 border-gold-500/50 text-gold-400 hover:border-gold-400'
                          : 'bg-navy-900 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>

                    <span
                      className={`text-xs font-bold mt-3 tracking-wider uppercase transition-colors font-mono ${
                        isActive ? 'text-gold-300' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      Step {step.step}
                    </span>

                    <span
                      className={`text-xs font-medium max-w-[140px] text-center mt-1 transition-colors line-clamp-1 ${
                        isActive ? 'text-white font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Step Buttons */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {MANUFACTURING_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gold-500 text-navy-950 border-gold-400 shadow-md'
                    : 'bg-navy-900 text-slate-300 border-white/10'
                }`}
              >
                <span className="font-mono">{step.step}.</span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Image with overlay */}
              <div className="lg:col-span-6 relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                <SafeImage
                  src={activeStep.image}
                  fallbackSrc={activeStep.fallbackImage}
                  alt={activeStep.title}
                  className="w-full h-72 sm:h-96"
                  zoomOnHover={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200 bg-navy-950/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
                  <span className="font-semibold text-gold-300 font-mono">Phase {activeStep.step} Production</span>
                  <span className="text-slate-400 font-light">Strict Quality Tolerance</span>
                </div>
              </div>

              {/* Right Column: Step Specifications & Details */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase font-extrabold tracking-widest px-2.5 py-1 rounded bg-gold-500/15 text-gold-400 border border-gold-500/30 font-mono">
                    Phase {activeStep.step} of 05
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{activeStep.tagline}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 font-display">
                  {activeStep.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  {activeStep.description}
                </p>

                {/* Technical Specs Table */}
                <div className="bg-navy-900/90 rounded-xl p-4 border border-white/5 space-y-2.5 mb-6 text-xs">
                  {activeStep.specs.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">{item.label}:</span>
                      <span className="text-white font-semibold text-right font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Highlights List */}
                <div className="space-y-2 mb-6">
                  {activeStep.highlights.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" aria-hidden="true" />
                      </div>
                      <span className="font-light">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Next Step Navigation */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() =>
                      setActiveStepIndex((prev) =>
                        prev < MANUFACTURING_STEPS.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="px-5 py-2.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white border border-white/15 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <span>{activeStepIndex === MANUFACTURING_STEPS.length - 1 ? 'Back to Step 01' : 'Next Process Step'}</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs text-slate-400 hidden sm:inline font-light">
                    Click any timeline icon above to inspect that facility
                  </span>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
