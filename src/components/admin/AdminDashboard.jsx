/**
 * ==============================================================================
 * A&H IMPEX - COMPREHENSIVE ADMIN DASHBOARD & CMS PORTAL
 * ==============================================================================
 * Purpose: Full management suite for product catalog, categories, descriptions,
 *          technical specs, image uploads (file/URL), hero copy, and RFQ inquiries.
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
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useData } from '../../context/DataContext';
import logoImg from '../../assets/logo.jpeg';

export default function AdminDashboard({ onExitAdmin }) {
  const {
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
    deleteInquiry,
    resetAllData
  } = useData();

  // Active navigation tab: 'overview' | 'products' | 'categories' | 'content' | 'inquiries'
  const [activeTab, setActiveTab] = useState('overview');

  // Search & Filters
  const [productSearch, setProductSearch] = useState('');
  const [productFilterCat, setProductFilterCat] = useState('all');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Image Upload handler (Base64 file reader)
  const fileInputRef = useRef(null);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image file size is large (>2MB). Please consider using a smaller image or an image URL.');
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductFormData((prev) => ({ ...prev, image: reader.result }));
        showToast('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Add Product
  const handleOpenAddProduct = () => {
    const firstCat = categories.find((c) => c.id !== 'all') || categories[0];
    setEditingProduct(null);
    setProductFormData({
      title: '',
      category: firstCat ? firstCat.id : 'home-textiles',
      categoryName: firstCat ? firstCat.label : 'Home Textiles',
      tagline: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
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

  // Save Product (Create / Update)
  const handleSaveProduct = (e) => {
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
      updateProduct(editingProduct.id, payload);
      showToast(`Updated product "${payload.title}"`);
    } else {
      addProduct(payload);
      showToast(`Added new product "${payload.title}"`);
    }

    setIsProductModalOpen(false);
  };

  // Handle Delete Product
  const handleDeleteProduct = (prod) => {
    if (window.confirm(`Are you sure you want to delete "${prod.title}"?`)) {
      deleteProduct(prod.id);
      showToast(`Deleted product "${prod.title}"`);
    }
  };

  // Handle Add Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatLabel.trim()) return;
    const cat = addCategory({ label: newCatLabel.trim() });
    setNewCatLabel('');
    showToast(`Added new category "${cat.label}"`);
  };

  // Handle Save Edited Category
  const handleSaveEditCategory = (catId) => {
    if (!editingCatLabel.trim()) return;
    updateCategory(catId, { label: editingCatLabel.trim() });
    setEditingCatId(null);
    setEditingCatLabel('');
    showToast('Category updated successfully');
  };

  // Handle Delete Category
  const handleDeleteCategory = (cat) => {
    if (cat.id === 'all') return;
    const count = products.filter((p) => p.category === cat.id).length;
    if (
      window.confirm(
        `Are you sure you want to delete category "${cat.label}"? (${count} product(s) linked to this category)`
      )
    ) {
      deleteCategory(cat.id);
      showToast(`Deleted category "${cat.label}"`);
    }
  };

  // Handle Save Company Info
  const handleSaveCompanyInfo = (e) => {
    e.preventDefault();
    updateCompanyInfo(companyFormData);
    showToast('Company details and Hero copy updated successfully!');
  };

  // Filtered products list for Product Manager tab
  const filteredProducts = products.filter((p) => {
    const matchesCat = productFilterCat === 'all' || p.category === productFilterCat;
    const matchesSearch =
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.tagline && p.tagline.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(productSearch.toLowerCase())) ||
      (p.specs?.composition && p.specs.composition.toLowerCase().includes(productSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

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

      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-brand-900 border-b border-brand-800 backdrop-blur-xl shadow-xl text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Left Brand info with Admin Badge */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden bg-brand-800 border border-brand-500/40 flex items-center justify-center shrink-0 shadow-md">
                <img src={logoImg} alt="A&H Impex" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-white tracking-tight font-display">
                    A&amp;H <span className="text-brand-300 font-light">IMPEX</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-brand-700 text-brand-200 border border-brand-500/40 text-[10px] font-bold font-mono uppercase tracking-wider">
                    Admin Portal
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 font-medium">Textile Catalog &amp; CMS Manager</span>
              </div>
            </div>

            {/* Right Action buttons: View Live Site & Reset Data */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  if (window.confirm('Reset all catalog data and inquiries to factory defaults?')) {
                    resetAllData();
                    showToast('Catalog data reset to initial defaults');
                  }
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-800 hover:bg-rose-900/60 border border-brand-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-200 text-xs transition-all"
                title="Reset local changes to original defaults"
              >
                <FontAwesomeIcon icon={faRotateLeft} className="text-xs" />
                <span>Reset Defaults</span>
              </button>

              <button
                onClick={onExitAdmin}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs shadow-md hover:shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] shimmer-sweep"
              >
                <FontAwesomeIcon icon={faGlobe} className="text-xs" />
                <span>View Live Website</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs ml-0.5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: faGauge, count: null },
            { id: 'products', label: 'Products & Collections', icon: faBoxesStacked, count: products.length },
            { id: 'categories', label: 'Category Manager', icon: faTags, count: categories.length },
            { id: 'content', label: 'Hero Copy & Company Details', icon: faBuilding, count: null },
            { id: 'inquiries', label: 'Buyer RFQs & Inquiries', icon: faInbox, count: inquiries.length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} className="text-xs" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? 'bg-white text-brand-800' : 'bg-slate-100 text-slate-600'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Export Product Lines</span>
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBoxesStacked} />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-serif">{products.length}</span>
                  <span className="text-xs text-slate-500 block mt-1">Active items live on site</span>
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
                  <span className="text-3xl font-extrabold text-slate-900 font-serif">{categories.length - 1}</span>
                  <span className="text-xs text-slate-500 block mt-1">Specialized collections</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Received RFQ Inquiries</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faInbox} />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-serif">{inquiries.length}</span>
                  <span className="text-xs text-slate-500 block mt-1">International buyer leads</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Export Destinations</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faGlobe} />
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-3xl font-extrabold text-slate-900 font-serif">25+</span>
                  <span className="text-xs text-slate-500 block mt-1">Global ports &amp; markets</span>
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Quick Management Actions */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-serif">Quick Management Actions</h3>
                  <span className="text-xs text-slate-500">Instant catalog updates</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={handleOpenAddProduct}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-500 hover:shadow-md text-left transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center mb-3 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <FontAwesomeIcon icon={faPlus} className="text-base" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">Add New Product</h4>
                    <p className="text-xs text-slate-500 mt-1">Upload image, set yarn specs, MOQ and export description.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('categories')}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md text-left transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <FontAwesomeIcon icon={faTags} className="text-base" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Manage Categories</h4>
                    <p className="text-xs text-slate-500 mt-1">Create new textile categories or rename existing collections.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('content')}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md text-left transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FontAwesomeIcon icon={faBuilding} className="text-base" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Edit Hero &amp; Contacts</h4>
                    <p className="text-xs text-slate-500 mt-1">Update hero banner copy, phone numbers, email and WhatsApp.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md text-left transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <FontAwesomeIcon icon={faInbox} className="text-base" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Review RFQ Leads ({inquiries.length})</h4>
                    <p className="text-xs text-slate-500 mt-1">View buyer submissions, target port, and technical inquiries.</p>
                  </button>
                </div>
              </div>

              {/* Right Col: Live System Information */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-serif">System Status</h3>
                
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Database Engine</span>
                    <span className="font-mono text-emerald-700 font-bold">LocalStorage (Live)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Real-time Website Sync</span>
                    <span className="font-mono text-emerald-700 font-bold">Active (0ms Delay)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Active Company Email</span>
                    <span className="font-mono text-brand-700 font-bold truncate max-w-[140px]">{companyInfo.contact?.email}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-500">Active WhatsApp Desk</span>
                    <span className="font-mono text-emerald-700 font-bold">{companyInfo.contact?.whatsapp}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onExitAdmin}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <FontAwesomeIcon icon={faEye} />
                    <span>Preview Live Storefront</span>
                  </button>
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
            {/* Action Bar: Search, Category Filter, and Add Product Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              
              <div className="flex flex-1 items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <FontAwesomeIcon icon={faSearch} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by title, yarn spec, GSM, or description..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                      <FontAwesomeIcon icon={faXmark} className="text-xs" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="shrink-0">
                  <select
                    value={productFilterCat}
                    onChange={(e) => setProductFilterCat(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:border-brand-500 focus:bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add New Product Trigger */}
              <button
                onClick={handleOpenAddProduct}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 shimmer-sweep"
              >
                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-500 transition-all flex flex-col group"
                >
                  {/* Thumbnail Image with Badges */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-900/90 backdrop-blur-md border border-brand-500/30 text-white text-[10px] font-bold uppercase tracking-wider font-mono">
                      {prod.categoryName || prod.category}
                    </span>

                    {prod.badge && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow">
                        {prod.badge}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-100 font-mono">
                      <span>MOQ: {prod.specs?.moq || '500 Sets'}</span>
                      <span>{prod.specs?.gsm || 'Export Quality'}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-serif line-clamp-1">{prod.title}</h4>
                      {prod.tagline && (
                        <p className="text-xs text-brand-700 font-bold mt-0.5 line-clamp-1 font-mono">{prod.tagline}</p>
                      )}
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-normal">
                        {prod.description}
                      </p>

                      {/* Technical Specs Tags */}
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-600 font-normal">
                        {prod.specs?.composition && (
                          <p><strong className="text-slate-800 font-semibold font-mono">Yarn / Weave:</strong> {prod.specs.composition}</p>
                        )}
                        {prod.specs?.leadTime && (
                          <p><strong className="text-slate-800 font-semibold font-mono">Lead Time:</strong> {prod.specs.leadTime}</p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenEditProduct(prod)}
                        className="flex-1 py-2 rounded-xl bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-xs font-bold border border-brand-200 hover:border-transparent flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
                        <span>Edit Product</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(prod)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-500 hover:text-white text-xs border border-slate-200 hover:border-rose-600 transition-all"
                        title="Delete product"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <FontAwesomeIcon icon={faBoxesStacked} className="text-4xl text-slate-300" />
                <h4 className="text-lg font-bold text-slate-900 font-serif">No Products Found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No items match the current search query or category filter. Try clearing filters or create a new product.
                </p>
                <button
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-brand-600 text-white font-bold text-xs inline-flex items-center gap-2 mt-2 shadow"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add First Product</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: CATEGORY MANAGER */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 max-w-4xl"
          >
            {/* Add Category Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faTags} className="text-brand-600 text-base" />
                <h3 className="text-lg font-bold text-slate-900 font-serif">Add New Textile Category</h3>
              </div>
              <p className="text-xs text-slate-600 font-normal">
                Categories are dynamically displayed in the navigation tabs and product filters across the entire website.
              </p>

              <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="text"
                  required
                  value={newCatLabel}
                  onChange={(e) => setNewCatLabel(e.target.value)}
                  placeholder="e.g. Institutional Towels &amp; Bath Robes"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-md hover:scale-[1.02] transition-all"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Create Category</span>
                </button>
              </form>
            </div>

            {/* Existing Categories List */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 font-serif">Active Product Categories</h3>
                <span className="text-xs text-slate-500">{categories.length} Categories Registered</span>
              </div>

              <div className="divide-y divide-slate-100">
                {categories.map((cat) => {
                  const isAll = cat.id === 'all';
                  const prodCount = isAll
                    ? products.length
                    : products.filter((p) => p.category === cat.id).length;
                  const isEditing = editingCatId === cat.id;

                  return (
                    <div key={cat.id} className="py-3.5 flex items-center justify-between gap-4">
                      {isEditing ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editingCatLabel}
                            onChange={(e) => setEditingCatLabel(e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-brand-500 text-slate-900 text-xs focus:outline-none"
                          />
                          <button
                            onClick={() => handleSaveEditCategory(cat.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
                          >
                            <FontAwesomeIcon icon={faCheck} className="mr-1" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCatId(null)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs hover:bg-slate-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-brand-600" />
                          <span className="text-sm font-semibold text-slate-900">{cat.label}</span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono border border-slate-200">
                            ID: {cat.id}
                          </span>
                          <span className="text-xs text-brand-700 font-bold font-mono">({prodCount} products)</span>
                        </div>
                      )}

                      {!isEditing && !isAll && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingCatId(cat.id);
                              setEditingCatLabel(cat.label);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs border border-slate-200"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-600 text-slate-500 hover:text-white text-xs border border-slate-200"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      )}

                      {isAll && (
                        <span className="text-[11px] text-slate-400 italic">System Default Filter</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: CONTENT & HERO DESCRIPTIONS */}
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 max-w-4xl"
          >
            <form onSubmit={handleSaveCompanyInfo} className="space-y-6">
              
              {/* Hero Banner Descriptions */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faStar} className="text-brand-600 text-base" />
                  <h3 className="text-lg font-bold text-slate-900 font-serif">Hero Banner &amp; Tagline Content</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hero Eyebrow Badge Text
                    </label>
                    <input
                      type="text"
                      value={companyFormData.eyebrow}
                      onChange={(e) =>
                        setCompanyFormData({ ...companyFormData, eyebrow: e.target.value })
                      }
                      placeholder="e.g. Vertically Integrated Textile Manufacturer & Exporter"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hero Section Supporting Description
                    </label>
                    <textarea
                      rows={4}
                      value={companyFormData.heroDescription}
                      onChange={(e) =>
                        setCompanyFormData({ ...companyFormData, heroDescription: e.target.value })
                      }
                      placeholder="Enter the main hero introductory paragraph shown under the headline..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Commercial Contacts & Addresses */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="text-brand-600 text-base" />
                  <h3 className="text-lg font-bold text-slate-900 font-serif">Commercial Export Desk &amp; Contacts</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Corporate Inquiry Email
                    </label>
                    <input
                      type="email"
                      value={companyFormData.contact.email}
                      onChange={(e) =>
                        setCompanyFormData({
                          ...companyFormData,
                          contact: { ...companyFormData.contact, email: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Commercial Number (Formatted)
                    </label>
                    <input
                      type="text"
                      value={companyFormData.contact.whatsapp}
                      onChange={(e) =>
                        setCompanyFormData({
                          ...companyFormData,
                          contact: { ...companyFormData.contact, whatsapp: e.target.value }
                        })
                      }
                      placeholder="+92 300 8472483"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Clean Number (No Spaces or +, for wa.me links)
                    </label>
                    <input
                      type="text"
                      value={companyFormData.contact.whatsappClean}
                      onChange={(e) =>
                        setCompanyFormData({
                          ...companyFormData,
                          contact: { ...companyFormData.contact, whatsappClean: e.target.value }
                        })
                      }
                      placeholder="923008472483"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Office Telephone
                    </label>
                    <input
                      type="text"
                      value={companyFormData.contact.phone}
                      onChange={(e) =>
                        setCompanyFormData({
                          ...companyFormData,
                          contact: { ...companyFormData.contact, phone: e.target.value }
                        })
                      }
                      placeholder="+92 42 3575 8891"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mill &amp; Head Office Address
                    </label>
                    <input
                      type="text"
                      value={companyFormData.contact.address}
                      onChange={(e) =>
                        setCompanyFormData({
                          ...companyFormData,
                          contact: { ...companyFormData.contact, address: e.target.value }
                        })
                      }
                      placeholder="Ferozepur Road Industrial Area, Lahore 54000, Pakistan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shimmer-sweep"
                >
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Save All Company Changes</span>
                </button>
              </div>

            </form>
          </motion.div>
        )}

        {/* TAB 5: BUYER INQUIRIES & RFQs */}
        {activeTab === 'inquiries' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">Submitted Buyer RFQs</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct commercial inquiries submitted via the website's RFQ forms.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-mono font-bold">
                {inquiries.length} Lead(s)
              </span>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-sm font-serif shrink-0 border border-brand-200">
                        {inq.name ? inq.name.charAt(0).toUpperCase() : 'B'}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{inq.name}</h4>
                        <p className="text-xs text-brand-700 font-semibold">{inq.company || 'Private Buyer'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faClock} className="text-xs text-slate-400" />
                        {inq.date}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                        {inq.status || 'Active'}
                      </span>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this inquiry record?')) {
                            deleteInquiry(inq.id);
                            showToast('Inquiry record deleted');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete inquiry"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>

                  {/* Detail Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-500 font-mono uppercase text-[10px] block">Contact Info</span>
                      <p className="text-slate-800 flex items-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope} className="text-brand-600 text-xs" />
                        <a href={`mailto:${inq.email}`} className="hover:text-brand-700 underline font-mono">
                          {inq.email}
                        </a>
                      </p>
                      {inq.phone && (
                        <p className="text-slate-800 flex items-center gap-2">
                          <FontAwesomeIcon icon={faPhone} className="text-emerald-600 text-xs" />
                          <span className="font-mono">{inq.phone}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-500 font-mono uppercase text-[10px] block">Order Requirements</span>
                      <p className="text-slate-800">
                        <strong className="text-slate-500">Category:</strong> {inq.category || 'General'}
                      </p>
                      <p className="text-slate-800">
                        <strong className="text-slate-500">Target Volume:</strong> {inq.volume || 'Not specified'}
                      </p>
                      {inq.port && (
                        <p className="text-slate-800">
                          <strong className="text-slate-500">Port:</strong> {inq.port}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 sm:col-span-1">
                      <span className="text-slate-500 font-mono uppercase text-[10px] block">Direct Merchandising</span>
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={`mailto:${inq.email}?subject=A%26H%20Impex%20RFQ%20Quote%20Response&body=Dear%20${inq.name},%0D%0A%0D%0AThank%20you%20for%20inquiring%20about%20textile%20manufacturing...`}
                          className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-600 hover:text-white text-brand-700 text-xs font-bold border border-brand-200 transition-colors inline-flex items-center gap-1.5 shadow-sm"
                        >
                          <FontAwesomeIcon icon={faEnvelope} />
                          <span>Reply via Email</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {inq.notes && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span className="text-slate-500 font-mono text-[10px] uppercase block mb-1 font-semibold">Buyer Notes &amp; Specs:</span>
                      <p className="leading-relaxed font-normal">{inq.notes}</p>
                    </div>
                  )}
                </div>
              ))}

              {inquiries.length === 0 && (
                <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <FontAwesomeIcon icon={faInbox} className="text-4xl text-slate-300" />
                  <h4 className="text-lg font-bold text-slate-900 font-serif">No Inquiries Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Commercial inquiries submitted through the website RFQ modal will show up here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsProductModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl relative my-8 text-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="text-base" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <FontAwesomeIcon icon={editingProduct ? faPenToSquare : faPlus} className="text-brand-600 text-sm" />
                <span className="text-xs font-bold text-brand-700 uppercase tracking-wider font-mono">
                  {editingProduct ? 'Edit Existing Item' : 'New Catalog Product'}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                {editingProduct ? `Edit "${editingProduct.title}"` : 'Add New Export Product Line'}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                
                {/* 1. Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={productFormData.title}
                      onChange={(e) => setProductFormData({ ...productFormData, title: e.target.value })}
                      placeholder="e.g. 500TC Giza Cotton Sateen Sheet Set"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Catalog Category *
                    </label>
                    <select
                      value={productFormData.category}
                      onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    >
                      {categories
                        .filter((c) => c.id !== 'all')
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* 2. Tagline & Quality Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tagline / Highlights
                    </label>
                    <input
                      type="text"
                      value={productFormData.tagline}
                      onChange={(e) => setProductFormData({ ...productFormData, tagline: e.target.value })}
                      placeholder="e.g. High-Density Luxury Weave for 5-Star Hospitality"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Quality Badge Label
                    </label>
                    <input
                      type="text"
                      value={productFormData.badge}
                      onChange={(e) => setProductFormData({ ...productFormData, badge: e.target.value })}
                      placeholder="e.g. Luxury Grade / Best Seller"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* 3. Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Export Product Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={productFormData.description}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                    placeholder="Enter thorough technical product description, finishing details, softness, export packaging..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-500 focus:bg-white leading-relaxed"
                  />
                </div>

                {/* 4. Image Upload or URL with Live Preview */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="block text-xs font-bold text-brand-700">
                    Product Image (Local File Upload or Web URL)
                  </span>

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* Live Preview Thumbnail */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 relative shadow-sm">
                      {productFormData.image ? (
                        <img
                          src={productFormData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 space-y-2 w-full">
                      {/* URL input */}
                      <div className="relative">
                        <FontAwesomeIcon icon={faLink} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                        <input
                          type="text"
                          value={productFormData.image}
                          onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                          placeholder="Paste image URL (https://...)"
                          className="w-full pl-8 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-brand-500"
                        />
                      </div>

                      {/* File Upload Trigger */}
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
                          className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 shadow-sm"
                        >
                          <FontAwesomeIcon icon={faUpload} />
                          <span>Upload From Computer</span>
                        </button>
                        <span className="text-[11px] text-slate-500">JPG, PNG, WebP supported</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Technical Specifications */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="block text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">
                    Technical Specifications
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-medium">Yarn / Composition</label>
                      <input
                        type="text"
                        value={productFormData.specs.composition}
                        onChange={(e) =>
                          setProductFormData({
                            ...productFormData,
                            specs: { ...productFormData.specs, composition: e.target.value }
                          })
                        }
                        placeholder="100% Cotton / 300TC"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-medium">GSM / Fabric Weight</label>
                      <input
                        type="text"
                        value={productFormData.specs.gsm}
                        onChange={(e) =>
                          setProductFormData({
                            ...productFormData,
                            specs: { ...productFormData.specs, gsm: e.target.value }
                          })
                        }
                        placeholder="140 GSM Sateen"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-medium">MOQ</label>
                      <input
                        type="text"
                        value={productFormData.specs.moq}
                        onChange={(e) =>
                          setProductFormData({
                            ...productFormData,
                            specs: { ...productFormData.specs, moq: e.target.value }
                          })
                        }
                        placeholder="500 Sets / Units"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-medium">Export Lead Time</label>
                      <input
                        type="text"
                        value={productFormData.specs.leadTime}
                        onChange={(e) =>
                          setProductFormData({
                            ...productFormData,
                            specs: { ...productFormData.specs, leadTime: e.target.value }
                          })
                        }
                        placeholder="30-45 Days"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shimmer-sweep"
                  >
                    {editingProduct ? 'Save Product Changes' : 'Create & Publish Product'}
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
