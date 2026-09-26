/**
 * ==============================================================================
 * A&H IMPEX - FLOATING SOCIAL SPEED DIAL WIDGET (RESPONSIVE)
 * ==============================================================================
 * Purpose: Responsive floating social widget with compact mobile toggle and
 *          desktop expanding pill buttons.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faInstagram,
  faFacebookF,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import {
  faHeadset,
  faXmark,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import { useData } from '../context/DataContext';
import { COMPANY } from '../data/company';

export default function FloatingContactButtons() {
  const { companyInfo } = useData();
  const info = companyInfo || COMPANY;
  const whatsappNumber = info.contact?.whatsappClean || '923008660309';
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <aside
      aria-label="Official Social Media & Direct Trade Desk"
      className="fixed right-3 sm:right-5 bottom-4 sm:bottom-6 z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Mobile Pop-out Menu (when open) & Desktop Always Accessible Stack */}
      <div
        id="socialSpeedDial"
        className={`flex flex-col space-y-2 sm:space-y-2.5 items-end transition-all duration-300 ${
          isOpenMobile ? 'opacity-100 translate-y-0 pointer-events-auto mb-2' : 'hidden sm:flex'
        }`}
      >
        {/* 1. LinkedIn */}
        <a
          href="https://www.linkedin.com/company/a-h-impex/"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow A&H Impex on LinkedIn"
          className="group flex items-center bg-[#0077b5] text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
            LinkedIn Company Page
          </span>
          <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faLinkedinIn} className="text-sm sm:text-base" />
          </div>
        </a>

        {/* 2. Instagram */}
        <a
          href="https://www.instagram.com/a_h_impex/"
          target="_blank"
          rel="noopener noreferrer"
          title="A&H Impex Instagram Showroom"
          className="group flex items-center bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
            Instagram Showroom
          </span>
          <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faInstagram} className="text-sm sm:text-base" />
          </div>
        </a>

        {/* 3. Facebook */}
        <a
          href="https://www.facebook.com/ahimpextextiles"
          target="_blank"
          rel="noopener noreferrer"
          title="A&H Impex Facebook Updates"
          className="group flex items-center bg-[#1877f2] text-white p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
            Facebook Updates
          </span>
          <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
            <FontAwesomeIcon icon={faFacebookF} className="text-sm sm:text-base" />
          </div>
        </a>

        {/* 4. Direct WhatsApp Button (Desktop) */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20textile%20export%20orders.`}
          target="_blank"
          rel="noopener noreferrer"
          title="Direct WhatsApp Live Trade Desk"
          className="hidden sm:flex group items-center bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-2 ring-emerald-300"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-2 font-mono">
            Live Trade Desk
          </span>
          <div className="w-6 h-6 flex items-center justify-center">
            <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
          </div>
        </a>
      </div>

      {/* Mobile WhatsApp / Quick Action Floating Bubble */}
      <div className="sm:hidden flex items-center gap-2">
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20textile%20export%20orders.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Chat"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl ring-2 ring-emerald-300 active:scale-95"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
        </a>

        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          aria-label="Toggle Social Menu"
          className="w-9 h-9 rounded-full bg-brand-800 text-slate-200 border border-brand-600 flex items-center justify-center shadow-lg active:scale-95 text-xs"
        >
          <FontAwesomeIcon icon={isOpenMobile ? faXmark : faComments} />
        </button>
      </div>
    </aside>
  );
}

