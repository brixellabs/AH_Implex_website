/**
 * ==============================================================================
 * A&H IMPEX - FULL-SCREEN BACKGROUND HERO SLIDER
 * ==============================================================================
 * Purpose: Full-screen background slider featuring local factory textile images.
 *          Directional gradient overlay ensures 100% text readability on the left
 *          while keeping images 100% clear, bright, and visible on the right.
 * ==============================================================================
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCircleCheck,
  faStar,
  faFileInvoice,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { COMPANY } from '../data/company';
import { useData } from '../context/DataContext';

// Direct local textile assets imports (No external / AI images)
import heroImg1 from '../assets/hero 2.jfif';
import heroImg2 from '../assets/hero3.jfif';
import heroImg3 from '../assets/hero4.jfif';
import heroImg4 from '../assets/hero5.jfif';
import heroImg5 from '../assets/hero6.jfif';
import heroImg6 from '../assets/hero7.jfif';
import heroImg7 from '../assets/her06.jfif';

const SLIDE_DURATION = 7000; // 7 seconds per slide

const HERO_SLIDES = [
  {
    id: 'hero-slide-1',
    src: heroImg1,
    title: 'Luxury Floral Sateen Bedding',
    tag: 'Export Quality 100% Cotton'
  },
  {
    id: 'hero-slide-2',
    src: heroImg2,
    title: 'Printed Duvet & Quilt Collections',
    tag: 'Precision Air-Jet Weaving'
  },
  {
    id: 'hero-slide-3',
    src: heroImg3,
    title: 'Botanical & Jacquard Linens',
    tag: 'OEM & Private Label'
  },
  {
    id: 'hero-slide-4',
    src: heroImg4,
    title: 'Classic Damask Bedding Collections',
    tag: 'ISO 9001 & OEKO-TEX 100'
  },
  {
    id: 'hero-slide-5',
    src: heroImg5,
    title: 'Fine Combed Cotton Sheet Sets',
    tag: 'Soft Reactive Printing'
  },
  {
    id: 'hero-slide-6',
    src: heroImg6,
    title: 'Hospitality & Hotel White Linens',
    tag: 'Institutional Durability'
  },
  {
    id: 'hero-slide-7',
    src: heroImg7,
    title: 'Vibrant Reactive Dyed Bed Sets',
    tag: 'AQL 1.5 Quality Inspected'
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

  const prevSlide = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
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
      className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-brand-900 hero-pattern select-none"
    >
      {/* Full-Screen Background Image Slider with Smooth Crossfade & Ken-Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 7, ease: 'linear' }
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${activeSlide.src}')`,
            }}
          />
        </AnimatePresence>

        {/* Ultra-light soft gradient overlay - maximum image brightness and natural colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071830]/45 via-[#071830]/20 via-45% to-transparent" />
        
        {/* Minimal soft top and bottom edge blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071830]/30 via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="flex flex-col items-start max-w-3xl">
          
          {/* Hero Storytelling & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start w-full"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e294d]/95 border border-brand-400/40 text-brand-200 text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg backdrop-blur-md font-mono">
              <FontAwesomeIcon icon={faStar} className="text-gold-400 text-xs" aria-hidden="true" />
              <span>{info.eyebrow}</span>
            </div>

            {/* Main Heading with Drop Shadow */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6 font-serif drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Premium Textiles.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white">
                Precision Manufacturing.
              </span>{' '}
              Global Reach.
            </h1>

            {/* Supporting Body Paragraph */}
            <p className="text-base sm:text-lg text-slate-100 max-w-2xl leading-relaxed mb-8 font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {info.heroDescription}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto">
              <a
                href="#products"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-brand-900/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shimmer-sweep"
              >
                <span>Explore Collections</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />
              </a>

              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#0e294d]/95 hover:bg-brand-700/95 border border-brand-400/40 hover:border-brand-300/80 text-white font-semibold text-sm tracking-wide backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faFileInvoice} className="text-brand-300 text-xs" aria-hidden="true" />
                <span>Request a Quote (RFQ)</span>
              </button>
            </div>

            {/* 4 Trust Indicators Underneath */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/20 w-full">
              {trustPillars.map((pillar, idx) => (
                <div key={idx} className="flex flex-col bg-[#071830]/70 backdrop-blur-md p-2.5 rounded-lg border border-brand-500/20 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-0.5">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 text-xs shrink-0" aria-hidden="true" />
                    <span>{pillar.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-300">{pillar.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Slide Navigation Controls & Counter at Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-[#071830]/85 backdrop-blur-md px-4 py-2 rounded-full border border-brand-500/30 shadow-xl">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
        </button>

        <div className="flex items-center gap-1.5">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentImageIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex
                  ? 'w-6 bg-brand-400'
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </button>

        <span className="text-[11px] font-mono text-slate-300 border-l border-brand-700/60 pl-2">
          0{currentImageIndex + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>

      {/* Subtle bottom curve separator */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-brand-900 to-transparent pointer-events-none" />
    </section>
  );
}
