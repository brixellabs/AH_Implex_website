/**
 * ==============================================================================
 * A&H IMPEX - FLOATING SOCIAL SPEED DIAL WIDGET (EXACT REFERENCE DESIGN)
 * ==============================================================================
 * Purpose: Interactive hover-expanding pill buttons for LinkedIn, Instagram,
 *          Facebook, and Direct WhatsApp Trade Desk.
 * ==============================================================================
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faInstagram,
  faFacebookF,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { useData } from '../context/DataContext';
import { COMPANY } from '../data/company';

export default function FloatingContactButtons() {
  const { companyInfo } = useData();
  const info = companyInfo || COMPANY;
  const whatsappNumber = info.contact?.whatsappClean || '923008660309';

  return (
    <aside
      aria-label="Official Social Media & Direct Trade Desk"
      className="fixed right-3 sm:right-4 bottom-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      <div id="socialSpeedDial" className="flex flex-col space-y-2.5 items-end transition-all duration-300">
        
        {/* 1. LinkedIn */}
        <a
          href="https://www.linkedin.com/company/a-h-impex/"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow A&H Impex on LinkedIn"
          className="group flex items-center bg-[#0077b5] text-white p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
            LinkedIn Company Page
          </span>
          <div className="w-5 h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faLinkedinIn} className="text-base" />
          </div>
        </a>

        {/* 2. Instagram */}
        <a
          href="https://www.instagram.com/a_h_impex/"
          target="_blank"
          rel="noopener noreferrer"
          title="A&H Impex Instagram Showroom"
          className="group flex items-center bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
            Instagram Showroom
          </span>
          <div className="w-5 h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faInstagram} className="text-base" />
          </div>
        </a>

        {/* 3. Facebook */}
        <a
          href="https://www.facebook.com/ahimpextextiles"
          target="_blank"
          rel="noopener noreferrer"
          title="A&H Impex Facebook Updates"
          className="group flex items-center bg-[#1877f2] text-white p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
            Facebook Updates
          </span>
          <div className="w-5 h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faFacebookF} className="text-base" />
          </div>
        </a>

        {/* 4. Direct WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20textile%20export%20orders.`}
          target="_blank"
          rel="noopener noreferrer"
          title="Direct WhatsApp Live Trade Desk"
          className="group flex items-center bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-2 ring-emerald-300"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2 font-mono">
            Live Trade Desk
          </span>
          <div className="w-6 h-6 flex items-center justify-center">
            <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
          </div>
        </a>

      </div>
    </aside>
  );
}
