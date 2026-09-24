/**
 * ==============================================================================
 * A&H IMPEX - TOP ANNOUNCEMENT & SOCIAL CHANNELS BAR (EXACT REFERENCE DESIGN)
 * ==============================================================================
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faInstagram,
  faFacebookF,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { useData } from '../context/DataContext';
import { COMPANY } from '../data/company';

export default function TopBar() {
  const { companyInfo } = useData();
  const info = companyInfo || COMPANY;
  const whatsappNumber = info.contact?.whatsappClean || '923008661234';
  const phoneFormatted = info.contact?.phone || '+92 300 8661234';

  return (
    <aside
      aria-label="Export Notice & Direct Commercial Contact"
      className="bg-brand-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 tracking-wide relative z-50 select-none"
    >
      <div className="w-full flex flex-wrap justify-between items-center gap-2">
        
        {/* Left: Export Capacity & Accreditation */}
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
            OEM / ODM Export Capacity Available: Q3 &amp; Q4
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">
            <FontAwesomeIcon icon={faShieldHalved} className="text-gold-400 mr-1.5 text-xs" />
            ISO 9001:2015 &amp; OEKO-TEX Standard 100 Certified
          </span>
        </div>

        {/* Right: Quick Social Channels & Direct Contact Desk */}
        <div className="flex items-center space-x-4 sm:space-x-5 text-slate-300">
          {/* Social Media Quick Links in Top Bar */}
          <div className="flex items-center space-x-3 border-r border-brand-800 pr-4">
            <span className="hidden sm:inline text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Official Channels:
            </span>
            <a
              href="https://www.linkedin.com/company/ah-impex"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow A&H Impex on LinkedIn"
              className="text-slate-300 hover:text-white transition-transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="text-xs text-[#0077b5]" />
            </a>
            <a
              href="https://www.instagram.com/ahimpextextiles"
              target="_blank"
              rel="noopener noreferrer"
              title="A&H Impex Instagram Catalog"
              className="text-slate-300 hover:text-white transition-transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-xs text-[#E1306C]" />
            </a>
            <a
              href="https://www.facebook.com/ahimpextextiles"
              target="_blank"
              rel="noopener noreferrer"
              title="A&H Impex Facebook Page"
              className="text-slate-300 hover:text-white transition-transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faFacebookF} className="text-xs text-[#1877f2]" />
            </a>
          </div>

          {/* Email */}
          <a
            href={`mailto:${info.contact.email}`}
            className="hover:text-white transition flex items-center"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-1.5 text-brand-300 text-xs" />
            <span className="hidden sm:inline">{info.contact.email}</span>
            <span className="sm:hidden">Email</span>
          </a>

          <span className="hidden sm:inline text-slate-500">|</span>

          {/* WhatsApp Export Desk */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center text-emerald-400 font-semibold"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="mr-1.5 text-xs text-emerald-400" />
            <span className="hidden sm:inline">Export Desk: {phoneFormatted}</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>

      </div>
    </aside>
  );
}
