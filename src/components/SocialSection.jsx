/**
 * ==============================================================================
 * A&H IMPEX - SOCIAL MEDIA & DIRECT CHANNELS COMPONENT
 * ==============================================================================
 * Purpose: Provides verified B2B communication channels for international buyers,
 *          retail procurers, and commercial forwarders.
 * 
 * Design Details:
 * - Uses bespoke vector SVG icons rather than emojis for professional credibility.
 * - Includes genuine links to Facebook, LinkedIn, WhatsApp Export Desk, and Direct Email.
 * - Subtle hover micro-interactions with border illumination and elevation.
 * ==============================================================================
 */

import React from 'react';
import { MessageSquare, Mail, ArrowRight, Share2 } from 'lucide-react';
import { COMPANY } from '../data/company';

/**
 * Bespoke LinkedIn SVG icon component
 */
function LinkedinIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37z" />
    </svg>
  );
}

/**
 * Bespoke Facebook SVG icon component
 */
function FacebookIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function SocialSection() {
  const socialCards = [
    {
      name: 'WhatsApp Export Desk',
      platform: 'Instant Merchandising Response',
      handle: COMPANY.contact.whatsapp,
      description: 'Connect directly with our senior international merchandising team for fast-track swatches, container pricing inquiries, and production lead time estimates.',
      cta: 'Start WhatsApp Chat',
      url: `https://wa.me/${COMPANY.contact.whatsappClean}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20textile%20export%20orders.`,
      icon: MessageSquare,
      badge: 'Fast Response',
    },
    {
      name: 'Official Export Email',
      platform: 'Formal RFQ & Specifications',
      handle: COMPANY.contact.email,
      description: 'Submit your formal purchase orders, tech packs, fabric specifications, and custom packaging requirements directly to our commercial export department.',
      cta: 'Send Technical RFQ',
      url: `mailto:${COMPANY.contact.email}`,
      icon: Mail,
      badge: 'Official Desk',
    },
    {
      name: 'Facebook Corporate Page',
      platform: 'Manufacturing Updates & Media',
      handle: '@ahimpextextiles',
      description: 'Follow our official Facebook page for mill announcements, factory facility photography, new weave releases, and seasonal export exhibitions.',
      cta: 'Visit Facebook Page',
      url: 'https://www.facebook.com/ahimpextextiles',
      icon: FacebookIcon,
      badge: 'Official Channel',
    },
    {
      name: 'LinkedIn Network',
      platform: 'Executive & B2B Partnerships',
      handle: 'A&H Impex Textiles',
      description: 'Connect with our corporate leadership and merchandising directors for contract manufacturing, private label tenders, and long-term procurement partnerships.',
      cta: 'Connect on LinkedIn',
      url: 'https://www.linkedin.com/company/ah-impex-textiles',
      icon: LinkedinIcon,
      badge: 'B2B Network',
    }
  ];

  return (
    <section className="py-20 bg-navy-950/80 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Share2 className="w-3.5 h-3.5" />
            <span>Digital Channels &amp; Communications</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
            Connect With Our <span className="gold-gradient-text">Export Division</span>
          </h2>

          <p className="text-slate-300 text-sm mt-3 font-light">
            Direct communication channels for international importers, department store buyers, and private label partners.
          </p>
        </div>

        {/* 4 Social / Direct Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <a
                key={idx}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card glass-card-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-navy-850 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 group-hover:border-gold-400 transition-all shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy-800 text-gold-300 border border-white/10">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors font-display">
                    {card.name}
                  </h3>
                  
                  <p className="text-xs text-gold-400/90 font-medium mt-0.5 mb-2.5 font-mono truncate">
                    {card.handle}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed font-light mb-5 line-clamp-3">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-gold-400 group-hover:text-gold-300">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
