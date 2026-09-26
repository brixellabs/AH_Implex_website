/**
 * ==============================================================================
 * A&H IMPEX - MANUFACTURING PROCESS TIMELINE SECTION (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faMicrochip,
  faStar,
  faScissors,
  faCircleCheck,
  faChevronRight,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import SafeImage from './SafeImage';
import { MANUFACTURING_STEPS } from '../data/manufacturing';

const stepIcons = [faLayerGroup, faMicrochip, faStar, faScissors, faCircleCheck];

export default function ManufacturingSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = MANUFACTURING_STEPS[activeStepIndex];

  return (
    <section id="manufacturing" className="py-14 sm:py-20 lg:py-24 bg-brand-900 relative overflow-hidden border-t border-b border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-800/90 border border-brand-500/30 text-brand-300 text-xs font-semibold tracking-wider uppercase mb-2.5 sm:mb-3 font-mono">
            <FontAwesomeIcon icon={faMicrochip} className="text-xs" aria-hidden="true" />
            <span>Vertical Production Setup</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif">
            Precision Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white">Timeline</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base mt-2 sm:mt-4 font-light">
            Every fiber travels through five strictly controlled manufacturing phases, ensuring exceptional structural strength, color consistency, and international compliance.
          </p>
        </div>

        {/* Desktop Horizontal Interactive Timeline Steps */}
        <div className="hidden lg:block mb-12">
          <div className="relative">
            {/* Connecting background progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-brand-800 -translate-y-1/2 z-0" />
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-brand-500 to-brand-400 -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: `${(activeStepIndex / (MANUFACTURING_STEPS.length - 1)) * 100}%`
              }}
            />

            {/* Step trigger nodes */}
            <div className="relative z-10 flex justify-between">
              {MANUFACTURING_STEPS.map((step, idx) => {
                const icon = stepIcons[idx] || faLayerGroup;
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
                          ? 'bg-gradient-to-br from-blue-600 to-brand-600 border-white text-white scale-110 shadow-brand-500/30 ring-4 ring-brand-500/20'
                          : isCompleted
                          ? 'bg-brand-700 border-brand-500/50 text-brand-200 hover:border-brand-400'
                          : 'bg-brand-800/80 border-brand-700/60 text-slate-400 hover:border-brand-500 hover:text-white'
                      }`}
                    >
                      <FontAwesomeIcon icon={icon} className="text-xl" aria-hidden="true" />
                    </div>

                    <span
                      className={`text-xs font-bold mt-3 tracking-wider uppercase transition-colors font-mono ${
                        isActive ? 'text-brand-300' : 'text-slate-400 group-hover:text-slate-200'
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
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar touch-pan-x">
          {MANUFACTURING_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                  isActive
                    ? 'bg-brand-700 text-white border-brand-500 shadow-md'
                    : 'bg-brand-800 text-slate-300 border-brand-700/60'
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
            className="glass-card rounded-2xl p-5 sm:p-8 lg:p-10 border border-brand-700/60 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Image with overlay */}
              <div className="lg:col-span-6 relative rounded-xl overflow-hidden shadow-2xl border border-brand-700/60 group">
                <SafeImage
                  key={activeStep.step}
                  src={activeStep.image}
                  fallbackSrc={activeStep.fallbackImage}
                  alt={activeStep.title}
                  className="w-full h-56 sm:h-80 md:h-96"
                  zoomOnHover={true}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs text-slate-200 bg-brand-900/90 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-brand-700/60">
                  <span className="font-semibold text-brand-300 font-mono">Phase {activeStep.step} Production</span>
                  <span className="text-slate-400 font-light">Strict Quality Tolerance</span>
                </div>
              </div>

              {/* Right Column: Step Specifications & Details */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-brand-700/60 text-brand-200 border border-brand-500/30 font-mono">
                    Phase {activeStep.step} of 05
                  </span>
                  <span className="text-xs text-slate-400 font-medium truncate">{activeStep.tagline}</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-3 sm:mb-4 font-serif">
                  {activeStep.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-light">
                  {activeStep.description}
                </p>

                {/* Technical Specs Table */}
                <div className="bg-brand-800/80 rounded-xl p-3 sm:p-4 border border-brand-700/50 space-y-2 mb-4 sm:mb-6 text-xs">
                  {activeStep.specs.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium text-[11px] sm:text-xs">{item.label}:</span>
                      <span className="text-white font-semibold text-right font-mono text-[11px] sm:text-xs">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {activeStep.highlights.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <FontAwesomeIcon icon={faCheck} className="text-[10px]" aria-hidden="true" />
                      </div>
                      <span className="font-light">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Next Step Navigation */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 border-t border-brand-700/60">
                  <button
                    onClick={() =>
                      setActiveStepIndex((prev) =>
                        prev < MANUFACTURING_STEPS.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="px-5 py-2.5 rounded-lg bg-brand-800 hover:bg-brand-700 text-slate-200 hover:text-white border border-brand-700/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>{activeStepIndex === MANUFACTURING_STEPS.length - 1 ? 'Back to Step 01' : 'Next Process Step'}</span>
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" aria-hidden="true" />
                  </button>
                  <span className="text-[11px] sm:text-xs text-slate-400 hidden sm:inline font-light">
                    Click any step above to inspect that facility
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

