/**
 * ==============================================================================
 * A&H IMPEX - PRODUCT CARD COMPONENT
 * ==============================================================================
 * Purpose: Highly visual export catalog card presenting high-res textile photography,
 *          technical yarn/weave specs, MOQ thresholds, and RFQ trigger.
 * 
 * Design Features:
 * - Large photography with subtle scale-up on hover (scale 1.00 -> 1.05).
 * - Category pill badge and flagship export tags.
 * - Technical specifications matrix (Composition, Thread Count/GSM, MOQ).
 * - CTA button initiating RFQ modal pre-filled with this product's data.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Package, Sparkles } from 'lucide-react';
import SafeImage from './SafeImage';

export default function ProductCard({ product, onSelectProduct }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group glass-card glass-card-hover rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between shadow-xl"
    >
      <div>
        {/* Product Image Container with Badges */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-navy-900">
          <SafeImage
            src={product.image}
            fallbackSrc={product.fallbackImage}
            alt={product.title}
            className="w-full h-full"
            zoomOnHover={true}
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />

          {/* Category Pill Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-navy-950/80 backdrop-blur-md text-gold-300 border border-gold-500/30 shadow-md">
              {product.categoryName}
            </span>
          </div>

          {/* Product Badge */}
          {product.badge && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-500/90 text-navy-950 shadow-md">
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                {product.badge}
              </span>
            </div>
          )}

          {/* Quick specs pill overlay at bottom of photo */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-slate-200 bg-navy-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <span className="font-medium text-gold-300 truncate">
              {product.specs.composition || product.specs.capabilities}
            </span>
            <span className="text-slate-400 shrink-0 ml-2 font-mono">
              {product.specs.gsm || product.specs.threadCount}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-gold-300 transition-colors line-clamp-1 font-display">
            {product.title}
          </h3>

          <p className="text-xs uppercase tracking-wider text-gold-500/90 font-medium mt-1 mb-3 font-mono">
            {product.tagline}
          </p>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2 font-light">
            {product.description}
          </p>

          {/* Technical Specifications Matrix */}
          <div className="bg-navy-900/80 rounded-xl p-3.5 border border-white/5 space-y-2 mb-4 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                Material / Weave:
              </span>
              <span className="font-medium text-right truncate max-w-[160px] text-white">
                {product.specs.composition || product.specs.weave || 'Custom Spec'}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                MOQ / Lead Time:
              </span>
              <span className="font-semibold text-emerald-400 text-right font-mono">
                {product.specs.moq}
              </span>
            </div>
          </div>

          {/* Key Product Highlight Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.features.slice(0, 2).map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5"
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
          className="w-full py-3 px-4 rounded-xl bg-navy-900 group-hover:bg-gradient-to-r group-hover:from-gold-500 group-hover:to-gold-600 text-slate-200 group-hover:text-navy-950 font-bold text-xs uppercase tracking-wider border border-white/10 group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-lg"
        >
          <span>Request Specifications &amp; Pricing</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}
