/**
 * ==============================================================================
 * A&H IMPEX - PRODUCT CATALOG & CATEGORY FILTERING SECTION
 * ==============================================================================
 * Purpose: Interactive B2B catalog allowing importers and procurement agents
 *          to filter across Home Textiles, Apparel, Hospitality, and OEM Weaves.
 * 
 * Features:
 * - Dynamic category tab filtering with smooth Framer Motion layout animations.
 * - Responsive grid with 1 to 4 columns based on viewport breakpoint.
 * - Bottom custom OEM banner for bespoke yarn counts and weave inquiries.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, SlidersHorizontal, FileText, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';

export default function ProductSection({ onSelectProduct, onOpenQuoteModal }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-navy-800/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Export Product Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              Textile Collections &amp; <span className="gold-gradient-text">OEM Capabilities</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 font-light">
              Engineered for international department stores, institutional buyers, and private label importers. Available with custom thread counts, dyes, and branded retail packaging.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <SlidersHorizontal className="w-4 h-4 text-gold-400" aria-hidden="true" />
            <span>Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> Export Lines</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-navy-950 bg-gradient-to-r from-gold-500 to-gold-600 shadow-lg shadow-gold-500/20'
                    : 'text-slate-300 bg-navy-900/80 hover:bg-navy-850 hover:text-white border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="w-1.5 h-1.5 rounded-full bg-navy-950"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Animated Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Custom OEM Inquiry Banner */}
        <div className="mt-16 rounded-2xl p-8 sm:p-10 glass-card border border-gold-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs uppercase tracking-wider text-gold-400 font-bold font-mono">
                Custom OEM &amp; Private Label Inquiries
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 font-display">
                Need Bespoke Yarn Counts, Weaves, or Custom Pantones?
              </h3>
              <p className="text-sm text-slate-300 mt-2 font-light">
                Our mill accepts custom technical specifications with flexible Minimum Order Quantities (MOQ), lab-dip color approvals, and direct door-to-port export logistics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => onOpenQuoteModal({ subject: 'Custom OEM Weaving Inquiry' })}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                Submit Custom RFQ
              </button>

              <a
                href="#manufacturing"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-900 border border-white/15 text-slate-200 hover:text-white text-sm font-semibold text-center hover:border-gold-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>View Loom Capabilities</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
