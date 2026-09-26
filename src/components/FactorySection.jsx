/**
 * ==============================================================================
 * A&H IMPEX - FACTORY PRODUCTION SCALE & VIDEO WALKTHROUGH SECTION (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faIndustry,
  faCircleCheck,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import SafeImage from './SafeImage';

function CounterItem({ target, suffix = '', label, description, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const increment = target / steps;
    const stepTime = (duration * 1000) / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 text-center relative overflow-hidden">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display mb-1">
        {count}
        <span className="text-gold-400 font-mono">{suffix}</span>
      </div>
      <p className="text-sm font-bold text-gold-300 uppercase tracking-wider mb-2 font-display">
        {label}
      </p>
      <p className="text-xs text-slate-300 font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function FactorySection({ onOpenQuoteModal }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative py-28 bg-navy-950 overflow-hidden">
      {/* Immersive Full-Width Industrial Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2200&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/90 to-navy-950" />
        <div className="absolute inset-0 bg-fabric-weave opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Title Overlay */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <FontAwesomeIcon icon={faIndustry} className="text-xs" aria-hidden="true" />
            <span>Industrial Scale &amp; Reliability</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display">
            Built for Quality.{' '}
            <span className="gold-gradient-text">Designed for Scale.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-4 font-light max-w-2xl mx-auto">
            From single container sample orders to high-volume recurring retail contracts, our production infrastructure delivers unyielding consistency.
          </p>
        </div>

        {/* 4 Animated Count-Up Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <CounterItem
            target={18}
            suffix="M+"
            label="Meters Output"
            description="Annual air-jet weaving, dyeing and processing capacity"
          />
          <CounterItem
            target={180}
            suffix="+"
            label="Air-Jet Looms"
            description="High-speed shuttleless weaving infrastructure"
          />
          <CounterItem
            target={25}
            suffix="+"
            label="Export Countries"
            description="Active retail and institutional supply chains globally"
          />
          <CounterItem
            target={99.6}
            suffix="%"
            label="AQL Quality Pass"
            description="ANSI/ASQ Z1.4 Level II standard inspection record"
          />
        </div>

        {/* Video Tour & Mill Walkthrough Card (Inspired by Reference Design) */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Thumbnail with Play Button */}
            <div
              className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/15 group cursor-pointer"
              onClick={() => setVideoModalOpen(true)}
            >
              <SafeImage
                src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80"
                alt="A&H IMPEX Mill Virtual Tour"
                className="w-full h-64 sm:h-80"
                zoomOnHover={true}
              />
              <div className="absolute inset-0 bg-navy-950/40 group-hover:bg-navy-950/20 transition-all flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/90 group-hover:bg-gold-400 text-navy-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all">
                  <FontAwesomeIcon icon={faPlay} className="text-lg ml-0.5" aria-hidden="true" />
                </div>
              </div>

              <div className="absolute bottom-3 left-4 right-4 bg-navy-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between text-xs text-slate-200">
                <span>Facility Tour Preview</span>
                <span className="text-gold-300 font-medium">Virtual Walkthrough</span>
              </div>
            </div>

            {/* Video Content Description */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-gold-400 font-bold mb-1 font-mono">
                Facility &amp; Production Inspection
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 font-display">
                Virtual Mill Walkthrough
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                Inspect our high-speed warping lines, shuttleless air-jet weaving floors, continuous dyeing reactors, and automated stitching units from anywhere in the world.
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 text-xs shrink-0" aria-hidden="true" />
                  <span className="font-light">340cm extra-wide weaving hall with computerized tension controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 text-xs shrink-0" aria-hidden="true" />
                  <span className="font-light">Automated chemical dispensing &amp; effluent treatment plant (ETP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 text-xs shrink-0" aria-hidden="true" />
                  <span className="font-light">C-TPAT compliant container loading dock with CCTV monitoring</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02] text-center"
                >
                  Play Facility Overview
                </button>
                <button
                  onClick={() => onOpenQuoteModal({ subject: 'Schedule Factory Audit / In-Person Visit' })}
                  className="px-5 py-2.5 rounded-lg bg-navy-900 border border-white/15 text-slate-200 hover:text-white text-xs font-semibold hover:border-gold-500/40 transition-all text-center"
                >
                  Schedule On-Site Audit
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Video Modal Lightbox */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-navy-900 border border-white/20 rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h4 className="text-base font-bold text-white font-display">A&amp;H IMPEX Production Facilities Overview</h4>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs p-1 rounded-md hover:bg-navy-800 flex items-center gap-1"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
                <span>Close</span>
              </button>
            </div>
            
            <div className="relative rounded-xl overflow-hidden aspect-video bg-navy-950 flex flex-col items-center justify-center p-8 text-center border border-white/10">
              <FontAwesomeIcon icon={faIndustry} className="text-5xl text-gold-400 mb-4 animate-bounce" />
              <h5 className="text-lg font-bold text-white mb-2 font-display">Virtual Mill Video Tour Ready</h5>
              <p className="text-xs text-slate-300 max-w-md mb-5 leading-relaxed font-light">
                High-definition drone footage and technical machinery walkthrough video file ready for client streaming integration.
              </p>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-gold-500 text-navy-950 text-xs font-bold shadow-md"
              >
                Return to Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
