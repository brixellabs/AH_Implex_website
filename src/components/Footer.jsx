/**
 * ==============================================================================
 * A&H IMPEX - MULTI-COLUMN CORPORATE FOOTER (FONTAWESOME ICONS)
 * ==============================================================================
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLayerGroup,
  faArrowUp,
  faEnvelope,
  faPhone,
  faLocationDot,
  faShieldHalved,
  faGauge
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faInstagram,
  faFacebookF,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { COMPANY } from '../data/company';
import { useData } from '../context/DataContext';
import logoImg from '../assets/logo.jpeg';

export default function Footer({ onOpenQuoteModal, onOpenAdmin }) {
  const { companyInfo } = useData();
  const info = companyInfo || COMPANY;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-900 text-slate-300 border-t border-brand-800 pt-16 pb-12 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-800">
          
          {/* Col 1: Brand & Heritage (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-brand-800 border border-brand-500/40 flex items-center justify-center">
                <img src={logoImg} alt="A&H Impex Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  A&amp;H <span className="text-brand-300 font-light">IMPEX</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-400 font-medium">
                  Textile Manufacturer &amp; Exports
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-sm">
              Vertically integrated manufacturer and international exporter of luxury bed linens, hospitality institutional textiles, and export apparel. Operating European air-jet looms and strict AQL 1.5 standards.
            </p>

            {/* Social Media Channels (Reference Design Match) */}
            <div className="pt-2">
              <span className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-2.5 font-mono">
                Connect Across Platforms:
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.linkedin.com/company/ah-impex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-brand-800 hover:bg-[#0077b5] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-brand-700 hover:border-[#0077b5] hover:scale-105 shadow-sm"
                  title="LinkedIn Company Page"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
                </a>
                <a
                  href="https://www.instagram.com/ahimpextextiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-brand-800 hover:bg-[#E1306C] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-brand-700 hover:border-[#E1306C] hover:scale-105 shadow-sm"
                  title="Instagram Official Gallery"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-sm" />
                </a>
                <a
                  href="https://www.facebook.com/ahimpextextiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-brand-800 hover:bg-[#1877f2] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-brand-700 hover:border-[#1877f2] hover:scale-105 shadow-sm"
                  title="Facebook Page"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
                </a>
                <a
                  href={`https://wa.me/${info.contact?.whatsappClean || '923008661234'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-brand-800 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-brand-700 hover:border-[#25D366] hover:scale-105 shadow-sm"
                  title="Direct WhatsApp Trade Desk"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium font-mono">
                <FontAwesomeIcon icon={faShieldHalved} className="text-xs" aria-hidden="true" />
                ISO 9001 &amp; OEKO-TEX Standard 100
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-serif">
              Company Overview
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-brand-300 transition-colors">
                  About A&amp;H Impex
                </a>
              </li>
              <li>
                <a href="#manufacturing" className="hover:text-brand-300 transition-colors">
                  Air-Jet Weaving Facility
                </a>
              </li>
              <li>
                <a href="#quality" className="hover:text-brand-300 transition-colors">
                  6-Stage Quality Control
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-brand-300 transition-colors">
                  Compliance &amp; Certifications
                </a>
              </li>
              <li>
                <a href="#export" className="hover:text-brand-300 transition-colors">
                  Global Export Corridors
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="text-brand-300 hover:text-white font-semibold"
                >
                  Request Commercial RFQ
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 text-xs"
                    title="Authorized Staff Portal"
                  >
                    <FontAwesomeIcon icon={faShieldHalved} className="text-[10px] text-slate-500" />
                    <span>Staff Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Export Product Lines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-serif">
              Export Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Luxury Sateen &amp; Percale Bedding
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Hotel &amp; Resort White Linens
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Damask Jacquard Table Linens
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Export Chinos &amp; Fleece Apparel
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Custom OEM Greige &amp; Dyed Fabrics
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Private Label Store-Ready Packaging
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Commercial Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-serif">
              Commercial Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-brand-300 text-xs shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`mailto:${info.contact.email}`} className="hover:text-white transition-colors truncate font-mono">
                  {info.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faPhone} className="text-emerald-400 text-xs shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`https://wa.me/${info.contact.whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-medium text-emerald-300 font-mono"
                >
                  {info.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faLocationDot} className="text-brand-300 text-xs shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {info.contact.address}
                  <span className="block text-[10px] text-slate-500 font-light">{info.contact.addressNote}</span>
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
              className="p-2 rounded-lg bg-brand-800 hover:bg-brand-700 text-slate-400 hover:text-brand-200 transition-colors border border-brand-700/60 flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <FontAwesomeIcon icon={faArrowUp} className="text-xs" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
