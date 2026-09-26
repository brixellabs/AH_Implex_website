/**
 * ==============================================================================
 * A&H IMPEX - PRODUCT CATALOG & CATEGORY FILTERING SECTION (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faSliders,
  faFileInvoice,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';
import { useData } from '../context/DataContext';

export default function ProductSection({ onSelectProduct, onOpenQuoteModal }) {
  const { products, categories } = useData();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => {
        const catValue = typeof p.category === 'object' && p.category ? p.category.slug || p.category.id : p.category;
        return catValue === activeCategory || p.categoryName === activeCategory || p.category_name === activeCategory;
      });

  return (
    <section id="products" className="py-14 sm:py-20 lg:py-24 cotton-weave-bg bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wider uppercase mb-2.5 sm:mb-3 font-mono">
              <FontAwesomeIcon icon={faStar} className="text-xs text-gold-500" aria-hidden="true" />
              <span>Export Product Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight font-serif">
              Textile Collections <span className="font-sans font-semibold">&amp;</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-blue-600">OEM Capabilities</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-base mt-2 sm:mt-3 font-normal">
              Engineered for international department stores, institutional buyers, and private label importers. Available with custom thread counts, dyes, and branded retail packaging.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm w-fit">
            <FontAwesomeIcon icon={faSliders} className="text-brand-600 text-xs" aria-hidden="true" />
            <span>Showing <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong> Export Lines</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 no-scrollbar touch-pan-x">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 shadow-md shadow-brand-500/20'
                    : 'text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Animated Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
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
        <div className="mt-12 sm:mt-16 rounded-2xl p-6 sm:p-10 bg-brand-900 border border-brand-700/80 relative overflow-hidden shadow-2xl text-white">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs uppercase tracking-wider text-brand-300 font-bold font-mono">
                Custom OEM &amp; Private Label Inquiries
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white mt-1 font-serif">
                Need Bespoke Yarn Counts, Weaves, or Custom Pantones?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light">
                Our mill accepts custom technical specifications with flexible Minimum Order Quantities (MOQ), lab-dip color approvals, and direct door-to-port export logistics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => onOpenQuoteModal({ subject: 'Custom OEM Weaving Inquiry' })}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shimmer-sweep text-center"
              >
                <FontAwesomeIcon icon={faFileInvoice} className="text-sm" aria-hidden="true" />
                <span>Submit Custom RFQ</span>
              </button>

              <a
                href="#manufacturing"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-brand-800 border border-brand-700/80 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold text-center hover:border-brand-400 transition-all flex items-center justify-center gap-2"
              >
                <span>View Loom Capabilities</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

