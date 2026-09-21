/**
 * ==============================================================================
 * A&H IMPEX - CERTIFICATIONS & INTERNATIONAL STANDARDS SHOWCASE
 * ==============================================================================
 * Purpose: Dedicated section demonstrating compliance with ISO, OEKO-TEX, BSCI,
 *          Sedex, and GOTS standards for commercial and retail buyers.
 * 
 * Content Safety Protocol:
 * - Strictly zero simulated certificate numbers, fake signatures, or fabricated dates.
 * - Each card displays clear placeholder status: "Official Document on Request".
 * - Clicking any card opens a verification details sheet with an instant RFQ trigger.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Check,
  Lock,
  ExternalLink,
  X,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/certifications';

export default function CertificationSection({ onOpenQuoteModal }) {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Audited Global Compliance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
            Certifications &amp; <span className="gold-gradient-text">International Standards</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-4 font-light">
            Our vertical manufacturing processes strictly comply with globally recognized quality, chemical safety, and social accountability frameworks.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedCert(cert)}
              className="group glass-card glass-card-hover rounded-2xl p-7 border border-white/10 shadow-xl flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Gold accent top highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/40 via-gold-500 to-emerald-500/40 group-hover:h-1.5 transition-all" />

              <div>
                {/* Header inside card */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-850 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 group-hover:border-gold-400 transition-all shadow-md">
                    <BadgeCheck className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    {cert.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-gold-300 transition-colors mb-1 font-display">
                  {cert.code}
                </h3>
                <p className="text-xs uppercase tracking-wider text-gold-500/90 font-medium mb-3 font-mono">
                  {cert.title}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6 line-clamp-3">
                  {cert.description}
                </p>

                {/* Scope */}
                <div className="bg-navy-900/80 rounded-xl p-3 border border-white/5 mb-4 text-xs">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block mb-0.5 font-mono">
                    Certified Scope:
                  </span>
                  <span className="text-slate-200 font-medium">{cert.scope}</span>
                </div>
              </div>

              {/* Card Footer: Placeholder Document Status */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-light">
                  <Lock className="w-3.5 h-3.5 text-gold-400/80" aria-hidden="true" />
                  <span>Document on Request</span>
                </span>
                
                <span className="text-xs font-bold text-gold-400 group-hover:text-gold-300 flex items-center gap-1">
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Certificate Placement Notice */}
        <div className="mt-12 p-4 rounded-xl bg-navy-900/60 border border-white/10 text-center text-xs text-slate-400 max-w-2xl mx-auto font-light">
          <p>
            Official certificate scans and third-party audit reports (OEKO-TEX, ISO 9001:2015, BSCI, Sedex) are supplied to qualified commercial buyers upon formal Request for Quote (RFQ).
          </p>
        </div>

      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-navy-900 border border-white/20 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-navy-800 text-slate-400 hover:text-white hover:bg-navy-750 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
                  <BadgeCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">{selectedCert.code}</h3>
                  <p className="text-xs text-gold-400 uppercase tracking-wider font-semibold font-mono">{selectedCert.title}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                {selectedCert.description}
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6 bg-navy-950/70 p-4 rounded-xl border border-white/5">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 font-mono">
                  Verified Audit Parameters:
                </h4>
                {selectedCert.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span className="font-light">{b}</span>
                  </div>
                ))}
              </div>

              {/* Status Notice */}
              <div className="p-3.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-xs text-gold-300 mb-6 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block font-semibold">Ready for Client Certificate Document</strong>
                  <span className="font-light">{selectedCert.statusText}. High-resolution PDF copy will be provided during formal contract onboarding.</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const certName = selectedCert.code;
                    setSelectedCert(null);
                    onOpenQuoteModal({ subject: `Request Official Copy: ${certName}` });
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all"
                >
                  Request Official Certificate Copy
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="py-3 px-4 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
