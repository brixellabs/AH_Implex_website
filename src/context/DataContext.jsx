/**
 * ==============================================================================
 * A&H IMPEX - CENTRAL DATA CONTEXT WITH DJANGO REST API INTEGRATION
 * ==============================================================================
 * Purpose: Connects React frontend to Django Backend (PostgreSQL, Role-Based Auth,
 *          Product Catalog with Image Uploads, RFQ Inquiries + SMTP Email Dispatch).
 * ==============================================================================
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS, PRODUCT_CATEGORIES as DEFAULT_CATEGORIES } from '../data/products';
import { COMPANY as DEFAULT_COMPANY } from '../data/company';
import api from '../api/client';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  PRODUCTS: 'ah_impex_products',
  CATEGORIES: 'ah_impex_categories',
  COMPANY: 'ah_impex_company',
  INQUIRIES: 'ah_impex_inquiries',
  USER: 'ah_impex_user',
  TOKEN: 'ah_impex_access_token'
};

export function DataProvider({ children }) {
  // 1. Auth & User Role State (SUPERADMIN, ADMIN, USER)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [usersList, setUsersList] = useState([]);
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // 3. Categories State
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // 4. Company CMS Info State
  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY;
    } catch {
      return DEFAULT_COMPANY;
    }
  });

  // 5. Inquiries / RFQ State
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // --- INITIAL DATA FETCH FROM DJANGO BACKEND ---
  const fetchAllFromBackend = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Check health / fetch categories & products
      const [catsRes, prodsRes, companyRes] = await Promise.allSettled([
        api.getCategories(),
        api.getProducts(),
        api.getCompanyInfo()
      ]);

      let connected = false;

      if (catsRes.status === 'fulfilled' && Array.isArray(catsRes.value) && catsRes.value.length > 0) {
        // Map Django category format if needed
        const formattedCats = catsRes.value.map(c => ({
          id: c.slug || c.id,
          label: c.label,
          description: c.description || '',
          icon: c.icon || 'faBoxesStacked'
        }));
        setCategories(formattedCats);
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(formattedCats));
        connected = true;
      }

      if (prodsRes.status === 'fulfilled' && Array.isArray(prodsRes.value) && prodsRes.value.length > 0) {
        setProducts(prodsRes.value);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prodsRes.value));
        connected = true;
      }

      if (companyRes.status === 'fulfilled' && companyRes.value && companyRes.value.name) {
        setCompanyInfo(prev => ({
          ...prev,
          ...companyRes.value,
          contact: companyRes.value.contact || prev.contact,
          socials: companyRes.value.socials || prev.socials,
          stats: companyRes.value.stats || prev.stats
        }));
        localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyRes.value));
        connected = true;
      }

      // If user is authenticated, fetch inquiries from Django
      if (api.getAuthToken()) {
        try {
          const inqData = await api.getInquiries();
          if (Array.isArray(inqData)) {
            setInquiries(inqData);
            localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inqData));
          }
        } catch (e) {
          console.warn("Could not fetch user inquiries", e);
        }

        // If SuperAdmin, also fetch all users
        if (currentUser?.is_superadmin || currentUser?.role === 'SUPERADMIN') {
          try {
            const usersData = await api.getUsers();
            if (Array.isArray(usersData)) {
              setUsersList(usersData);
            }
          } catch (e) {
            console.warn("Could not fetch users list", e);
          }
        }
      }

      setIsBackendConnected(connected);
      setBackendStatus(connected ? 'System Operational' : 'Offline / Standby');
    } catch (err) {
      console.warn("Django backend sync error:", err);
      setIsBackendConnected(false);
      setBackendStatus('Local Standby');
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchAllFromBackend();
  }, [fetchAllFromBackend]);

  // --- AUTHENTICATION METHODS ---
  const login = async (username, password) => {
    try {
      const data = await api.login(username, password);
      setCurrentUser(data.user);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      // Re-fetch backend data with user token
      await fetchAllFromBackend();
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.register(userData);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    api.logout();
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUsersList([]);
  };

  // --- SUPERADMIN USER MANAGEMENT METHODS ---
  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      if (Array.isArray(data)) {
        setUsersList(data);
      }
      return data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  };

  const promoteUserRole = async (userId, newRole) => {
    try {
      const res = await api.setUserRole(userId, newRole);
      setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole, is_admin_user: newRole !== 'USER', is_superadmin: newRole === 'SUPERADMIN' } : u));
      return { success: true, data: res };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to update role' };
    }
  };

  const createAdminUser = async (adminData) => {
    try {
      const res = await api.createAdminUser(adminData);
      setUsersList(prev => [res, ...prev]);
      return { success: true, data: res };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to create admin' };
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.deleteUser(userId);
      setUsersList(prev => prev.filter(u => u.id !== userId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to delete user' };
    }
  };

  // --- PRODUCT CRUD METHODS (WITH DJANGO API + MEDIA SYNC) ---
  const addProduct = async (newProduct, imageFile = null) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
      specs: newProduct.specs || { composition: '', gsm: '', moq: '500 Sets', leadTime: '30 Days' },
      features: newProduct.features || ['Premium Export Grade', 'OEKO-TEX Certified']
    };

    // Update UI immediately (optimistic)
    setProducts((prev) => [productWithId, ...prev]);

    // Async sync to Django backend
    try {
      const savedProd = await api.createProduct(productWithId, imageFile);
      if (savedProd && savedProd.id) {
        setProducts(prev => prev.map(p => p.id === productWithId.id ? savedProd : p));
      }
    } catch (e) {
      console.warn("Product created locally, Django sync pending:", e.message);
    }
    return productWithId;
  };

  const updateProduct = async (id, updatedFields, imageFile = null) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    try {
      const savedProd = await api.updateProduct(id, updatedFields, imageFile);
      if (savedProd) {
        setProducts(prev => prev.map(p => p.id === id ? savedProd : p));
      }
    } catch (e) {
      console.warn("Product updated locally, Django sync pending:", e.message);
    }
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await api.deleteProduct(id);
    } catch (e) {
      console.warn("Product deleted locally, Django sync pending:", e.message);
    }
  };

  // --- CATEGORY CRUD METHODS ---
  const addCategory = async (newCat) => {
    const slug = newCat.id || newCat.slug || newCat.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categoryWithId = {
      id: slug,
      slug: slug,
      label: newCat.label,
      description: newCat.description || '',
      icon: newCat.icon || 'faBoxesStacked'
    };
    setCategories((prev) => [...prev, categoryWithId]);

    try {
      await api.createCategory(categoryWithId);
    } catch (e) {
      console.warn("Category created locally, Django sync pending:", e.message);
    }
    return categoryWithId;
  };

  const updateCategory = async (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    if (updatedFields.label) {
      setProducts((prev) =>
        prev.map((p) =>
          p.category === id ? { ...p, categoryName: updatedFields.label } : p
        )
      );
    }

    try {
      await api.updateCategory(id, updatedFields);
    } catch (e) {
      console.warn("Category updated locally, Django sync pending:", e.message);
    }
  };

  const deleteCategory = async (id) => {
    if (id === 'all') return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    try {
      await api.deleteCategory(id);
    } catch (e) {
      console.warn("Category deleted locally, Django sync pending:", e.message);
    }
  };

  // --- COMPANY CMS CONTENT METHODS ---
  const updateCompanyInfo = async (updatedFields) => {
    setCompanyInfo((prev) => ({
      ...prev,
      ...updatedFields,
    }));

    try {
      await api.updateCompanyInfo(updatedFields);
    } catch (e) {
      console.warn("Company info updated locally, Django sync pending:", e.message);
    }
  };

  // --- INQUIRY / RFQ SUBMISSION (EMAIL DISPATCH TRIGGER) ---
  const addInquiry = async (inquiryData) => {
    const newInq = {
      ...inquiryData,
      id: inquiryData.id || `inq-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'New'
    };

    setInquiries((prev) => [newInq, ...prev]);

    // Send to Django backend -> Triggers automated HTML email to Company & Client!
    try {
      const response = await api.submitInquiry(inquiryData);
      if (response && response.inquiry) {
        setInquiries(prev => prev.map(i => i.id === newInq.id ? response.inquiry : i));
        console.log("✅ RFQ Email dispatched to company desk via Django backend!");
      }
      return response;
    } catch (e) {
      console.warn("Inquiry stored locally, Django email dispatch offline:", e.message);
      return newInq;
    }
  };

  const updateInquiryStatus = async (id, status, internalNotes = '') => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status, internal_notes: internalNotes } : i));
    try {
      await api.updateInquiryStatus(id, status, internalNotes);
    } catch (e) {
      console.warn("Inquiry status updated locally:", e.message);
    }
  };

  const deleteInquiry = async (id) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    try {
      await api.deleteInquiry(id);
    } catch (e) {
      console.warn("Inquiry deleted locally:", e.message);
    }
  };

  // --- RESET ALL DATA ---
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
        // Auth & Roles
        currentUser,
        userRole: currentUser?.role || 'GUEST',
        isSuperAdmin: currentUser?.role === 'SUPERADMIN' || currentUser?.is_superadmin === true,
        isAdmin: currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPERADMIN' || currentUser?.is_admin_user === true,
        isRegularUser: currentUser?.role === 'USER',
        isAuthenticated: !!currentUser,
        usersList,
        backendStatus,
        isBackendConnected,
        isLoading,
        login,
        register,
        logout,
        fetchUsers,
        promoteUserRole,
        createAdminUser,
        deleteUser,

        // Data & CRUD
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
        updateInquiryStatus,
        deleteInquiry,
        resetAllData,
        fetchAllFromBackend,
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
