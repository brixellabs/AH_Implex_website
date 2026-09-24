/**
 * ==============================================================================
 * A&H IMPEX - ANIMATED LUXURY NAVIGATION BAR (FONTAWESOME ICONS)
 * ==============================================================================
 * Purpose: Ultra-professional sticky header featuring interactive gliding pill
 *          animations, scroll progress tracking, active section spy, direct
 *          WhatsApp desk trigger, and responsive mobile drawer with FontAwesome icons.
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileInvoice,
  faArrowRight,
  faBars,
  faXmark,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { COMPANY } from '../data/company';
import logoImg from '../assets/logo.jpeg';

export default function Navbar({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Products', href: '#products', id: 'products' },
    { name: 'Manufacturing', href: '#manufacturing', id: 'manufacturing' },
    { name: 'Quality Control', href: '#quality', id: 'quality' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Global Reach', href: '#export', id: 'export' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Scroll listener for progress, sticky compaction, and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // 1. Compaction
      setIsScrolled(window.scrollY > 25);

      // 2. Reading progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // 3. Active Section Detection
      const sections = ['contact', 'export', 'certifications', 'quality', 'manufacturing', 'products', 'about'];
      let currentSection = 'home';
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          currentSection = sectionId;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Sticky Navigation Container (Reference Design glass-nav) */}
      <header
        role="banner"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav border-b border-brand-700/80 shadow-2xl py-2'
            : 'glass-nav border-b border-brand-700/50 py-2.5 shadow-lg'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 lg:gap-3 xl:gap-6 w-full">
            
            {/* Brand Logo & Name (Clean Left Position) */}
            <a
              href="#"
              className="flex items-center gap-2 group focus:outline-none shrink-0 text-left"
              aria-label="A&H Impex Homepage"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-brand-800 border border-brand-500/40 flex items-center justify-center shadow-lg group-hover:border-brand-300 transition-all duration-300 shrink-0">
                <img
                  src={logoImg}
                  alt="A&H Impex Logo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-brand-300/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              
              <div className="flex flex-col text-left justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-bold tracking-wider text-white font-display uppercase leading-tight group-hover:text-brand-200 transition-colors whitespace-nowrap">
                    A&amp;H <span className="text-brand-300 font-light">IMPEX</span>
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                </div>
                <span className="text-[8px] sm:text-[8.5px] tracking-[0.2em] uppercase text-slate-300 font-semibold whitespace-nowrap">
                  Textile Manufacturer &amp; Exporter
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Centered with Equal Spacing) */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-0.5 xl:gap-1 p-1 rounded-full bg-brand-900/85 border border-brand-700/60 backdrop-blur-md shrink-0"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const isHovered = hoveredLink === link.name;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    className={`relative px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium whitespace-nowrap transition-colors duration-200 flex items-center justify-center ${
                      isActive
                        ? 'text-white font-semibold'
                        : isHovered
                        ? 'text-brand-200'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {/* Animated Gliding Pill Background */}
                    {isHovered && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-600/40 to-brand-500/30 border border-brand-500/40 -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Active State Subtle Pill */}
                    {isActive && !isHovered && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-brand-700/80 border border-brand-500/40 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                      {link.name}
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                      )}
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Desktop Right Action Bar: WhatsApp Export Desk + Compact Quote CTA */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* Instant WhatsApp Merchandiser desk (shown on xl+ screens so lg has abundant margin) */}
              <a
                href={`https://wa.me/${COMPANY.contact.whatsappClean}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20fabric%20and%20linen%20manufacturing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-800/90 hover:bg-emerald-950/60 border border-brand-700 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 text-xs font-medium transition-all duration-200 shadow-sm whitespace-nowrap"
                title="Direct WhatsApp Merchandiser Desk"
              >
                <div className="relative">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-emerald-400 text-xs" aria-hidden="true" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <span>Export Desk</span>
              </a>

              {/* Request a Quote Button with Reference Design Gradient (Compact size, no overflow) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenQuoteModal()}
                className="relative overflow-hidden px-3 xl:px-3.5 py-1.5 xl:py-2 rounded-lg bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-1.5 shimmer-sweep whitespace-nowrap shrink-0"
              >
                <FontAwesomeIcon icon={faFileInvoice} className="text-white text-xs" aria-hidden="true" />
                <span>Request Quote</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px] group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Mobile Menu Action Trigger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-brand-600 text-white text-xs font-bold shadow-md shimmer-sweep"
              >
                RFQ
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-brand-800 text-slate-200 hover:text-white hover:bg-brand-700 focus:outline-none border border-brand-700/60 transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <FontAwesomeIcon icon={faXmark} className="text-brand-300 text-lg" aria-hidden="true" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="text-brand-300 text-lg" aria-hidden="true" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Animated Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden bg-navy-950/98 border-b border-white/10 backdrop-blur-2xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1.5">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                          : 'text-slate-200 hover:text-gold-400 hover:bg-navy-900/70'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />}
                    </motion.a>
                  );
                })}

                {/* Mobile Direct Action Panel */}
                <div className="pt-4 mt-3 border-t border-white/10 space-y-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenQuoteModal();
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shimmer-sweep"
                  >
                    <FontAwesomeIcon icon={faFileInvoice} className="text-sm" aria-hidden="true" />
                    Request a Formal Quote (RFQ)
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY.contact.whatsappClean}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20export%20orders.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-emerald-400 text-sm" aria-hidden="true" />
                    Direct Merchandiser WhatsApp Desk
                  </a>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 px-1">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faEnvelope} className="text-gold-400 text-xs" />
                      {COMPANY.contact.email}
                    </span>
                    <span className="text-emerald-400 font-mono">24/7 Response</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
