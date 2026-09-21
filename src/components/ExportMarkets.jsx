/**
 * ==============================================================================
 * A&H IMPEX - EXPORT MARKETS & GLOBAL LOGISTICS SECTION
 * ==============================================================================
 * Purpose: Visualizes worldwide export routes, regional delivery corridors
 *          (EU, North America, UK, Middle East, Oceania), and Incoterms support.
 * 
 * Features:
 * - Interactive regional selector updating port lists, transit times, and market shares.
 * - Stylized global logistics coordinate map with animated route paths.
 * - Supported Incoterms bar (FOB, CIF, CFR, DDP, EXW).
 * - 4 shipping capability cards (FCL/LCL, Air freight, Seaworthy packing, Customs).
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Ship, Anchor, Clock, ArrowRight } from 'lucide-react';
import { EXPORT_REGIONS, SHIPPING_CAPABILITIES } from '../data/export';

export default function ExportMarkets({ onOpenQuoteModal }) {
  const [activeRegion, setActiveRegion] = useState(EXPORT_REGIONS[0]);

  return (
    <section id="export" className="py-24 bg-navy-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Globe2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Worldwide Supply Chain</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
            Global Logistics &amp; <span className="gold-gradient-text">Export Corridors</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-4 font-light">
            Exporting full-container loads (FCL) and consolidated shipments (LCL) directly to major commercial ports across North America, the European Union, the UK, and the GCC.
          </p>
        </div>

        {/* Split Layout: Regional Breakdown & Interactive Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left Column: Regional Selector & Shipping Specs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-3">
              {EXPORT_REGIONS.map((region) => {
                const isActive = activeRegion.id === region.id;
                return (
                  <div
                    key={region.id}
                    onClick={() => setActiveRegion(region)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-navy-850/90 border-gold-400/80 shadow-xl ring-2 ring-gold-500/20'
                        : 'glass-card border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-navy-800 border border-gold-500/30 text-gold-400 flex items-center justify-center text-xs font-bold font-mono">
                          {region.share}
                        </span>
                        <h4 className="text-base font-bold text-white font-display">
                          {region.name}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium font-mono">
                        <Clock className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                        {region.transitDays}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-light mb-3">
                      {region.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-slate-400">Key Destination Ports:</span>
                      {region.ports.map((port, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 font-mono"
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <span>Calculate Freight &amp; Lead Times for {activeRegion.name}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Stylized Global Logistics Visual with Animated Port Dots */}
          <div className="lg:col-span-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <Anchor className="w-4 h-4 text-gold-400" aria-hidden="true" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Ocean &amp; Air Freight Hubs
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  24/7 Container Tracking
                </span>
              </div>

              {/* Stylized World Map Graphic Canvas */}
              <div className="relative aspect-[16/10] bg-navy-900/90 rounded-xl overflow-hidden border border-white/5 p-4 flex flex-col justify-between">
                {/* Background dot grid representing global coordinates */}
                <div className="absolute inset-0 bg-fabric-weave opacity-40 pointer-events-none" />

                {/* Animated trade lines representation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  {/* Origin to Europe */}
                  <path d="M 320 180 Q 220 100 160 90" fill="none" stroke="rgba(197,168,128,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  {/* Origin to North America */}
                  <path d="M 320 180 Q 180 60 70 110" fill="none" stroke="rgba(197,168,128,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  {/* Origin to Middle East */}
                  <path d="M 320 180 Q 280 150 250 160" fill="none" stroke="rgba(197,168,128,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                  {/* Origin to Australia */}
                  <path d="M 320 180 Q 360 220 380 250" fill="none" stroke="rgba(197,168,128,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>

                {/* Port Markers */}
                <div className="relative z-10 flex flex-col justify-between h-full text-xs">
                  <div className="flex justify-between items-start">
                    {/* US Port */}
                    <div className="bg-navy-950/90 border border-white/10 p-2 rounded-lg backdrop-blur-md">
                      <p className="font-bold text-white text-[11px] font-display">North America</p>
                      <p className="text-[10px] text-gold-400 font-mono">LA / New York Ports</p>
                    </div>

                    {/* Europe Port */}
                    <div className="bg-navy-950/90 border border-white/10 p-2 rounded-lg backdrop-blur-md">
                      <p className="font-bold text-white text-[11px] font-display">European Gateway</p>
                      <p className="text-[10px] text-emerald-400 font-mono">Rotterdam / Hamburg</p>
                    </div>
                  </div>

                  {/* Mill Center Origin Pin */}
                  <div className="self-center bg-gold-500 text-navy-950 px-3 py-1.5 rounded-lg shadow-xl font-extrabold text-[11px] flex items-center gap-1.5 border border-white">
                    <span className="w-2 h-2 rounded-full bg-navy-950 animate-ping" />
                    <span className="font-display">A&amp;H IMPEX MILL HUB</span>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Middle East */}
                    <div className="bg-navy-950/90 border border-white/10 p-2 rounded-lg backdrop-blur-md">
                      <p className="font-bold text-white text-[11px] font-display">Middle East Hub</p>
                      <p className="text-[10px] text-gold-400 font-mono">Jebel Ali (Dubai)</p>
                    </div>

                    {/* Oceania Port */}
                    <div className="bg-navy-950/90 border border-white/10 p-2 rounded-lg backdrop-blur-md">
                      <p className="font-bold text-white text-[11px] font-display">Oceania</p>
                      <p className="text-[10px] text-slate-300 font-mono">Sydney / Melbourne</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Incoterms Bar */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
                <span className="text-slate-400 font-medium">Supported Incoterms:</span>
                <div className="flex items-center gap-1.5 font-bold text-gold-300 text-[11px] font-mono">
                  {['FOB', 'CIF', 'CFR', 'DDP', 'EXW'].map((term) => (
                    <span key={term} className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Shipping Capabilities Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHIPPING_CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-5 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-navy-800 border border-gold-500/25 flex items-center justify-center text-gold-400 mb-3">
                  <Ship className="w-4 h-4" aria-hidden="true" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 font-display">
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
