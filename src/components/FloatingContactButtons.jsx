/**
 * ==============================================================================
 * A&H IMPEX - FLOATING CONTACT ACTIONS COMPONENT
 * ==============================================================================
 * Purpose: Non-intrusive floating contact trigger that expands smoothly on user
 *          interaction to offer instant WhatsApp chat, official email, or RFQ modal.
 * 
 * Features:
 * - Positioned in the bottom-right viewport corner with high z-index.
 * - Smooth Framer Motion spring expansion.
 * - Auto-closes when triggering modal to prevent obscuring form inputs.
 * - Zero emojis; clean Lucide SVG icons exclusively.
 * ==============================================================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Mail, FileText, X } from 'lucide-react';
import { COMPANY } from '../data/company';

export default function FloatingContactButtons({ onOpenQuoteModal }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Quick Commercial Actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end space-y-2.5 mb-3"
          >
            {/* Action 1: WhatsApp */}
            <a
              href={`https://wa.me/${COMPANY.contact.whatsappClean}?text=Hello%20A%26H%20Impex,%20I%20would%20like%20to%20inquire%20about%20textile%20export%20orders.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 transition-all text-xs font-bold uppercase tracking-wider group"
            >
              <span className="text-[11px] font-semibold text-emerald-100 hidden sm:inline font-mono">WhatsApp Merchandiser</span>
              <Phone className="w-4 h-4" aria-hidden="true" />
            </a>

            {/* Action 2: Email */}
            <a
              href={`mailto:${COMPANY.contact.email}?subject=Export%20Inquiry%20-%20A%26H%20Impex`}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-navy-850 text-slate-100 border border-white/20 shadow-xl hover:bg-navy-800 hover:text-white transition-all text-xs font-bold uppercase tracking-wider group"
            >
              <span className="text-[11px] font-semibold text-slate-300 hidden sm:inline font-mono">Official Email Desk</span>
              <Mail className="w-4 h-4 text-gold-400" aria-hidden="true" />
            </a>

            {/* Action 3: Request Quote */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenQuoteModal();
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-xl hover:from-gold-400 hover:to-gold-500 transition-all text-xs font-bold uppercase tracking-wider group"
            >
              <span className="text-[11px] font-semibold text-navy-950 hidden sm:inline font-mono">Technical RFQ Form</span>
              <FileText className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Quick Contact Actions"
        aria-expanded={isOpen}
        className={`w-13 h-13 p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-navy-800 text-white border border-white/20 rotate-90'
            : 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 hover:scale-105 active:scale-95 shadow-gold-500/25 ring-4 ring-gold-500/20'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <MessageSquare className="w-6 h-6 fill-navy-950" aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
