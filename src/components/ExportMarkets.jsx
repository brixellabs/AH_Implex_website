/**
 * ==============================================================================
 * A&H IMPEX - EXPORT MARKETS & GLOBAL LOGISTICS SECTION (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShip,
  faAnchor,
  faClock,
  faArrowRight,
  faLocationDot,
  faArrowUpRightFromSquare,
  faIndustry
} from '@fortawesome/free-solid-svg-icons';
import { EXPORT_REGIONS, SHIPPING_CAPABILITIES } from '../data/export';

export default function ExportMarkets({ onOpenQuoteModal }) {
  const [activeRegion, setActiveRegion] = useState(EXPORT_REGIONS[0]);

  return (
    <section id="export" className="py-14 sm:py-20 lg:py-24 bg-brand-900 relative overflow-hidden border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif">
            Global Logistics <span className="font-sans font-semibold">&amp;</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white">Export Corridors</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base mt-2 sm:mt-4 font-light">
            Exporting full-container loads (FCL) and consolidated shipments (LCL) directly to major commercial ports across North America, the European Union, the UK, and the GCC.
          </p>
        </div>

        {/* Split Layout: Regional Breakdown & Interactive Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch mb-10 sm:mb-16">
          
          {/* Left Column: Regional Selector & Shipping Specs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              {EXPORT_REGIONS.map((region) => {
                const isActive = activeRegion.id === region.id;
                return (
                  <div
                    key={region.id}
                    onClick={() => setActiveRegion(region)}
                    className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-brand-800/95 border-brand-400/80 shadow-xl ring-2 ring-brand-500/30'
                        : 'glass-card border-brand-700/60 hover:border-brand-500/50 hover:bg-brand-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-brand-700 border border-brand-500/40 text-brand-200 flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          {region.share}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white truncate">
                          {region.name}
                        </h4>
                      </div>
                      <span className="text-[11px] sm:text-xs text-brand-300 flex items-center gap-1.5 font-medium font-mono shrink-0">
                        <FontAwesomeIcon icon={faClock} className="text-brand-300 text-[10px]" aria-hidden="true" />
                        {region.transitDays}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-light mb-2 leading-relaxed">
                      {region.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px]">
                      <span className="text-slate-400 font-medium">Key Ports:</span>
                      {region.ports.map((port, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-1.5 py-0.5 rounded bg-brand-900/80 text-brand-200 border border-brand-700/50 font-mono"
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
                <FontAwesomeIcon icon={faArrowRight} className="text-xs shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Google Map with Mill Location & Logistics Specs */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-card rounded-2xl p-4 sm:p-5 border border-brand-700/60 relative overflow-hidden shadow-2xl flex-1 flex flex-col">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-brand-700/60 mb-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FontAwesomeIcon icon={faIndustry} className="text-brand-300 text-sm shrink-0" aria-hidden="true" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono truncate">
                    A&amp;H IMPEX Mill &amp; Global Export Hub
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium font-mono flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Mill</span>
                </span>
              </div>

              {/* Embedded Google Map (Expands to fill vertical card space naturally) */}
              <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[350px] bg-brand-950 rounded-xl overflow-hidden border border-brand-700/50 shadow-inner">
                <iframe
                  title="A&H IMPEX Mill Location"
                  src="https://maps.google.com/maps?q=Khurrianwala%20Industrial%20Zone%2C%20Faisalabad%2C%20Pakistan&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Floating Bottom Location Badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-brand-900/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-brand-500/40 shadow-2xl flex items-center justify-between gap-2 z-10">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <FontAwesomeIcon icon={faLocationDot} className="text-red-400 text-xs shrink-0" />
                      <span className="truncate">A&amp;H IMPEX Mill &amp; Export Desk</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 truncate font-light mt-0.5">
                      Khurrianwala Industrial Zone, Faisalabad, Pakistan
                    </p>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Khurrianwala+Industrial+Zone+Faisalabad+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] sm:text-xs font-semibold shrink-0 flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                  >
                    <span>Open in Maps</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                  </a>
                </div>
              </div>

              {/* Mill Logistics Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-brand-700/60 text-[11px]">
                <div className="bg-brand-900/70 p-2 rounded-lg border border-brand-700/40">
                  <span className="text-slate-400 block text-[10px]">Port of Departure:</span>
                  <span className="font-semibold text-white">Karachi Port (KICT/PICT/QICT)</span>
                </div>
                <div className="bg-brand-900/70 p-2 rounded-lg border border-brand-700/40">
                  <span className="text-slate-400 block text-[10px]">Container Loading:</span>
                  <span className="font-semibold text-white">Daily 20ft &amp; 40ft HC FCL/LCL</span>
                </div>
              </div>

              {/* Incoterms Bar */}
              <div className="mt-2.5 pt-2.5 border-t border-brand-700/60 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                <span className="text-slate-400 font-medium text-[10px] sm:text-xs">Supported Incoterms:</span>
                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 font-bold text-brand-200 text-[10px] sm:text-[11px] font-mono">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {SHIPPING_CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-3.5 sm:p-5 border border-brand-700/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 border border-brand-500/30 flex items-center justify-center text-brand-300 mb-2 sm:mb-3">
                  <FontAwesomeIcon icon={faShip} className="text-xs sm:text-sm" aria-hidden="true" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1 font-serif">
                  {cap.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-light">
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

