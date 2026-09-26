/**
 * ==============================================================================
 * A&H IMPEX - COMPREHENSIVE ADMIN DASHBOARD & CMS PORTAL (DJANGO INTEGRATED)
 * ==============================================================================
 * Purpose: Full management suite for product catalog, categories, descriptions,
 *          technical specs, image uploads (file/URL), hero copy, and RFQ inquiries,
 *          with 3 distinct roles: SuperAdmin, Admin, and User (Client).
 * ==============================================================================
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGauge,
  faBoxesStacked,
  faTags,
  faBuilding,
  faInbox,
  faPlus,
  faPenToSquare,
  faTrash,
  faGlobe,
  faRotateLeft,
  faCheck,
  faXmark,
  faUpload,
  faLink,
  faSearch,
  faFilter,
  faFileInvoice,
  faEnvelope,
  faPhone,
  faLocationDot,
  faStar,
  faShieldHalved,
  faArrowRight,
  faCopy,
  faClock,
  faEye,
  faCircleExclamation,
  faUsers,
  faCrown,
  faUser,
  faRightFromBracket,
  faRightToBracket,
  faServer,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useData, deduplicateProducts } from '../../context/DataContext';
import { getProductFallbackImage } from '../../data/products';
import logoImg from '../../assets/logo.jpeg';
import AuthModal from './AuthModal';
import UserManagerTab from './UserManagerTab';

export default function AdminDashboard({ onExitAdmin }) {
  const {
    currentUser,
    userRole,
    isSuperAdmin,
    isAdmin,
    isRegularUser,
    isAuthenticated,
    backendStatus,
    isBackendConnected,
    login,
    logout,
    products,
    categories,
    companyInfo,
    inquiries,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateCompanyInfo,
    updateInquiryStatus,
    deleteInquiry,
    resetAllData
  } = useData();

  // Active navigation tab: 'overview' | 'products' | 'categories' | 'content' | 'inquiries' | 'users'
  const [activeTab, setActiveTab] = useState('overview');

  // Search & Filters
  const [productSearch, setProductSearch] = useState('');
  const [productFilterCat, setProductFilterCat] = useState('all');

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productImageFile, setProductImageFile] = useState(null);
  const [productFormData, setProductFormData] = useState({
    title: '',
    category: '',
    categoryName: '',
    tagline: '',
    description: '',
    image: '',
    badge: 'Export Grade',
    specs: {
      composition: '',
      gsm: '',
      moq: '500 Sets',
      leadTime: '30-45 Days',
      packaging: 'Export Carton Packaging'
    },
    features: ['OEKO-TEX Standard 100 Certified', 'High Tensile Strength', 'Vat Dyed Anti-Fade']
  });

  // Category Modal / State
  const [newCatLabel, setNewCatLabel] = useState('');
  const [editingCatId, setEditingCatId] = useState(null);
  const [editingCatLabel, setEditingCatLabel] = useState('');

  // Company Form State
  const [companyFormData, setCompanyFormData] = useState({
    eyebrow: companyInfo.eyebrow || '',
    heroDescription: companyInfo.heroDescription || '',
    contact: {
      email: companyInfo.contact?.email || '',
      whatsapp: companyInfo.contact?.whatsapp || '',
      whatsappClean: companyInfo.contact?.whatsappClean || '',
      phone: companyInfo.contact?.phone || '',
      address: companyInfo.contact?.address || '',
      addressNote: companyInfo.contact?.addressNote || ''
    }
  });

  // Sync company form data when companyInfo context updates
  React.useEffect(() => {
    if (companyInfo) {
      setCompanyFormData({
        eyebrow: companyInfo.eyebrow || '',
        heroDescription: companyInfo.heroDescription || '',
        contact: {
          email: companyInfo.contact?.email || '',
          whatsapp: companyInfo.contact?.whatsapp || '',
          whatsappClean: companyInfo.contact?.whatsappClean || '',
          phone: companyInfo.contact?.phone || '',
          address: companyInfo.contact?.address || '',
          addressNote: companyInfo.contact?.addressNote || ''
        }
      });
    }
  }, [companyInfo]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Image Upload handler (Stores file for Django backend multipart upload + reads data URL for local preview)
  const fileInputRef = useRef(null);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductFormData((prev) => ({ ...prev, image: reader.result }));
        showToast('Image attached & ready for upload!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Add Product
  const handleOpenAddProduct = () => {
    const firstCat = categories.find((c) => c.id !== 'all') || categories[0];
    setEditingProduct(null);
    setProductImageFile(null);
    setProductFormData({
      title: '',
      category: firstCat ? firstCat.id : 'home',
      categoryName: firstCat ? firstCat.label : 'Home Textiles',
      tagline: '',
      description: '',
      image: '',
      badge: 'Export Grade',
      specs: {
        composition: '100% Combed Compact Cotton (300 TC)',
        gsm: '140 GSM - Sateen Weave',
        moq: '500 Sets',
        leadTime: '30-45 Days',
        packaging: 'Export Carton Packaging'
      },
      features: ['OEKO-TEX Standard 100 Certified', 'High Tensile Strength', 'Vat Dyed Anti-Fade']
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product
  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductImageFile(null);
    setProductFormData({
      title: prod.title || '',
      category: prod.category || '',
      categoryName: prod.categoryName || '',
      tagline: prod.tagline || '',
      description: prod.description || '',
      image: prod.image || '',
      badge: prod.badge || 'Export Grade',
      specs: {
        composition: prod.specs?.composition || '',
        gsm: prod.specs?.gsm || '',
        moq: prod.specs?.moq || '',
        leadTime: prod.specs?.leadTime || '',
        packaging: prod.specs?.packaging || ''
      },
      features: prod.features && prod.features.length > 0 ? [...prod.features] : ['Export Grade Quality']
    });
    setIsProductModalOpen(true);
  };

  // Save Product (Create / Update with Django Backend Image handling)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productFormData.title.trim()) {
      alert('Please enter a product title');
      return;
    }

    const matchedCat = categories.find((c) => c.id === productFormData.category);
    const categoryName = matchedCat ? matchedCat.label : productFormData.categoryName;

    const payload = {
      ...productFormData,
      categoryName
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload, productImageFile);
      showToast(`Updated product "${payload.title}" successfully`);
    } else {
      await addProduct(payload, productImageFile);
      showToast(`Created product "${payload.title}" successfully`);
    }

    setIsProductModalOpen(false);
  };

  // Handle Delete Product
  const handleDeleteProduct = async (prod) => {
    if (window.confirm(`Are you sure you want to delete "${prod.title}"?`)) {
      await deleteProduct(prod.id);
      showToast(`Deleted product "${prod.title}"`);
    }
  };

  // Handle Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatLabel.trim()) return;
    const cat = await addCategory({ label: newCatLabel.trim() });
    setNewCatLabel('');
    showToast(`Added category "${cat.label}"`);
  };

  // Handle Save Edited Category
  const handleSaveEditCategory = async (catId) => {
    if (!editingCatLabel.trim()) return;
    await updateCategory(catId, { label: editingCatLabel.trim() });
    setEditingCatId(null);
    setEditingCatLabel('');
    showToast('Category updated successfully');
  };

  // Handle Delete Category
  const handleDeleteCategory = async (cat) => {
    if (cat.id === 'all') return;
    const count = getCategoryProductCount(cat.id);
    if (
      window.confirm(
        `Are you sure you want to delete category "${cat.label}"? (${count} product(s) linked to this category)`
      )
    ) {
      await deleteCategory(cat.id);
      showToast(`Deleted category "${cat.label}"`);
    }
  };

  // Handle Save Company Info
  const handleSaveCompanyInfo = async (e) => {
    e.preventDefault();
    await updateCompanyInfo(companyFormData);
    showToast('Company information updated successfully');
  };

  // Handle Inquiry Status Update
  const handleInquiryStatusChange = async (inquiryId, newStatus) => {
    await updateInquiryStatus(inquiryId, newStatus);
    showToast(`Inquiry #${inquiryId} updated to "${newStatus}"`);
  };

  // Handle Admin / SuperAdmin Logout with direct return to live website
  const handleAdminLogout = () => {
    logout();
    if (onExitAdmin) {
      onExitAdmin();
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Quick Demo Role Switcher Handlers
  const handleSwitchDemoRole = async (username, password) => {
    const res = await login(username, password);
    if (res.success) {
      showToast(`Logged in as ${res.user.role}: ${res.user.username}`);
    } else {
      showToast(`Login failed: ${res.error}`);
    }
  };

  // Strictly deduplicated products list
  const dedupedProducts = React.useMemo(() => {
    return deduplicateProducts(products || []);
  }, [products]);

  // Dynamic product count per category
  const getCategoryProductCount = (catId) => {
    if (!catId || catId === 'all') return dedupedProducts.length;
    const targetCat = categories.find((c) => c.id === catId);
    const targetLabel = String(targetCat?.label || targetCat?.name || '').toLowerCase().trim();

    return dedupedProducts.filter((p) => {
      const catValue = typeof p.category === 'object' && p.category ? (p.category.slug || p.category.id || '') : String(p.category || '');
      const pCatName = String(p.categoryName || p.category_name || '').toLowerCase().trim();
      return (
        catValue === catId ||
        catValue.toLowerCase() === catId.toLowerCase() ||
        (targetLabel && catValue.toLowerCase() === targetLabel) ||
        pCatName === catId.toLowerCase() ||
        (targetLabel && pCatName === targetLabel)
      );
    }).length;
  };

  // Filtered products list for Product Manager tab
  const filteredProducts = dedupedProducts.filter((p) => {
    const matchesCat = productFilterCat === 'all' || (() => {
      const catValue = typeof p.category === 'object' && p.category ? (p.category.slug || p.category.id || '') : String(p.category || '');
      const pCatName = String(p.categoryName || p.category_name || '').toLowerCase().trim();
      const activeCatObj = categories.find(c => c.id === productFilterCat);
      const activeCatLabel = String(activeCatObj?.label || activeCatObj?.name || '').toLowerCase().trim();

      return catValue === productFilterCat ||
             catValue.toLowerCase() === productFilterCat.toLowerCase() ||
             (activeCatLabel && catValue.toLowerCase() === activeCatLabel) ||
             pCatName === productFilterCat.toLowerCase() ||
             (activeCatLabel && pCatName === activeCatLabel);
    })();

    const matchesSearch =
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.tagline && p.tagline.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.specs?.composition && p.specs.composition.toLowerCase().includes(productSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Access Guard: If current user is NOT an authorized Admin/SuperAdmin, show Restricted / Staff Login screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#071830] text-white flex flex-col items-center justify-center p-6 text-center selection:bg-brand-500 selection:text-white relative overflow-hidden">
        {/* Ambient subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          defaultMode="login"
          onLoginSuccess={(user) => {
            showToast(`Welcome ${user.username} (${user.role})`);
            setIsAuthModalOpen(false);
          }}
        />

        <div className="relative z-10 max-w-md w-full flex flex-col items-center bg-brand-900/80 border border-brand-700/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-brand-800/90 border border-brand-500/40 text-rose-400 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-rose-900/20">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>
          
          <h2 className="text-2xl font-bold font-display text-white mb-2">
            Administrative Access Restricted
          </h2>

          {isAuthenticated && isRegularUser ? (
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Signed in as <span className="text-amber-300 font-semibold font-mono">"{currentUser?.username}"</span> (Client Role). Commercial buyer accounts do not have access to backend management controls.
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Authentication required. Please sign in with authorized Staff Administrator or SuperAdmin credentials to access the console.
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
              onClick={() => {
                if (isAuthenticated && isRegularUser) {
                  logout();
                }
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all shimmer-sweep active:scale-98"
            >
              <FontAwesomeIcon icon={faRightToBracket} className="text-xs" />
              <span>{isAuthenticated && isRegularUser ? 'Sign In as Staff' : 'Staff Sign In'}</span>
            </button>

            <button
              onClick={onExitAdmin}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-800/80 hover:bg-brand-700 text-slate-200 hover:text-white border border-brand-600/50 font-semibold text-xs transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faGlobe} className="text-xs" />
              <span>Return to Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-medium text-sm shadow-2xl flex items-center gap-3 border border-emerald-400/40 backdrop-blur-lg"
          >
            <FontAwesomeIcon icon={faCheck} className="text-base" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
        onLoginSuccess={(user) => showToast(`Welcome ${user.username} (${user.role})`)}
      />

      {/* Admin Top Navigation Bar (Consistent with Main Website glass-nav) */}
      <header className="sticky top-0 z-40 glass-nav border-b border-brand-700/80 text-white shadow-2xl backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Left Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-brand-800 border border-brand-500/40 flex items-center justify-center shrink-0 shadow-lg">
                <img src={logoImg} alt="A&H Impex Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base font-extrabold text-white tracking-tight font-display">
                  A<span className="font-sans font-semibold">&amp;</span>H <span className="text-brand-300 font-light">IMPEX</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-brand-800/90 text-brand-200 border border-brand-600/50 text-[10px] font-semibold tracking-wide">
                  Console
                </span>
                <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-brand-200/80 ml-2 border-l border-brand-700/80 pl-3">
                  <span className={`w-1.5 h-1.5 rounded-full ${isBackendConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                  <span className="font-medium text-slate-300">{backendStatus}</span>
                </div>
              </div>
            </div>

            {/* Right Action Cluster */}
            <div className="flex items-center gap-3">
              <button
                onClick={onExitAdmin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-cyan-500/25 transition-all shimmer-sweep"
                title="View public website"
              >
                <FontAwesomeIcon icon={faGlobe} className="text-xs" />
                <span className="hidden sm:inline">Live Website</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-blue-200 ml-0.5" />
              </button>

              <div className="h-5 w-px bg-brand-700/80"></div>

              {/* User Profile Widget */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-800 border border-brand-600/60 flex items-center justify-center text-xs font-bold text-brand-200 shadow-sm">
                    {currentUser?.username ? currentUser.username.slice(0, 2).toUpperCase() : 'ST'}
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-bold text-white leading-none">
                      {currentUser?.username || 'Administrator'}
                    </span>
                    <span className="text-[10px] font-medium text-brand-300 mt-0.5">
                      {isSuperAdmin ? 'Super Administrator' : 'Staff Admin'}
                    </span>
                  </div>
                  <button
                    onClick={handleAdminLogout}
                    className="w-8 h-8 rounded-lg bg-brand-800 hover:bg-rose-900/60 border border-brand-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-200 flex items-center justify-center text-xs transition-all ml-1 shadow-sm"
                    title="Sign out &amp; return to website"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  <FontAwesomeIcon icon={faRightToBracket} className="text-xs" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: faGauge, count: null, visible: true },
            { id: 'products', label: 'Products & Collections', icon: faBoxesStacked, count: dedupedProducts.length, visible: !isRegularUser },
            { id: 'categories', label: 'Categories', icon: faTags, count: categories.filter(c => c.id !== 'all').length, visible: !isRegularUser },
            { id: 'content', label: 'Company CMS', icon: faBuilding, count: null, visible: !isRegularUser },
            { id: 'inquiries', label: 'Buyer RFQs', icon: faInbox, count: inquiries.length, visible: true },
            { id: 'users', label: 'Staff & Roles', icon: faUsers, count: null, visible: isSuperAdmin },
          ]
            .filter(tab => tab.visible)
            .map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/20 border border-brand-400/40'
                      : 'bg-white hover:bg-brand-50/70 text-slate-700 hover:text-brand-700 border border-slate-200 shadow-sm'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className={`text-[11px] ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
        </div>

        {/* TAB 1: OVERVIEW & QUICK METRICS */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Export Product Lines</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBoxesStacked} />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-display">{dedupedProducts.length}</span>
                  <span className="text-xs text-slate-500 block mt-1">Active items live on catalog</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Catalog Categories</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faTags} />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-display">{categories.filter(c => c.id !== 'all').length}</span>
                  <span className="text-xs text-slate-500 block mt-1">Specialized collections</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Received RFQ Inquiries</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faInbox} />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-display">{inquiries.length}</span>
                  <span className="text-xs text-slate-500 block mt-1">International buyer leads</span>
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Quick Management Actions */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">Quick Management Actions</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Direct shortcuts to manage commercial catalog <span className="font-sans font-semibold">&amp;</span> buyer workflows</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <button
                    onClick={handleOpenAddProduct}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-slate-50 text-left transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <span className="font-bold text-slate-900 text-xs block">Add New Product</span>
                    <span className="text-[11px] text-slate-500">Upload images <span className="font-sans font-semibold">&amp;</span> export specs</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('categories')}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 text-left transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FontAwesomeIcon icon={faTags} />
                    </div>
                    <span className="font-bold text-slate-900 text-xs block">Manage Categories</span>
                    <span className="text-[11px] text-slate-500">Edit product sectors <span className="font-sans font-semibold">&amp;</span> taxonomy</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 text-left transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FontAwesomeIcon icon={faInbox} />
                    </div>
                    <span className="font-bold text-slate-900 text-xs block">View Buyer RFQs</span>
                    <span className="text-[11px] text-slate-500">Check incoming quotes <span className="font-sans font-semibold">&amp;</span> dispatch</span>
                  </button>
                </div>
              </div>

              {/* Right Col: Recent Buyer Inquiries Summary */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 font-display">Recent Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="space-y-2.5">
                  {inquiries && inquiries.length > 0 ? (
                    inquiries.slice(0, 3).map((inq, idx) => (
                      <div key={inq.id || idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-slate-900 block truncate">{inq.name || 'Commercial Buyer'}</span>
                          <span className="text-[11px] text-slate-500 block truncate">{inq.company || inq.email}</span>
                        </div>
                        <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                          inq.status === 'Quoted'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : inq.status === 'Under Review'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {inq.status || 'New'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No pending buyer inquiries.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Action & Filter Toolbar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                  <FontAwesomeIcon icon={faSearch} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products by title, specs, or yarn..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} className="text-slate-400 text-xs" />
                  <select
                    value={productFilterCat}
                    onChange={(e) => setProductFilterCat(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs focus:outline-none focus:border-brand-500 font-medium cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {categories.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Product Count Indicator */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                  <span>Showing</span>
                  <strong className="text-slate-900 font-bold font-mono">{filteredProducts.length}</strong>
                  <span>of</span>
                  <strong className="text-slate-900 font-bold font-mono">{dedupedProducts.length}</strong>
                  <span>Items</span>
                </div>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 shimmer-sweep shrink-0"
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                <span>Add Export Product</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="h-44 w-full relative bg-slate-100 overflow-hidden">
                      <img
                        src={(!p.image || p.image.includes('unsplash.com')) ? getProductFallbackImage(p) : p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-900/90 backdrop-blur-md text-brand-300 text-[10px] font-bold font-mono uppercase tracking-wider border border-brand-500/30">
                        {p.badge || 'Export Grade'}
                      </span>
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono">
                        {p.categoryName || p.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5">
                      <h4 className="font-bold text-slate-900 text-sm font-sans line-clamp-1">{p.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{p.tagline || p.description}</p>
                      
                      {/* Specs pills */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 text-[10px]">
                        {p.specs?.composition && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                            {p.specs.composition}
                          </span>
                        )}
                        {p.specs?.moq && (
                          <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-mono font-bold">
                            MOQ: {p.specs.moq}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditProduct(p)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-brand-50 text-brand-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-xs" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: CATEGORIES MANAGER */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 w-full"
          >
            {/* Header / Intro Bar */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-100">
                  <FontAwesomeIcon icon={faTags} className="text-blue-600 text-xs" />
                  <span>Taxonomy <span className="font-sans font-semibold">&amp;</span> Catalog Management</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Product Categories <span className="font-sans font-semibold">&amp;</span> Classifications
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  Define <span className="font-sans font-semibold">&amp;</span> structure export product categories. Categories instantly organize catalog browsing <span className="font-sans font-semibold">&amp;</span> power buyer quote routing.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600">
                  Total Collections: <strong className="text-brand-800 font-bold">{categories.length}</strong>
                </div>
              </div>
            </div>

            {/* 2-Column Responsive Grid Layout for Laptops & Desktops */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Create New Category Form & Taxonomy Tips (lg:col-span-5 xl:col-span-4) */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-serif">Create New Category</h3>
                      <p className="text-[11px] text-slate-500">Add export classifications</p>
                    </div>
                  </div>

                  <form onSubmit={handleAddCategory} className="space-y-4 mt-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Category Name *</label>
                      <input
                        type="text"
                        value={newCatLabel}
                        onChange={(e) => setNewCatLabel(e.target.value)}
                        placeholder="e.g. Technical Textiles & Geotextiles"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all shimmer-sweep active:scale-98"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-xs" />
                      <span>Add Category</span>
                    </button>
                  </form>
                </div>

                {/* Catalog Integration Advice Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-slate-800 text-xs font-serif">
                    <FontAwesomeIcon icon={faBoxesStacked} className="text-blue-600 text-[11px]" />
                    <span>Catalog Integration</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Categories automatically synchronize with the frontend product filter tabs &amp; RFQ specification selectors across the live portal.
                  </p>
                </div>
              </div>

              {/* Right Column: Category Cards Grid (lg:col-span-7 xl:col-span-8) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.filter(c => c.id !== 'all').map((cat) => {
                    const count = getCategoryProductCount(cat.id);
                    const isEditing = editingCatId === cat.id;

                    return (
                      <div
                        key={cat.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                      >
                        {isEditing ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">Edit Category Name</label>
                              <input
                                type="text"
                                value={editingCatLabel}
                                onChange={(e) => setEditingCatLabel(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-500"
                                autoFocus
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSaveEditCategory(cat.id)}
                                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 text-white text-xs font-bold shadow-sm"
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={() => setEditingCatId(null)}
                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <FontAwesomeIcon icon={faTags} />
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{cat.label}</h4>
                                  <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                                    slug: {cat.id}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => {
                                    setEditingCatId(cat.id);
                                    setEditingCatLabel(cat.label);
                                  }}
                                  title="Edit category name"
                                  className="p-2 rounded-lg text-slate-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                                >
                                  <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(cat)}
                                  title="Delete category"
                                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                >
                                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                                </button>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                              <span className="text-slate-500 font-mono">Linked Products</span>
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold font-mono">
                                {count} product{count === 1 ? '' : 's'}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 4: HERO & COMPANY CONTENT */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 w-full"
          >
            {/* Header / Intro Bar */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-100">
                  <FontAwesomeIcon icon={faBuilding} className="text-blue-600 text-xs" />
                  <span>Content Management System</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Hero Section <span className="font-sans font-semibold">&amp;</span> Commercial Contacts
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  Update live corporate hero copywriting, value propositions, &amp; official export desk communications. All changes sync in real-time.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  REST API Synced
                </span>
              </div>
            </div>

            {/* Responsive 2-Column Grid on Laptops */}
            <form onSubmit={handleSaveCompanyInfo} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (7 cols): Hero Copywriting & Live Preview */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Hero Copy Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900 font-serif">Hero Section Copywriting</h3>
                    <p className="text-xs text-slate-500">Live dynamic text displayed on the main website homepage</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Hero Subheading / Eyebrow Text
                    </label>
                    <input
                      type="text"
                      value={companyFormData.eyebrow}
                      onChange={(e) => setCompanyFormData({ ...companyFormData, eyebrow: e.target.value })}
                      placeholder="e.g. Institutional Bedding • Hospitality Linens • Workwear Textiles"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Hero Paragraph Description
                    </label>
                    <textarea
                      rows={4}
                      value={companyFormData.heroDescription}
                      onChange={(e) => setCompanyFormData({ ...companyFormData, heroDescription: e.target.value })}
                      placeholder="Enter detailed company introduction &amp; manufacturing summary..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner leading-relaxed"
                    />
                  </div>
                </div>

                {/* Real-Time Preview Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#071830] via-[#0e294d] to-[#071830] text-white shadow-lg border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faEye} /> Live Homepage Preview
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Hero Viewport</span>
                  </div>

                  <div className="pt-2 space-y-2">
                    <span className="inline-block text-[11px] font-semibold text-cyan-300 tracking-wide">
                      {companyFormData.eyebrow || 'Institutional Bedding • Hospitality Linens • Workwear Textiles'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {companyFormData.heroDescription || 'Vertically integrated spinning, weaving, eco-dyeing, & precision automated stitching mill delivering container-grade textile shipments to international markets.'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): Official Export Contacts & Save Card */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                
                {/* Official Contacts Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900 font-serif">Export Commercial Contacts</h3>
                    <p className="text-xs text-slate-500">Official contact points for international trade inquiries</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-xs" />
                      <span>Export Desk Email</span>
                    </label>
                    <input
                      type="email"
                      value={companyFormData.contact.email}
                      onChange={(e) => setCompanyFormData({
                        ...companyFormData,
                        contact: { ...companyFormData.contact, email: e.target.value }
                      })}
                      placeholder="info@ah-impex.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faWhatsapp} className="text-emerald-600 text-xs" />
                      <span>Commercial WhatsApp Line</span>
                    </label>
                    <input
                      type="text"
                      value={companyFormData.contact.whatsapp}
                      onChange={(e) => setCompanyFormData({
                        ...companyFormData,
                        contact: { ...companyFormData.contact, whatsapp: e.target.value }
                      })}
                      placeholder="+92 300 8660309"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faPhone} className="text-indigo-600 text-xs" />
                      <span>Direct Export Phone / Hotline</span>
                    </label>
                    <input
                      type="text"
                      value={companyFormData.contact.phone || ''}
                      onChange={(e) => setCompanyFormData({
                        ...companyFormData,
                        contact: { ...companyFormData.contact, phone: e.target.value }
                      })}
                      placeholder="+92 41 8765432"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faLocationDot} className="text-rose-600 text-xs" />
                      <span>Headquarters <span className="font-sans font-semibold">&amp;</span> Mill Address</span>
                    </label>
                    <input
                      type="text"
                      value={companyFormData.contact.address || ''}
                      onChange={(e) => setCompanyFormData({
                        ...companyFormData,
                        contact: { ...companyFormData.contact, address: e.target.value }
                      })}
                      placeholder="Textile Industrial Estate, Faisalabad, Pakistan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Save & Publish Action Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-cyan-500/25 transition-all shimmer-sweep active:scale-98 flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Save CMS Changes</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    Saves directly to Django REST API &amp; updates live website content.
                  </p>
                </div>

              </div>

            </form>
          </motion.div>
        )}

        {/* TAB 5: RFQ INQUIRIES & BUYER LEADS */}
        {activeTab === 'inquiries' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Commercial Buyer RFQs <span className="font-sans font-semibold">&amp;</span> Inquiries
                  </h3>
                  <span className="text-xs text-slate-500">Every inquiry automatically triggers email dispatch to company <span className="font-sans font-semibold">&amp;</span> buyer</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold font-mono">
                  {inquiries.length} Total Submissions
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Ref Code <span className="font-sans font-semibold">&amp;</span> Date</th>
                      <th className="py-3 px-4">Buyer <span className="font-sans font-semibold">&amp;</span> Company</th>
                      <th className="py-3 px-4">Inquired Product / Volume</th>
                      <th className="py-3 px-4">Port / Requirements</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-slate-400 text-sm">
                          No inquiries received yet. Submit an RFQ on the live site to test!
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono">
                            <span className="font-bold text-slate-900 block">{inq.id}</span>
                            <span className="text-[10px] text-slate-400">{inq.date || inq.created_at?.slice(0, 10)}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 block">{inq.name}</span>
                            <span className="text-brand-700 font-medium text-[11px] block">{inq.company}</span>
                            <span className="text-slate-400 text-[10px]">{inq.email} • {inq.phone}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-800 block">{inq.productTitle || inq.product_title || inq.category}</span>
                            <span className="text-slate-500 text-[11px]">{inq.volume}</span>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <span className="font-medium text-slate-700 block">{inq.port || 'FOB Karachi'}</span>
                            <span className="text-slate-400 text-[11px] line-clamp-1">{inq.notes}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={inq.status || 'New'}
                              onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                                inq.status === 'Quoted'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : inq.status === 'Under Review'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : inq.status === 'Closed'
                                  ? 'bg-slate-100 text-slate-600 border-slate-300'
                                  : 'bg-blue-50 text-blue-800 border-blue-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Quoted">Quoted</option>
                              <option value="In Production">In Production</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete inquiry #${inq.id}?`)) {
                                  deleteInquiry(inq.id);
                                  showToast(`Inquiry #${inq.id} deleted`);
                                }
                              }}
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: SUPERADMIN USER & STAFF ROLES MANAGEMENT */}
        {activeTab === 'users' && isSuperAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserManagerTab onToast={showToast} />
          </motion.div>
        )}

      </div>

      {/* Product Add / Edit Modal */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 text-slate-800"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">
                    {editingProduct ? 'Edit Export Product' : 'Add New Export Product'}
                  </h3>
                  <span className="text-xs text-slate-500">Persisted in PostgreSQL database with image handling</span>
                </div>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={productFormData.title}
                      onChange={(e) => setProductFormData({ ...productFormData, title: e.target.value })}
                      placeholder="e.g. 400TC Egyptian Cotton Sateen"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                    <select
                      value={productFormData.category}
                      onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                    >
                      {categories.filter(c => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={productFormData.tagline}
                    onChange={(e) => setProductFormData({ ...productFormData, tagline: e.target.value })}
                    placeholder="Short marketing headline"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={productFormData.description}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* Image Upload / URL */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Product Image (File Upload or URL)</label>
                  
                  <div className="flex items-center gap-3">
                    {productFormData.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                        <img src={productFormData.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 shadow-sm"
                        >
                          <FontAwesomeIcon icon={faUpload} />
                          <span>Choose Image File</span>
                        </button>
                        <span className="text-[11px] text-slate-500">JPG, PNG, WebP</span>
                      </div>

                      <input
                        type="text"
                        value={productFormData.image}
                        onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                        placeholder="Or paste external image URL..."
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase font-mono block">Technical Specifications</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <label className="text-[11px] text-slate-500 block">Composition</label>
                      <input
                        type="text"
                        value={productFormData.specs.composition}
                        onChange={(e) => setProductFormData({
                          ...productFormData,
                          specs: { ...productFormData.specs, composition: e.target.value }
                        })}
                        placeholder="100% Cotton"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block">GSM</label>
                      <input
                        type="text"
                        value={productFormData.specs.gsm}
                        onChange={(e) => setProductFormData({
                          ...productFormData,
                          specs: { ...productFormData.specs, gsm: e.target.value }
                        })}
                        placeholder="140 GSM"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block">MOQ</label>
                      <input
                        type="text"
                        value={productFormData.specs.moq}
                        onChange={(e) => setProductFormData({
                          ...productFormData,
                          specs: { ...productFormData.specs, moq: e.target.value }
                        })}
                        placeholder="500 Sets"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block">Lead Time</label>
                      <input
                        type="text"
                        value={productFormData.specs.leadTime}
                        onChange={(e) => setProductFormData({
                          ...productFormData,
                          specs: { ...productFormData.specs, leadTime: e.target.value }
                        })}
                        placeholder="30-45 Days"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-cyan-500/25 transition-all shimmer-sweep active:scale-98"
                  >
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
