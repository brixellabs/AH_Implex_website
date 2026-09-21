/**
 * ==============================================================================
 * A&H IMPEX - TOP ANNOUNCEMENT & TRUST BAR
 * ==============================================================================
 * Purpose: Topmost sticky utility bar establishing immediate export credibility,
 *          international compliance status, and direct buyer communication channels.
 * 
 * Architecture:
 * - Direct contact triggers (email, WhatsApp desk) using genuine business data.
 * - Semantic HTML with accessible anchors and screen-reader considerations.
 * - Zero emojis; clean Lucide SVG iconography.
 * ==============================================================================
 */

import React from 'react';
import { Mail, Phone, Globe, ShieldCheck } from 'lucide-react';
import { COMPANY } from '../data/company';

export default function TopBar() {
  return (
    <aside
      aria-label="Export Notice & Direct Commercial Contact"
      className="bg-navy-950/98 border-b border-white/5 text-xs text-slate-300 py-2 px-4 sm:px-6 lg:px-8 relative z-50 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Global export accreditation badge */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            Export Certified Mill
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
            Supplying Importers &amp; Retailers Across EU, USA, UK &amp; Middle East
          </span>
        </div>

        {/* Right: Verified Direct Contact Desk */}
        <div className="flex items-center gap-4 text-slate-300">
          <a
            href={`mailto:${COMPANY.contact.email}`}
            className="hover:text-gold-400 transition-colors flex items-center gap-1.5"
            title="Email Export Department"
          >
            <Mail className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
            <span className="hidden sm:inline">{COMPANY.contact.email}</span>
            <span className="sm:hidden">Email Desk</span>
          </a>
          <span className="hidden sm:inline text-white/10">|</span>
          <a
            href={`https://wa.me/${COMPANY.contact.whatsappClean}?text=Hello%20A%26H%20Impex,%20I%20am%20interested%20in%20an%20export%20inquiry`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-emerald-400 font-medium"
            title="Chat on WhatsApp"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Export Desk: {COMPANY.contact.phone}</span>
          </a>
          <span className="hidden lg:inline text-white/10">|</span>
          <span className="hidden lg:inline text-[11px] text-slate-400 font-mono">
            {COMPANY.contact.workingHours}
          </span>
        </div>
      </div>
    </aside>
  );
}
