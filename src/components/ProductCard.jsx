/**
 * ==============================================================================
 * A&H IMPEX - PRODUCT CARD COMPONENT (MINIMAL, CLEAN & PROFESSIONAL)
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SafeImage from './SafeImage';
import { getProductFallbackImage } from '../data/products';

export default function ProductCard({ product, onSelectProduct }) {
  const fallbackImg = getProductFallbackImage(product);
  const displaySrc = product?.image || fallbackImg;

  // Safe specs parsing
  let specs = {};
  if (typeof product?.specs === 'object' && product?.specs !== null) {
    specs = product.specs;
  } else if (typeof product?.specs === 'string') {
    try {
      specs = JSON.parse(product.specs);
    } catch {
      specs = { composition: product.specs };
    }
  }

  const material = specs.composition || specs.weave || specs.capabilities || '100% Export Grade';
  const weight = specs.threadCount || specs.gsm || '';
  const moq = specs.moq || '500 Units';

  const displayTitle = (product?.title || '').replace(/\s+and\s+/gi, ' & ');
  const displayCategory = (product?.categoryName || product?.category_name || '').replace(/\s+and\s+/gi, ' & ');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-brand-500 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        {/* Product Image */}
        <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
          <SafeImage
            src={displaySrc}
            fallbackSrc={fallbackImg}
            alt={displayTitle}
            className="w-full h-full object-cover"
            zoomOnHover={true}
          />

          {/* Clean Category Badge */}
          {displayCategory && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#071830]/90 text-white backdrop-blur-md border border-white/10 shadow-sm">
                {displayCategory}
              </span>
            </div>
          )}
        </div>

        {/* Card Content - Clean, simple, easy to read */}
        <div className="p-5">
          {/* Title - Full Product Name without truncation, Crisp Modern Font with Clean Ampersand */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors font-sans leading-snug mb-2 min-h-[52px] flex items-center">
            {displayTitle}
          </h3>

          {/* 1-Line Clean Material & Specs */}
          <p className="text-xs text-slate-600 font-medium line-clamp-1 mb-4">
            {material} {weight ? `• ${weight}` : ''}
          </p>

          {/* Minimal Key Info: MOQ */}
          <div className="flex items-center justify-between text-xs py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 font-medium">Min. Order (MOQ):</span>
            <span className="font-bold text-emerald-700 font-mono">{moq}</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onSelectProduct(product)}
          className="w-full py-2.5 px-4 rounded-xl bg-[#071830] hover:bg-brand-600 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <span>Request Quote</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

