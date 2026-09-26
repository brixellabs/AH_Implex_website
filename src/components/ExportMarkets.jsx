/**
 * ==============================================================================
 * A&H IMPEX - EXPORT MARKETS & GLOBAL LOGISTICS SECTION (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faShip,
  faAnchor,
  faClock,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { EXPORT_REGIONS, SHIPPING_CAPABILITIES } from '../data/export';

export default function ExportMarkets({ onOpenQuoteModal }) {
  const [activeRegion, setActiveRegion] = useState(EXPORT_REGIONS[0]);

  return (
    <section id="export" className="py-14 sm:py-20 lg:py-24 bg-brand-900 relative overflow-hidden border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-800/90 border border-brand-500/30 text-brand-300 text-xs font-semibold tracking-wider uppercase mb-2.5 sm:mb-3 font-mono">
            <FontAwesomeIcon icon={faGlobe} className="text-xs" aria-hidden="true" />
            <span>Worldwide Supply Chain</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif">
            Global Logistics &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white">Export Corridors</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base mt-2 sm:mt-4 font-light">
            Exporting full-container loads (FCL) and consolidated shipments (LCL) directly to major commercial ports across North America, the European Union, the UK, and the GCC.
          </p>
        </div>

        {/* Split Layout: Regional Breakdown & Interactive Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-10 sm:mb-16">
          
          {/* Left Column: Regional Selector & Shipping Specs */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <div className="space-y-2.5 sm:space-y-3">
              {EXPORT_REGIONS.map((region) => {
                const isActive = activeRegion.id === region.id;
                return (
                  <div
                    key={region.id}
                    onClick={() => setActiveRegion(region)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-brand-800/95 border-brand-400/80 shadow-xl ring-2 ring-brand-500/30'
                        : 'glass-card border-brand-700/60 hover:border-brand-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand-700 border border-brand-500/40 text-brand-200 flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          {region.share}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white font-serif">
                          {region.name}
                        </h4>
                      </div>
                      <span className="text-[11px] sm:text-xs text-brand-300 flex items-center gap-1.5 font-medium font-mono">
                        <FontAwesomeIcon icon={faClock} className="text-brand-300 text-xs" aria-hidden="true" />
                        {region.transitDays}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-light mb-2.5 sm:mb-3">
                      {region.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px]">
                      <span className="text-slate-400">Key Ports:</span>
                      {region.ports.map((port, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-1.5 sm:px-2 py-0.5 rounded bg-brand-900/80 text-brand-200 border border-brand-700/50 font-mono"
                        >
                          {port}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenQuoteModal({ subject: `Inquiry: Shipping Rates to ${activeRegion.name}` })}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shimmer-sweep text-center"
              >
                <span>Calculate Freight &amp; Lead Times for {activeRegion.name}</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Stylized Global Logistics Visual with Animated Port Dots */}
          <div className="lg:col-span-6">
            <div className="glass-card rounded-2xl p-4 sm:p-8 border border-brand-700/60 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-brand-700/60 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faAnchor} className="text-brand-300 text-xs" aria-hidden="true" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Ocean &amp; Air Freight Hubs
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium font-mono">
                  24/7 Tracking
                </span>
              </div>

              {/* Stylized World Map Graphic Canvas */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] bg-brand-950 rounded-xl overflow-hidden border border-brand-700/50 p-3 sm:p-4 flex flex-col justify-between min-h-[220px]">
                {/* Background dot grid */}
                <div className="absolute inset-0 bg-fabric-weave opacity-40 pointer-events-none" />

                {/* Animated trade lines representation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M 180 120 Q 120 70 80 60" fill="none" stroke="rgba(148,191,228,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 180 120 Q 90 40 40 70" fill="none" stroke="rgba(148,191,228,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 180 120 Q 150 100 130 110" fill="none" stroke="rgba(148,191,228,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 180 120 Q 220 150 250 170" fill="none" stroke="rgba(148,191,228,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>

                {/* Port Markers */}
                <div className="relative z-10 flex flex-col justify-between h-full text-xs">
                  <div className="flex justify-between items-start gap-2">
                    <div className="bg-brand-900/90 border border-brand-700/60 p-1.5 sm:p-2 rounded-lg backdrop-blur-md">
                      <p className="font-bold text-white text-[10px] sm:text-[11px] font-serif">North America</p>
                      <p className="text-[9px] sm:text-[10px] text-brand-300 font-mono">LA / NY Ports</p>
                    </div>

                    <div className="bg-brand-900/90 border border-brand-700/60 p-1.5 sm:p-2 rounded-lg backdrop-blur-md">
                      <p className="font-bold text-white text-[10px] sm:text-[11px] font-serif">Europe</p>
                      <p className="text-[9px] sm:text-[10px] text-emerald-400 font-mono">Rotterdam / Hamburg</p>
                    </div>
                  </div>

                  {/* Mill Center Origin Pin */}
                  <div className="self-center bg-gradient-to-r from-blue-600 to-brand-600 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-xl font-extrabold text-[10px] sm:text-[11px] flex items-center gap-1.5 border border-white/40">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-ping" />
                    <span className="font-display">A&amp;H IMPEX MILL HUB</span>
                  </div>

                  <div className="flex justify-between items-end gap-2">
                    <div className="bg-brand-900/90 border border-brand-700/60 p-1.5 sm:p-2 rounded-lg backdrop-blur-md">
                      <p className="font-bold text-white text-[10px] sm:text-[11px] font-serif">Middle East</p>
                      <p className="text-[9px] sm:text-[10px] text-brand-300 font-mono">Jebel Ali (Dubai)</p>
                    </div>

                    <div className="bg-brand-900/90 border border-brand-700/60 p-1.5 sm:p-2 rounded-lg backdrop-blur-md">
                      <p className="font-bold text-white text-[10px] sm:text-[11px] font-serif">Oceania</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-300 font-mono">Sydney / Melbourne</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Incoterms Bar */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-brand-700/60 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                <span className="text-slate-400 font-medium text-xs">Supported Incoterms:</span>
                <div className="flex items-center gap-1 sm:gap-1.5 font-bold text-brand-200 text-[10px] sm:text-[11px] font-mono">
                  {['FOB', 'CIF', 'CFR', 'DDP', 'EXW'].map((term) => (
                    <span key={term} className="px-1.5 sm:px-2 py-0.5 rounded bg-brand-800 border border-brand-700/60">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Shipping Capabilities Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SHIPPING_CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-4 sm:p-5 border border-brand-700/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 border border-brand-500/30 flex items-center justify-center text-brand-300 mb-2.5 sm:mb-3">
                  <FontAwesomeIcon icon={faShip} className="text-xs sm:text-sm" aria-hidden="true" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1 font-serif">
                  {cap.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

