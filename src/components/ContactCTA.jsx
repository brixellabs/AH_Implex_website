/**
 * ==============================================================================
 * A&H IMPEX - COMMERCIAL CONTACT & RFQ CALL-TO-ACTION SECTION (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faClock,
  faArrowRight,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faInstagram,
  faFacebookF,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { useData } from '../context/DataContext';
import { COMPANY } from '../data/company';

export default function ContactCTA({ onOpenQuoteModal }) {
  const { companyInfo } = useData();
  const info = companyInfo || COMPANY;
  const whatsappNumber = info.contact?.whatsappClean || '923008660309';
  const whatsappFormatted = info.contact?.whatsapp || '+92 300 8660309';

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-24 bg-brand-900 relative overflow-hidden border-t border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card */}
        <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 border border-brand-700/60 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Company Contact */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-800/90 border border-brand-500/30 text-brand-300 text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 font-mono">
                <FontAwesomeIcon icon={faShieldHalved} className="text-xs" aria-hidden="true" />
                <span>Global Sourcing and Partnerships</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4 font-serif">
                Ready to Initiate Your Next{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white block sm:inline">Textile Production Run?</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 font-light max-w-xl">
                Partner with an accredited manufacturer committed to rigorous quality, certified eco-dyes, and prompt container shipments worldwide.
              </p>

              {/* Contact Details List */}
              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 border border-brand-500/30 text-brand-300 flex items-center justify-center shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faEnvelope} className="text-xs sm:text-sm" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-slate-400 text-[11px] sm:text-xs block font-mono">Official Export Desk:</span>
                    <a
                      href={`mailto:${info.contact.email}`}
                      className="font-bold text-white hover:text-brand-300 transition-colors font-mono text-xs sm:text-sm break-all"
                    >
                      {info.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faPhone} className="text-xs sm:text-sm" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-slate-400 text-[11px] sm:text-xs block font-mono">Commercial WhatsApp Line:</span>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20textile%20export%20orders.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors font-mono text-xs sm:text-sm"
                    >
                      {whatsappFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 border border-brand-500/30 text-brand-300 flex items-center justify-center shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faLocationDot} className="text-xs sm:text-sm" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] sm:text-xs block font-mono">Mill and Head Office:</span>
                    <span className="text-white font-medium text-xs sm:text-sm">{info.contact.address}</span>
                    <span className="text-slate-400 text-[10px] sm:text-[11px] block mt-0.5 font-light">{info.contact.addressNote}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 border border-brand-500/30 text-brand-300 flex items-center justify-center shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faClock} className="text-xs sm:text-sm" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] sm:text-xs block font-mono">Operating Business Hours:</span>
                    <span className="text-white font-medium font-mono text-xs sm:text-sm">{info.contact.workingHours || COMPANY.contact.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Action Buttons Card */}
            <div className="lg:col-span-5 bg-brand-800/90 rounded-2xl p-5 sm:p-8 border border-brand-700/60 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 font-serif">
                  Direct Inquiries and Quotations
                </h3>
                <p className="text-xs text-slate-300 font-light mb-4 sm:mb-6">
                  Select your preferred channel to receive fabric swatches, technical lab dip approvals, or container volume quotations.
                </p>

                <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
                  <button
                    onClick={() => onOpenQuoteModal()}
                    className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shimmer-sweep text-center"
                  >
                    <span>Request Full RFQ Quotation</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden="true" />
                  </button>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hello%20A%26H%20Impex,%20I%20am%20interested%20in%20an%20export%20quotation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-400 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-sm" aria-hidden="true" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>

                  <a
                    href={`mailto:${info.contact.email}?subject=Textile%20Export%20Inquiry%20-%20A%26H%20Impex`}
                    className="w-full py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-brand-800 hover:bg-brand-700 text-slate-300 hover:text-white border border-brand-700/80 font-medium text-xs flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="text-brand-300 text-xs" aria-hidden="true" />
                    <span>Email Purchase Order (PO)</span>
                  </a>
                </div>

                {/* Quick Social Channels Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-brand-950/90 border border-brand-700/60 space-y-2 sm:space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                      Official Social Channels:
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400">Direct InMail / DMs</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Chat on WhatsApp"
                      className="p-2 sm:p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd59] hover:scale-105 transition-all shadow-md flex items-center justify-center flex-1"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/a-h-impex/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Connect on LinkedIn"
                      className="p-2 sm:p-2.5 rounded-xl bg-[#0077b5] text-white hover:bg-[#006097] hover:scale-105 transition-all shadow-md flex items-center justify-center flex-1"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
                    </a>
                    <a
                      href="https://www.instagram.com/a_h_impex/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Message on Instagram"
                      className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:opacity-90 hover:scale-105 transition-all shadow-md flex items-center justify-center flex-1"
                    >
                      <FontAwesomeIcon icon={faInstagram} className="text-sm" />
                    </a>
                    <a
                      href="https://www.facebook.com/ahimpextextiles"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Message on Facebook"
                      className="p-2 sm:p-2.5 rounded-xl bg-[#1877f2] text-white hover:bg-[#1464cc] hover:scale-105 transition-all shadow-md flex items-center justify-center flex-1"
                    >
                      <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
                    </a>
                  </div>
                </div>

              </div>

              <div className="pt-3 sm:pt-4 border-t border-brand-700/60 text-center mt-3 sm:mt-4">
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-light">
                  {info.contact?.emergencyNotice || COMPANY.contact.emergencyNotice}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

