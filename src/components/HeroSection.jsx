/**
 * ==============================================================================
 * A&H IMPEX - HERO SECTION WITH AUTOMATED 10-SECOND BACKGROUND IMAGE SLIDER
 * ==============================================================================
 * Purpose: First visual touchpoint creating an immediate luxury international
 *          textile manufacturer impression with fully automated background
 *          product image transitions every 10 seconds.
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
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

const SLIDE_DURATION = 10000; // 10 seconds per image

const PRODUCT_BG_IMAGES = [
  {
    id: 'sateen-bedding',
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=2200&q=85',
    title: 'Luxury Sateen Bedding'
  },
  {
    id: 'hotel-linens',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2200&q=85',
    title: 'Institutional Hotel Linens'
  },
  {
    id: 'apparel-chinos',
    url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=2200&q=85',
    title: 'Export Stretch Chinos'
  },
  {
    id: 'fleece-tracksuits',
    url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=2200&q=85',
    title: 'French Terry & Fleece Apparel'
  },
  {
    id: 'banquet-damask',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=2200&q=85',
    title: 'Jacquard Damask Table Linens'
  },
  {
    id: 'oem-weaving',
    url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=2200&q=85',
    title: 'Air-Jet Woven Fabric Rolls'
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

  // Automated 10-second background image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % PRODUCT_BG_IMAGES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const activeImage = PRODUCT_BG_IMAGES[currentImageIndex];

  return (
    <section
      aria-label="A&H Impex Hero Banner"
      className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-brand-900 hero-pattern select-none"
    >
      {/* Background Product Images Slider with Smooth Crossfade & Ken-Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: 'easeInOut' },
              scale: { duration: 10, ease: 'linear' }
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${activeImage.url}')`,
            }}
          />
        </AnimatePresence>

        {/* Multi-Stop Dark Brand Navy Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/98 via-brand-900/90 to-brand-900/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-brand-900/75" />
        <div className="absolute inset-0 bg-brand-950/20" />
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/90 border border-brand-500/30 text-brand-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm font-mono">
              <FontAwesomeIcon icon={faStar} className="text-gold-400 text-xs" aria-hidden="true" />
              <span>{info.eyebrow}</span>
            </div>

            {/* Main Heading (Playfair Display / Serif Reference Match) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6 font-serif">
              Premium Textiles.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white">
                Precision Manufacturing.
              </span>{' '}
              Global Reach.
            </h1>

            {/* Supporting Body Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-light">
              {info.heroDescription}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto">
              <a
                href="#products"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-brand-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shimmer-sweep"
              >
                <span>Explore Collections</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />
              </a>

              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-brand-800/90 hover:bg-brand-700/90 border border-brand-500/30 hover:border-brand-300/60 text-white font-semibold text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faFileInvoice} className="text-brand-300 text-xs" aria-hidden="true" />
                <span>Request a Quote (RFQ)</span>
              </button>
            </div>

            {/* 4 Trust Indicators Underneath */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-brand-700/50 w-full">
              {trustPillars.map((pillar, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-0.5">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 text-xs shrink-0" aria-hidden="true" />
                    <span>{pillar.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{pillar.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom curve separator */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-brand-900 to-transparent pointer-events-none" />
    </section>
  );
}


