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
    <footer className="bg-brand-900 text-slate-300 border-t border-brand-800 pt-12 sm:pt-16 pb-10 sm:pb-12 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-brand-800">
          
          {/* Col 1: Brand & Heritage (spans 2 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3 sm:space-y-4">
            <a href="#" className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-brand-800 border border-brand-500/40 flex items-center justify-center shrink-0">
                <img src={logoImg} alt="A&H Impex Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
                  A<span className="font-sans font-semibold">&amp;</span>H <span className="text-brand-300 font-light">IMPEX</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-slate-400 font-medium">
                  Textile Manufacturer <span className="font-sans font-semibold">&amp;</span> Exporter
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-sm">
              Vertically integrated manufacturer <span className="font-sans font-semibold">&amp;</span> international exporter of luxury bed linens, hospitality institutional textiles, <span className="font-sans font-semibold">&amp;</span> export apparel. Operating European air-jet looms <span className="font-sans font-semibold">&amp;</span> strict AQL 1.5 standards.
            </p>

            {/* Social Media Channels */}
            <div className="pt-1 sm:pt-2">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-2 sm:mb-2.5 font-mono">
                Connect Across Platforms:
              </span>
              <div className="flex items-center space-x-2.5 sm:space-x-3">
                <a
                  href="https://www.linkedin.com/company/a-h-impex/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 hover:bg-[#0077b5] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-brand-700 hover:border-[#0077b5] hover:scale-105 shadow-sm"
                  title="LinkedIn Company Page"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="text-xs sm:text-sm" />
                </a>
                <a
                  href="https://www.instagram.com/a_h_impex/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 hover:bg-[#E1306C] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-brand-700 hover:border-[#E1306C] hover:scale-105 shadow-sm"
                  title="Instagram Official Gallery"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-xs sm:text-sm" />
                </a>
                <a
                  href="https://www.facebook.com/ahimpextextiles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 hover:bg-[#1877f2] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-brand-700 hover:border-[#1877f2] hover:scale-105 shadow-sm"
                  title="Facebook Page"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="text-xs sm:text-sm" />
                </a>
                <a
                  href={`https://wa.me/${info.contact?.whatsappClean || '923008660309'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-800 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-brand-700 hover:border-[#25D366] hover:scale-105 shadow-sm"
                  title="Direct WhatsApp Trade Desk"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xs sm:text-sm" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] sm:text-xs font-medium font-mono">
                <FontAwesomeIcon icon={faShieldHalved} className="text-xs" aria-hidden="true" />
                ISO 9001 <span className="font-sans font-semibold">&amp;</span> OEKO-TEX Standard 100
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4 font-serif">
              Company Overview
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-brand-300 transition-colors">
                  About A<span className="font-sans font-semibold">&amp;</span>H Impex
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
                  Compliance <span className="font-sans font-semibold">&amp;</span> Certifications
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4 font-serif">
              Export Collections
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Luxury Sateen <span className="font-sans font-semibold">&amp;</span> Percale Bedding
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Hotel <span className="font-sans font-semibold">&amp;</span> Resort White Linens
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Damask Jacquard Table Linens
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Export Chinos <span className="font-sans font-semibold">&amp;</span> Fleece Apparel
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-brand-300 transition-colors">
                  Custom OEM Greige <span className="font-sans font-semibold">&amp;</span> Dyed Fabrics
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 sm:mb-4 font-serif">
              Commercial Desk
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-brand-300 text-xs shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`mailto:${info.contact.email}`} className="hover:text-white transition-colors break-all font-mono">
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
                <div>
                  <span className="text-xs">{info.contact.address}</span>
                  <span className="block text-[10px] text-slate-500 font-light mt-0.5">{info.contact.addressNote}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 font-light">
          <p className="text-center sm:text-left">
            (c) {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-[10px] sm:text-[11px] text-center sm:text-left">
              Engineered for Global B2B Textile Export
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-brand-800 hover:bg-brand-700 text-slate-400 hover:text-brand-200 transition-colors border border-brand-700/60 flex items-center gap-1.5 shrink-0"
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

