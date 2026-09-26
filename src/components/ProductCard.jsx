/**
 * ==============================================================================
 * A&H IMPEX - PRODUCT CARD COMPONENT (CLEAN, PROFESSIONAL & SCANNABLE)
 * ==============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheck,
  faStar
} from '@fortawesome/free-solid-svg-icons';
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

  const composition = specs.composition || specs.weave || specs.capabilities || '100% Export Grade';
  const weightSpec = specs.threadCount || specs.gsm || specs.finish || 'Custom Weave';
  const moq = specs.moq || '500 Units';
  const leadTime = specs.leadTime || '25–35 Days';

  // Safe features parsing
  const featuresList = Array.isArray(product?.features)
    ? product.features
    : typeof product?.features === 'string'
      ? product.features.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean)
      : [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-brand-500 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        {/* Product Image Section */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
          <SafeImage
            src={displaySrc}
            fallbackSrc={fallbackImg}
            alt={product.title}
            className="w-full h-full object-cover"
            zoomOnHover={true}
          />

          {/* Top Badges Bar */}
          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            {product.categoryName && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#071830]/90 backdrop-blur-md text-white border border-white/20 shadow-md">
                {product.categoryName}
              </span>
            )}

            {product.badge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase bg-emerald-600 text-white shadow-md">
                <FontAwesomeIcon icon={faStar} className="text-[9px]" aria-hidden="true" />
                <span>{product.badge}</span>
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight group-hover:text-brand-700 transition-colors font-serif leading-snug min-h-[48px] line-clamp-2">
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed my-3 font-normal min-h-[38px]">
            {product.description || product.tagline}
          </p>

          {/* Key Specifications Grid - 2x2 Matrix */}
          <div className="grid grid-cols-2 gap-2.5 p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Material
              </span>
              <span className="text-xs font-bold text-slate-900 truncate mt-0.5" title={composition}>
                {composition}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Specs / Weight
              </span>
              <span className="text-xs font-bold text-slate-900 truncate mt-0.5" title={weightSpec}>
                {weightSpec}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Min. Order (MOQ)
              </span>
              <span className="text-xs font-bold text-emerald-700 font-mono truncate mt-0.5">
                {moq}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Lead Time
              </span>
              <span className="text-xs font-bold text-slate-800 truncate mt-0.5">
                {leadTime}
              </span>
            </div>
          </div>

          {/* Top 2 Feature Bullet Points */}
          {featuresList.length > 0 && (
            <ul className="space-y-1.5 mb-2 text-xs text-slate-700">
              {featuresList.slice(0, 2).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faCheck} className="text-emerald-600 text-[11px] shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 sm:p-6 pt-0">
        <button
          onClick={() => onSelectProduct(product)}
          className="w-full py-3 px-4 rounded-xl bg-[#071830] hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <span>Request Quote &amp; Specs</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

