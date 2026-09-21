/**
 * ==============================================================================
 * A&H IMPEX - MULTI-COLUMN CORPORATE FOOTER
 * ==============================================================================
 * Purpose: Grounding component providing full sitemap, product index, commercial
 *          contacts, verified standards list, and legal copyright.
 * 
 * Columns:
 * 1. Brand Identity & ISO/OEKO-TEX Accreditation badge.
 * 2. Company Overview Sitemap (About, Manufacturing, Quality, Certifications, Export).
 * 3. Export Collections Directory (Bedding, Apparel, Hospitality, OEM Fabrics).
 * 4. Commercial Desk Direct Contacts (Email, WhatsApp, Mill Address in Faisalabad).
 * 
 * Bottom Bar:
 * - Legal copyright notice and smooth back-to-top scroll trigger.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React from 'react';
import { Layers, ArrowUp, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY } from '../data/company';

export default function Footer({ onOpenQuoteModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-white/10 pt-16 pb-12 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Heritage (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/40 flex items-center justify-center text-gold-400">
                <Layers className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  A&amp;H <span className="text-gold-400 font-extrabold">IMPEX</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-400 font-medium">
                  Textile Manufacturer &amp; Exports
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-sm">
              Vertically integrated manufacturer and international exporter of luxury bed linens, hospitality institutional textiles, and export apparel. Operating European air-jet looms and strict AQL 1.5 standards.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium font-mono">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                ISO 9001 &amp; OEKO-TEX Standard 100
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
              Company Overview
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-gold-400 transition-colors">
                  About A&amp;H Impex
                </a>
              </li>
              <li>
                <a href="#manufacturing" className="hover:text-gold-400 transition-colors">
                  Air-Jet Weaving Facility
                </a>
              </li>
              <li>
                <a href="#quality" className="hover:text-gold-400 transition-colors">
                  6-Stage Quality Control
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-gold-400 transition-colors">
                  Compliance &amp; Certifications
                </a>
              </li>
              <li>
                <a href="#export" className="hover:text-gold-400 transition-colors">
                  Global Export Corridors
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="text-gold-400 hover:text-gold-300 font-semibold"
                >
                  Request Commercial RFQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Export Product Lines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
              Export Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#products" className="hover:text-gold-400 transition-colors">
                  Luxury Sateen &amp; Percale Bedding
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-gold-400 transition-colors">
                  Hotel &amp; Resort White Linens
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-gold-400 transition-colors">
                  Damask Jacquard Table Linens
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-gold-400 transition-colors">
                  Export Chinos &amp; Fleece Apparel
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-gold-400 transition-colors">
                  Custom OEM Greige &amp; Dyed Fabrics
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-gold-400 transition-colors">
                  Private Label Store-Ready Packaging
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Commercial Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-display">
              Commercial Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`mailto:${COMPANY.contact.email}`} className="hover:text-white transition-colors truncate font-mono">
                  {COMPANY.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`https://wa.me/${COMPANY.contact.whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-medium text-emerald-300 font-mono"
                >
                  {COMPANY.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {COMPANY.contact.address}
                  <span className="block text-[10px] text-slate-500 font-light">{COMPANY.contact.addressNote}</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <p>
            (c) {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[11px]">
              Engineered for Global B2B Textile Export
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-400 hover:text-gold-400 transition-colors border border-white/5 flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
