/**
 * ==============================================================================
 * A&H IMPEX - CENTRAL DATA CONTEXT & PERSISTENCE
 * ==============================================================================
 * Purpose: Centralized state manager for products, categories, company content,
 *          and submitted RFQ inquiries with automatic localStorage persistence.
 * ==============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS, PRODUCT_CATEGORIES as DEFAULT_CATEGORIES } from '../data/products';
import { COMPANY as DEFAULT_COMPANY } from '../data/company';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  PRODUCTS: 'ah_impex_products',
  CATEGORIES: 'ah_impex_categories',
  COMPANY: 'ah_impex_company',
  INQUIRIES: 'ah_impex_inquiries',
};

export function DataProvider({ children }) {
  // 1. Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // 2. Categories State
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // 3. Company Info State
  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY;
    } catch {
      return DEFAULT_COMPANY;
    }
  });

  // 4. Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : [
        {
          id: 'inq-101',
          name: 'Henrik Larsson',
          company: 'Nordic Hospitality Group (Sweden)',
          email: 'h.larsson@nordichotels.se',
          phone: '+46 8 123 4567',
          category: 'Hospitality & Dining',
          productTitle: 'Hotel & Resort Luxury Linens',
          volume: '1x 20ft Container (FCL)',
          port: 'Port of Gothenburg / Sweden',
          notes: 'Looking for 300TC white sateen duvet covers and 600 GSM bath sheet samples.',
          date: '2026-09-22 14:30',
          status: 'Under Review'
        }
      ];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories to localStorage', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyInfo));
    } catch (e) {
      console.error('Failed to save company info to localStorage', e);
    }
  }, [companyInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to localStorage', e);
    }
  }, [inquiries]);

  // --- PRODUCT CRUD METHODS ---
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
      specs: newProduct.specs || { composition: '', gsm: '', moq: '500 Sets', leadTime: '30 Days' },
      features: newProduct.features || ['Premium Export Grade', 'OEKO-TEX Certified']
    };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // --- CATEGORY CRUD METHODS ---
  const addCategory = (newCat) => {
    const slug = newCat.id || newCat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categoryWithId = {
      id: slug,
      label: newCat.label,
    };
    setCategories((prev) => [...prev, categoryWithId]);
    return categoryWithId;
  };

  const updateCategory = (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    // Also update categoryName in matching products
    if (updatedFields.label) {
      setProducts((prev) =>
        prev.map((p) =>
          p.category === id ? { ...p, categoryName: updatedFields.label } : p
        )
      );
    }
  };

  const deleteCategory = (id) => {
    if (id === 'all') return; // Cannot delete "All"
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // --- COMPANY CONTENT METHODS ---
  const updateCompanyInfo = (updatedFields) => {
    setCompanyInfo((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  // --- INQUIRY METHODS ---
  const addInquiry = (inquiryData) => {
    const newInq = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'New'
    };
    setInquiries((prev) => [newInq, ...prev]);
    return newInq;
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  // --- FACTORY RESET ---
  const resetAllData = () => {
    setProducts(DEFAULT_PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
    setCompanyInfo(DEFAULT_COMPANY);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.COMPANY);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  };

  return (
    <DataContext.Provider
      value={{
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
        addInquiry,
        deleteInquiry,
        resetAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
