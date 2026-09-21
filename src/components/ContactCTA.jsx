/**
 * ==============================================================================
 * A&H IMPEX - COMMERCIAL CONTACT & RFQ CALL-TO-ACTION SECTION
 * ==============================================================================
 * Purpose: High-converting conversion section positioned immediately prior to the footer,
 *          providing buyers multiple streamlined avenues to request volume pricing.
 * 
 * Features:
 * - Direct contact cards (Official Export Email, WhatsApp line, Head Office address).
 * - Multi-action CTA buttons triggering the interactive RFQ modal or WhatsApp session.
 * - Mill & Head Office location verified in Faisalabad, Punjab, Pakistan.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY } from '../data/company';

export default function ContactCTA({ onOpenQuoteModal }) {
  return (
    <section id="contact" className="py-24 bg-navy-950 relative overflow-hidden border-t border-white/5">
      {/* Ambient background weave pattern */}
      <div className="absolute inset-0 bg-fabric-weave opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Company Contact */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Global Sourcing &amp; Commercial Partnerships</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-display">
                Ready to Initiate Your Next{' '}
                <span className="gold-gradient-text">Textile Production Run?</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-light max-w-xl">
                Partner with an accredited manufacturer committed to rigorous quality, certified eco-dyes, and prompt container shipments worldwide.
              </p>

              {/* Contact Details List */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-navy-850 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block font-mono">Official Export Desk:</span>
                    <a
                      href={`mailto:${COMPANY.contact.email}`}
                      className="font-bold text-white hover:text-gold-400 transition-colors font-mono"
                    >
                      {COMPANY.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-navy-850 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block font-mono">Commercial WhatsApp Line:</span>
                    <a
                      href={`https://wa.me/${COMPANY.contact.whatsappClean}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20textile%20export%20orders.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
                    >
                      {COMPANY.contact.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-navy-850 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block font-mono">Mill &amp; Head Office:</span>
                    <span className="text-white font-medium">{COMPANY.contact.address}</span>
                    <span className="text-slate-500 text-[11px] block mt-0.5 font-light">{COMPANY.contact.addressNote}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-navy-850 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block font-mono">Operating Business Hours:</span>
                    <span className="text-white font-medium font-mono">{COMPANY.contact.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Action Buttons Card */}
            <div className="lg:col-span-5 bg-navy-900/90 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  Direct Inquiries &amp; Quotations
                </h3>
                <p className="text-xs text-slate-300 font-light mb-6">
                  Select your preferred channel to receive fabric swatches, technical lab dip approvals, or container volume quotations.
                </p>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => onOpenQuoteModal()}
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                  >
                    <span>Request Full RFQ Quotation</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY.contact.whatsappClean}?text=Hello%20A%26H%20Impex,%20I%20am%20interested%20in%20an%20export%20quotation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY.contact.email}?subject=Textile%20Export%20Inquiry%20-%20A%26H%20Impex`}
                    className="w-full py-3 px-5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-white/10 font-medium text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                    <span>Email Formal Purchase Order (PO)</span>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-center">
                <span className="text-[11px] text-slate-400 font-light">
                  {COMPANY.contact.emergencyNotice}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
