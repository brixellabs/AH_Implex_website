/**
 * ==============================================================================
 * A&H IMPEX - SOCIAL MEDIA & DIRECT CHANNELS (EXACT REFERENCE DESIGN)
 * ==============================================================================
 * Purpose: Dedicated interactive social media hub featuring LinkedIn, Instagram,
 *          Facebook, and Direct WhatsApp trade desk cards with exact brand buttons.
 * ==============================================================================
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faShareNodes
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faInstagram,
  faFacebookF,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { useData } from '../context/DataContext';
import { COMPANY } from '../data/company';

export default function SocialSection() {
  const { companyInfo } = useData();
  const info = companyInfo || COMPANY;
  const whatsappNumber = info.contact?.whatsappClean || '923008660309';
  const whatsappFormatted = info.contact?.whatsapp || '+92 300 8660309';

  const socialCards = [
    {
      id: 'linkedin',
      name: 'LinkedIn Corporate Page',
      platform: 'B2B Trade Network',
      handle: '@ah-impex • Sourcing',
      description: 'Connect with our Director of Export, supply chain merchandisers, and procurement team for official corporate updates.',
      bullets: [
        'Monthly Export Dispatch Reports',
        'OEKO-TEX & BSCI Audits',
        'Direct InMail to Trade Officers'
      ],
      btnText: 'Follow on LinkedIn',
      btnClass: 'bg-[#0077b5] hover:bg-[#006097] text-white',
      iconContainer: 'bg-[#0077b5]/10 text-[#0077b5]',
      badgeClass: 'text-[#0077b5] bg-blue-50 border-blue-200',
      borderHover: 'hover:border-[#0077b5]',
      url: 'https://www.linkedin.com/company/a-h-impex/',
      icon: faLinkedinIn
    },
    {
      id: 'instagram',
      name: 'Instagram Gallery',
      platform: 'Visual Catalog',
      handle: '@a_h_impex • Mill Reels',
      description: 'Explore reels showing our airjet looms, continuous dyeing processes, custom embroidery, and close-up fabric texture swatches.',
      bullets: [
        'Close-up TC Weave Textures',
        'Track Suit & Chino Fittings',
        'Fast DM for Sample Kits'
      ],
      btnText: 'Follow on Instagram',
      btnClass: 'bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:opacity-95 text-white',
      iconContainer: 'bg-gradient-to-tr from-[#f58529]/15 via-[#dd2a7b]/15 to-[#8134af]/15 text-[#E1306C]',
      badgeClass: 'text-[#E1306C] bg-pink-50 border-pink-200',
      borderHover: 'hover:border-[#E1306C]',
      url: 'https://www.instagram.com/a_h_impex/',
      icon: faInstagram
    },
    {
      id: 'facebook',
      name: 'Facebook Page',
      platform: 'Community and Reviews',
      handle: '@ahimpextextiles • Catalog',
      description: 'Review buyer feedback, view photo albums of finished consignments for retailers, and message trade reps directly.',
      bullets: [
        'Live Messenger Support',
        'Verified Client Ratings',
        'New Season Color Palettes'
      ],
      btnText: 'Visit Facebook Page',
      btnClass: 'bg-[#1877f2] hover:bg-[#1464cc] text-white',
      iconContainer: 'bg-[#1877f2]/10 text-[#1877f2]',
      badgeClass: 'text-[#1877f2] bg-blue-50 border-blue-200',
      borderHover: 'hover:border-[#1877f2]',
      url: 'https://www.facebook.com/ahimpextextiles',
      icon: faFacebookF
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Trade Desk',
      platform: 'Instant Desk',
      handle: `${whatsappFormatted}`,
      description: 'Connect directly with senior international merchandising team for fast-track swatches, container pricing, and lead times.',
      bullets: [
        'Instant Volume Costing',
        'Fabric Swatch Tracking',
        'Loom Scheduling Updates'
      ],
      btnText: 'Start WhatsApp Chat',
      btnClass: 'bg-[#25D366] hover:bg-[#1ebd59] text-white',
      iconContainer: 'bg-[#25D366]/15 text-[#25D366]',
      badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      borderHover: 'hover:border-[#25D366]',
      url: `https://wa.me/${whatsappNumber}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20textile%20export%20orders.`,
      icon: faWhatsapp
    }
  ];

  return (
    <section id="social-hub" className="py-14 sm:py-20 bg-gradient-to-b from-white to-slate-100 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-widest uppercase mb-2.5 sm:mb-3 font-mono">
            <FontAwesomeIcon icon={faShareNodes} className="text-xs text-brand-600" />
            <span>Real-Time Factory and Trade Updates</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-serif leading-tight">
            Connect With A<span className="font-sans font-semibold">&amp;</span>H IMPEX On <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-blue-600">Social Media</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base mt-2 sm:mt-3 font-normal leading-relaxed">
            Stay updated with our latest weaving videos, newly stitched fabric collections, trade show attendances, and direct buyer testimonials.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {socialCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-2xl p-5 sm:p-6 bg-white border border-slate-200 ${card.borderHover} transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-2xl group`}
            >
              <div>
                {/* Card Top: Icon & Platform Badge */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${card.iconContainer} flex items-center justify-center text-lg sm:text-xl shadow-sm group-hover:scale-105 transition-transform`}>
                    <FontAwesomeIcon icon={card.icon} />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.badgeClass} font-mono`}>
                    {card.platform}
                  </span>
                </div>

                {/* Title & Handle */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 font-serif group-hover:text-brand-700 transition-colors">
                  {card.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-brand-700 font-semibold mb-2 sm:mb-3 font-mono truncate">
                  {card.handle}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3 sm:mb-4">
                  {card.description}
                </p>

                {/* Bullet points info box */}
                <div className="space-y-1 text-[10px] sm:text-[11px] text-slate-600 mb-4 sm:mb-5 bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
                  {card.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-brand-600 font-bold">&bull;</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full ${card.btnClass} text-xs font-bold uppercase tracking-wider py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-center shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] font-mono`}
              >
                <span>{card.btnText}</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

