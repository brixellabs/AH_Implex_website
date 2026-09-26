/**
 * ==============================================================================
 * A&H IMPEX - CERTIFICATIONS & INTERNATIONAL STANDARDS SHOWCASE (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faCheck,
  faLock,
  faArrowUpRightFromSquare,
  faXmark,
  faFileInvoice,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';
import { CERTIFICATIONS } from '../data/certifications';

export default function CertificationSection({ onOpenQuoteModal }) {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-14 sm:py-20 lg:py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wider uppercase mb-2.5 sm:mb-3 font-mono">
            <FontAwesomeIcon icon={faShieldHalved} className="text-xs text-brand-600" aria-hidden="true" />
            <span>Audited Global Compliance</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight font-serif">
            Certifications and <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-blue-600">International Standards</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base mt-2 sm:mt-4 font-normal">
            Our vertical manufacturing processes strictly comply with globally recognized quality, chemical safety, and social accountability frameworks.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedCert(cert)}
              className="group bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-brand-500 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Brand accent top highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-500 group-hover:h-1.5 transition-all" />

              <div>
                {/* Header inside card */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                    <FontAwesomeIcon icon={faCertificate} className="text-lg sm:text-xl" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                    {cert.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight group-hover:text-brand-700 transition-colors mb-1 font-serif">
                  {cert.code}
                </h3>
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-brand-700 font-bold mb-2 sm:mb-3 font-mono">
                  {cert.title}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3 font-normal">
                  {cert.description}
                </p>

                {/* Scope */}
                <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200 mb-3 sm:mb-4 text-xs">
                  <span className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wider font-semibold block mb-0.5 font-mono">
                    Certified Scope:
                  </span>
                  <span className="text-slate-800 font-medium text-xs">{cert.scope}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faLock} className="text-brand-600 text-xs" aria-hidden="true" />
                  <span>Document on Request</span>
                </span>
                
                <span className="text-xs font-bold text-brand-700 group-hover:text-brand-600 flex items-center gap-1">
                  <span>View Details</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" aria-hidden="true" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Certificate Placement Notice */}
        <div className="mt-8 sm:mt-12 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-600 max-w-2xl mx-auto shadow-sm">
          <p>
            Official certificate scans and third-party audit reports (OEKO-TEX, ISO 9001:2015, BSCI, Sedex) are supplied to qualified commercial buyers upon formal Request for Quote (RFQ).
          </p>
        </div>

      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 max-w-xl w-full shadow-2xl relative text-slate-900 my-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-3 mb-3 sm:mb-4 pr-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faCertificate} className="text-lg sm:text-xl" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">{selectedCert.code}</h3>
                  <p className="text-[11px] sm:text-xs text-brand-700 uppercase tracking-wider font-bold font-mono">{selectedCert.title}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 font-normal">
                {selectedCert.description}
              </p>

              {/* Benefits */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
                <h4 className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5 sm:mb-2 font-mono">
                  Verified Audit Parameters:
                </h4>
                {selectedCert.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <FontAwesomeIcon icon={faCheck} className="text-emerald-600 text-xs shrink-0" aria-hidden="true" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Status Notice */}
              <div className="p-3 sm:p-3.5 rounded-lg bg-brand-50 border border-brand-200 text-xs text-brand-900 mb-4 sm:mb-6 flex items-start gap-2.5">
                <FontAwesomeIcon icon={faFileInvoice} className="text-brand-700 text-sm shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block font-bold">Ready for Client Certificate Document</strong>
                  <span className="text-slate-600 font-normal text-[11px] sm:text-xs">{selectedCert.statusText}. High-resolution PDF copy will be provided during formal contract onboarding.</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => {
                    const certName = selectedCert.code;
                    setSelectedCert(null);
                    onOpenQuoteModal({ subject: `Request Official Copy: ${certName}` });
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all shimmer-sweep text-center"
                >
                  Request Official Certificate Copy
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="py-2.5 sm:py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold text-center"
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

