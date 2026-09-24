import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faLock,
  faUser,
  faShieldHalved,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useData } from '../../context/DataContext';
import logoImg from '../../assets/logo.jpeg';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const { login } = useData();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await login(formData.username.trim(), formData.password);
      if (result.success) {
        if (result.user.role === 'USER') {
          setErrorMessage('Client accounts do not have access to the staff console.');
          setLoading(false);
          return;
        }
        if (onLoginSuccess) onLoginSuccess(result.user);
        onClose();
      } else {
        setErrorMessage(result.error || 'Invalid username or password.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-brand-900 border border-brand-700/80 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative text-white text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-brand-800/80 hover:bg-brand-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-xs border border-brand-700/60"
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 text-left">
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-brand-800 border border-brand-500/40 flex items-center justify-center shrink-0 shadow-lg">
            <img src={logoImg} alt="A&H Impex Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-base font-bold text-white tracking-tight font-display text-left">
              Staff Portal Sign In
            </h2>
            <p className="text-xs text-brand-300 font-light text-left">
              A&amp;H IMPEX Management Console
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs mb-4 flex items-center gap-2 text-left">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="text-left">
            <label className="block text-xs text-slate-200 mb-1.5 font-semibold text-left">
              Username
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
              />
              <input
                type="text"
                name="username"
                required
                autoFocus
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter staff username"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-brand-800/90 border border-brand-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-all text-left"
              />
            </div>
          </div>

          <div className="text-left">
            <label className="block text-xs text-slate-200 mb-1.5 font-semibold text-left">
              Password
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
              />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-brand-800/90 border border-brand-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-all text-left"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-cyan-500/25 flex items-center justify-center gap-2 mt-5 transition-all shimmer-sweep disabled:opacity-50 active:scale-[0.99]"
          >
            <span>{loading ? 'Verifying credentials...' : 'Sign In to Console'}</span>
            {!loading && <FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-blue-200" />}
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="mt-6 pt-4 border-t border-brand-800 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
          <FontAwesomeIcon icon={faShieldHalved} className="text-[10px] text-brand-300" />
          <span>Restricted Access • Authorized Personnel Only</span>
        </div>
      </motion.div>
    </div>
  );
}
