/**
 * ==============================================================================
 * A&H IMPEX - STICKY LUXURY NAVIGATION COMPONENT
 * ==============================================================================
 * Purpose: Primary brand navigation bar with dynamic backdrop blur on scroll,
 *          smooth anchor links, fast RFQ modal trigger, and mobile drawer.
 * 
 * Design Details:
 * - Bespoke brand monogram badge with gold diamond border.
 * - Dynamic scroll listener to condense padding and increase opacity.
 * - Responsive mobile drawer with Framer Motion slide-in animations.
 * - Strict adherence to zero-emoji design policy using crisp Lucide SVG icons.
 * ==============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Layers, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '../data/company';

export default function Navbar({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection for dynamic backdrop blur and height transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Manufacturing', href: '#manufacturing' },
    { name: 'Quality Control', href: '#quality' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Global Reach', href: '#export' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-navy-950/95 backdrop-blur-md shadow-2xl border-b border-white/10'
          : 'py-5 bg-gradient-to-b from-navy-950/90 to-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity / Monogram Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none" aria-label="A&H Impex Homepage">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-navy-800 to-navy-900 border border-gold-500/30 flex items-center justify-center shadow-lg group-hover:border-gold-400/60 transition-all">
              <div className="absolute inset-0 bg-gold-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Layers className="w-5 h-5 text-gold-400 group-hover:scale-105 transition-transform" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-display">
                A&amp;H <span className="text-gold-400 font-extrabold tracking-wider">IMPEX</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                Textile Manufacturer &amp; Exports
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3.5 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* Desktop Right CTA: RFQ Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold text-sm shadow-md hover:shadow-gold-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FileText className="w-4 h-4" aria-hidden="true" />
                Request a Quote
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 rounded-md bg-gold-500 text-navy-950 text-xs font-semibold"
            >
              RFQ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-navy-850 text-slate-200 hover:text-white hover:bg-navy-800 focus:outline-none border border-white/10"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-navy-950/98 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 mt-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-gold-400 hover:bg-navy-900/60 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  Request a Formal Quote (RFQ)
                </button>
                <p className="text-center text-xs text-slate-400 font-mono">
                  Export Desk: {COMPANY.contact.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
