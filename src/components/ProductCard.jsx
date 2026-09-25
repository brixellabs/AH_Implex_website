/**
 * ==============================================================================
 * A&H IMPEX - PRODUCT CARD COMPONENT (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faLayerGroup,
  faBox,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import SafeImage from './SafeImage';

export default function ProductCard({ product, onSelectProduct }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-brand-500 transition-all duration-300"
    >
      <div>
        {/* Product Image Container with Badges */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
          <SafeImage
            src={product.image}
            fallbackSrc={product.fallbackImage}
            alt={product.title}
            className="w-full h-full"
            zoomOnHover={true}
          />

          {/* Subtle gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Top Badges Bar (Flex container preventing overlap) */}
          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            {/* Category Pill Tag */}
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-brand-900/90 backdrop-blur-md text-white border border-brand-500/30 shadow-md truncate max-w-[55%]">
              {product.categoryName}
            </span>

            {/* Product Badge */}
            {product.badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase bg-emerald-600 text-white shadow-md shrink-0">
                <FontAwesomeIcon icon={faStar} className="text-[9px]" aria-hidden="true" />
                <span>{product.badge}</span>
              </span>
            )}
          </div>

          {/* Quick specs pill overlay at bottom of photo */}
          <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-[11px] text-slate-100 bg-brand-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-brand-700/60 shadow">
            <span className="font-medium text-brand-200 truncate">
              {product.specs.composition || product.specs.capabilities}
            </span>
            <span className="text-white shrink-0 ml-2 font-mono font-bold">
              {product.specs.gsm || product.specs.threadCount}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight group-hover:text-brand-700 transition-colors line-clamp-1 font-serif">
            {product.title}
          </h3>

          <p className="text-xs uppercase tracking-wider text-brand-700 font-bold mt-1 mb-3 font-mono">
            {product.tagline}
          </p>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-normal">
            {product.description}
          </p>

          {/* Technical Specifications Matrix */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 mb-4 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span className="text-slate-500 flex items-center gap-1.5">
                <FontAwesomeIcon icon={faLayerGroup} className="text-brand-600 text-xs" aria-hidden="true" />
                Material / Weave:
              </span>
              <span className="font-semibold text-right truncate max-w-[160px] text-slate-900">
                {product.specs.composition || product.specs.weave || 'Custom Spec'}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="text-slate-500 flex items-center gap-1.5">
                <FontAwesomeIcon icon={faBox} className="text-brand-600 text-xs" aria-hidden="true" />
                MOQ / Lead Time:
              </span>
              <span className="font-bold text-emerald-700 text-right font-mono">
                {product.specs.moq}
              </span>
            </div>
          </div>

          {/* Key Product Highlight Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.features.slice(0, 2).map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-800 border border-brand-200/60"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onSelectProduct(product)}
          className="w-full py-3 px-4 rounded-xl bg-brand-50 hover:bg-gradient-to-r hover:from-blue-600 hover:via-brand-500 hover:to-brand-600 text-brand-700 hover:text-white font-bold text-xs uppercase tracking-wider border border-brand-200 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <span>Request Specifications &amp; Pricing</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}
