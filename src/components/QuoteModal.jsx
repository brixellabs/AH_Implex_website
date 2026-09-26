/**
 * ==============================================================================
 * A&H IMPEX - TECHNICAL B2B REQUEST FOR QUOTE (RFQ) MODAL (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faPaperPlane,
  faCircleCheck,
  faShieldHalved,
  faFileInvoice
} from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import { COMPANY } from '../data/company';
import { useData } from '../context/DataContext';

export default function QuoteModal({ isOpen, onClose, initialData = {} }) {
  const { addInquiry, companyInfo } = useData();
  const info = companyInfo || COMPANY;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Home Textiles',
    productTitle: '',
    volume: '1,000 to 5,000 Units',
    port: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        category: initialData.categoryName || prev.category,
        productTitle: initialData.title || initialData.subject || '',
        notes: initialData.specs?.composition
          ? `Inquiring for: ${initialData.title} (${initialData.specs.composition}, MOQ: ${initialData.specs.moq})`
          : '',
      }));
    }
    if (isOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (addInquiry) {
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3500));
        await Promise.race([addInquiry(formData), timeoutPromise]);
      }
    } catch (err) {
      console.error("[QuoteModal Submission Error]", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#10B981', '#ffffff']
        });
      } catch {
        // confetti fallback
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfq-modal-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-brand-900 border border-brand-700/80 rounded-2xl p-5 sm:p-8 max-w-2xl w-full shadow-2xl relative my-4 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-lg bg-brand-800 text-slate-400 hover:text-white hover:bg-brand-700 transition-colors"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm sm:text-base" aria-hidden="true" />
        </button>

        {isSubmitted ? (
          <div className="py-8 sm:py-12 text-center flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 sm:mb-5 border border-emerald-500/30">
              <FontAwesomeIcon icon={faCircleCheck} className="text-2xl sm:text-4xl" aria-hidden="true" />
            </div>

            <h3 id="rfq-modal-title" className="text-xl sm:text-2xl font-bold text-white mb-2 font-serif">
              Request for Quote Received
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-4 sm:mb-6 leading-relaxed font-light">
              Thank you, <strong className="text-white">{formData.name || 'Valued Partner'}</strong>. Your commercial textile inquiry has been forwarded to our International Merchandising Desk at{' '}
              <strong className="text-brand-300 font-mono break-all">{info.contact.email}</strong>.
            </p>

            <div className="bg-brand-950/90 rounded-xl p-3.5 sm:p-4 border border-brand-700/60 text-xs text-slate-300 max-w-md w-full text-left mb-5 sm:mb-6 space-y-1.5 font-light">
              <p><strong className="text-slate-400 font-mono">Response Lead Time:</strong> Within 12-24 business hours</p>
              <p><strong className="text-slate-400 font-mono">Fast Track:</strong> WhatsApp: {info.contact.whatsapp}</p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all font-mono shimmer-sweep"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-800 border border-brand-500/30 text-brand-300 text-xs font-semibold w-fit mb-2.5 sm:mb-3 font-mono">
              <FontAwesomeIcon icon={faFileInvoice} className="text-xs" aria-hidden="true" />
              <span>International RFQ Desk</span>
            </div>

            <h3 id="rfq-modal-title" className="text-xl sm:text-2xl font-bold text-white mb-1 font-serif pr-8">
              Request a Formal Commercial Quote
            </h3>

            <p className="text-xs text-slate-300 mb-4 sm:mb-6 font-light">
              Please specify your target specifications, fabric construction, estimated volume, and destination port. Our export team responds within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Wright"
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-lg bg-brand-800 border border-brand-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Nordic Home Textiles Ltd"
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-lg bg-brand-800 border border-brand-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@company.com"
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-lg bg-brand-800 border border-brand-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7946 0912"
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-lg bg-brand-800 border border-brand-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Product Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-brand-800 border border-brand-700/60 text-white text-xs focus:outline-none focus:border-brand-400"
                  >
                    <option value="Home Textiles">Home Textiles</option>
                    <option value="Apparel & Garments">Apparel &amp; Garments</option>
                    <option value="Hospitality & Dining">Hospitality &amp; Dining</option>
                    <option value="OEM / Private Label">OEM &amp; Greige Fabric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target Volume
                  </label>
                  <select
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-brand-800 border border-brand-700/60 text-white text-xs focus:outline-none focus:border-brand-400"
                  >
                    <option value="Sample Order (Trial)">Sample Order / Lab Dips</option>
                    <option value="500 to 1,000 Units">500 to 1,000 Units</option>
                    <option value="1,000 to 5,000 Units">1,000 to 5,000 Units</option>
                    <option value="1x 20ft Container (FCL)">1x 20ft Container (FCL)</option>
                    <option value="1x 40ft High Cube Container">1x 40ft High Cube Container</option>
                    <option value="Multiple Recurring Containers">Multiple Recurring Containers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Destination Port / Country
                  </label>
                  <input
                    type="text"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    placeholder="e.g. Port of Rotterdam / USA"
                    className="w-full px-3.5 py-2 sm:py-2.5 rounded-lg bg-brand-800 border border-brand-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Technical Specifications, Yarn Counts &amp; Packaging Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention desired thread counts, GSM, cotton blends, Pantone colors, or custom private label requirements..."
                  className="w-full px-3.5 py-2 sm:py-2.5 rounded-lg bg-brand-800 border border-brand-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-brand-400"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <span className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5 font-light">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-emerald-400 text-xs shrink-0" aria-hidden="true" />
                  <span>Strict NDA &amp; commercial confidentiality honored</span>
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shimmer-sweep text-center disabled:opacity-70"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className={`text-xs ${isSubmitting ? 'animate-bounce' : ''}`} aria-hidden="true" />
                  <span>{isSubmitting ? 'Dispatching RFQ...' : 'Submit Technical RFQ'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}

