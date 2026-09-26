/**
 * ==============================================================================
 * A&H IMPEX - FULL-SCREEN IMMERSIVE HERO SECTION WITH KEN-BURNS BACKGROUND SLIDER
 * ==============================================================================
 * 100% Responsive on all Mobile, Tablet, and Desktop screens.
 * Preserves original full-bleed visual layout with responsive typography,
 * crossfade background slider, and clean touch-friendly controls (no counter).
 * ==============================================================================
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCircleCheck,
  faStar,
  faFileInvoice
} from '@fortawesome/free-solid-svg-icons';
import { COMPANY } from '../data/company';
import { useData } from '../context/DataContext';

// Direct local textile assets imports
import heroImg1 from '../assets/hero 2.jfif';
import heroImg2 from '../assets/hero3.jfif';
import heroImg3 from '../assets/hero4.jfif';
import heroImg4 from '../assets/hero5.jfif';
import heroImg5 from '../assets/hero6.jfif';
import heroImg6 from '../assets/her06.jfif';
import heroImg7 from '../assets/hero7.jfif';

const SLIDE_DURATION = 6500;

export const HERO_SLIDES = [
  {
    id: 'hero-slide-1',
    src: heroImg1,
    title: 'Luxury Floral Sateen Bedding',
    tag: 'Export Quality 100% Cotton',
    threadCount: '300-800 Thread Count'
  },
  {
    id: 'hero-slide-2',
    src: heroImg2,
    title: 'Precision Weaving & Sateen Finishes',
    tag: 'Air-Jet Shuttleless Weaving',
    threadCount: 'High-Density Cotton'
  },
  {
    id: 'hero-slide-3',
    src: heroImg3,
    title: 'Signature Printed Comforters & Duvets',
    tag: 'Reactive Print Technology',
    threadCount: 'Colorfast OEKO-TEX Dyes'
  },
  {
    id: 'hero-slide-4',
    src: heroImg4,
    title: 'Premium Retail Packaged Linens',
    tag: 'OEM / Private Label Ready',
    threadCount: 'Custom Barcode & Packaging'
  },
  {
    id: 'hero-slide-5',
    src: heroImg5,
    title: 'Contemporary Geometric Quilt Sets',
    tag: 'Hypoallergenic Fillings',
    threadCount: 'Machine Washable Standard'
  },
  {
    id: 'hero-slide-6',
    src: heroImg6,
    title: 'Hospitality & Hotel White Linens',
    tag: 'Institutional Durability',
    threadCount: 'Commercial Laundering Safe'
  },
  {
    id: 'hero-slide-7',
    src: heroImg7,
    title: 'Vibrant Reactive Dyed Bed Sets',
    tag: 'AQL 1.5 Quality Inspected',
    threadCount: 'Pre-Shrunk Ring Spun Cotton'
  }
];

export default function HeroSection({ onOpenQuoteModal }) {
  const { companyInfo } = useData();
  const info = companyInfo || COMPANY;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const trustPillars = [
    { name: 'Quality Focused', desc: 'AQL 1.5 Standard' },
    { name: 'Export Ready', desc: '25+ Global Markets' },
    { name: 'OEM / Private Label', desc: 'Custom Weaving & Stitching' },
    { name: 'International Standards', desc: 'ISO 9001 & OEKO-TEX 100' },
  ];

  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Automated background image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const activeSlide = HERO_SLIDES[currentImageIndex];

  return (
    <section
      aria-label="A&H Impex Hero Banner"
      className="relative min-h-[580px] sm:min-h-[680px] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-900 hero-pattern select-none py-12 sm:py-16 lg:py-24"
    >
      {/* Full-Screen Background Image Slider with Smooth Crossfade & Ken-Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 7, ease: 'linear' }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.src}
              alt={activeSlide.title}
              className="w-full h-full object-cover object-center sm:object-center transform-gpu"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Responsive gradient overlay: Clear image visibility on mobile & smooth fade on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#071830]/75 sm:from-[#071830]/85 via-[#071830]/45 sm:via-[#071830]/35 to-[#071830]/25 sm:to-transparent" />
        
        {/* Soft edge blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071830]/70 via-transparent to-[#071830]/20" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-start max-w-3xl">
          
          {/* Hero Storytelling & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start w-full bg-[#071830]/30 sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none backdrop-blur-[2px] sm:backdrop-blur-none border border-white/5 sm:border-transparent"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#0e294d]/95 border border-brand-400/40 text-brand-200 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-6 shadow-lg backdrop-blur-md font-mono">
              <FontAwesomeIcon icon={faStar} className="text-gold-400 text-xs" aria-hidden="true" />
              <span>{info.eyebrow}</span>
            </div>

            {/* Main Heading with Drop Shadow */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.15] mb-4 sm:mb-6 font-serif drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Premium Textiles.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white">
                Precision Manufacturing.
              </span>{' '}
              Global Reach.
            </h1>

            {/* Supporting Body Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-100 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {info.heroDescription}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 w-full sm:w-auto">
              <a
                href="#products"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-brand-900/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shimmer-sweep text-center"
              >
                <span>Explore Collections</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />
              </a>

              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-[#0e294d]/95 hover:bg-brand-700/95 border border-brand-400/40 hover:border-brand-300/80 text-white font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-center"
              >
                <FontAwesomeIcon icon={faFileInvoice} className="text-brand-300 text-xs" aria-hidden="true" />
                <span>Request a Quote (RFQ)</span>
              </button>
            </div>

            {/* 4 Trust Indicators Underneath */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-white/20 w-full">
              {trustPillars.map((pillar, idx) => (
                <div key={idx} className="flex flex-col bg-[#071830]/75 backdrop-blur-md p-2 sm:p-2.5 rounded-lg border border-brand-500/20 shadow-sm">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-white mb-0.5">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 text-[10px] sm:text-xs shrink-0" aria-hidden="true" />
                    <span className="truncate">{pillar.name}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-300 truncate">{pillar.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom curve separator */}
      <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-brand-900 to-transparent pointer-events-none" />
    </section>
  );
}
