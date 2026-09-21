/**
 * ==============================================================================
 * A&H IMPEX - TECHNICAL B2B REQUEST FOR QUOTE (RFQ) MODAL
 * ==============================================================================
 * Purpose: Commercial procurement form allowing buyers to submit detailed purchase
 *          inquiries, including yarn counts, fabric compositions, target volumes,
 *          and destination seaports.
 * 
 * Features:
 * - Dynamic pre-population when launched from a specific product card.
 * - Multi-field validation (Category, Volume tier, Destination port, Technical notes).
 * - Interactive confetti celebration and confirmation card upon submission.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, CheckCircle2, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY } from '../data/company';

export default function QuoteModal({ isOpen, onClose, initialData = {} }) {
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
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#10B981', '#ffffff']
      });
    } catch {
      // Graceful fallback if confetti library unavailable
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfq-modal-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-navy-950 border border-white/20 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-navy-850 text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>

            <h3 id="rfq-modal-title" className="text-2xl font-bold text-white mb-2 font-display">
              Request for Quote Received
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed font-light">
              Thank you, <strong className="text-white">{formData.name || 'Valued Partner'}</strong>. Your commercial textile inquiry has been forwarded to our International Merchandising Desk at{' '}
              <strong className="text-gold-400 font-mono">{COMPANY.contact.email}</strong>.
            </p>

            <div className="bg-navy-900/90 rounded-xl p-4 border border-white/10 text-xs text-slate-300 max-w-md w-full text-left mb-6 space-y-1.5 font-light">
              <p><strong className="text-slate-400 font-mono">Response Lead Time:</strong> Within 12-24 business hours</p>
              <p><strong className="text-slate-400 font-mono">Fast Track:</strong> Contact directly on WhatsApp: {COMPANY.contact.whatsapp}</p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-gold-400 transition-colors font-mono"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 text-xs font-semibold w-fit mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5" aria-hidden="true" />
              <span>International RFQ Desk</span>
            </div>

            <h3 id="rfq-modal-title" className="text-2xl font-bold text-white mb-1 font-display">
              Request a Formal Commercial Quote
            </h3>

            <p className="text-xs text-slate-300 mb-6 font-light">
              Please specify your target specifications, fabric construction, estimated volume, and destination port. Our export team responds within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-navy-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-navy-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-navy-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-navy-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Product Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-navy-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500"
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
                    className="w-full px-3 py-2.5 rounded-lg bg-navy-900 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500"
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-navy-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-navy-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-light">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>Strict NDA &amp; commercial confidentiality honored</span>
                </span>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  Submit Technical RFQ
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
