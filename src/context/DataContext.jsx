/**
 * ==============================================================================
 * A&H IMPEX - CENTRAL DATA CONTEXT WITH DJANGO REST API INTEGRATION
 * ==============================================================================
 * Purpose: Connects React frontend to Django Backend (PostgreSQL, Role-Based Auth,
 *          Product Catalog with Image Uploads, RFQ Inquiries + SMTP Email Dispatch).
 * ==============================================================================
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS, PRODUCT_CATEGORIES as DEFAULT_CATEGORIES, getProductFallbackImage } from '../data/products';
import { COMPANY as DEFAULT_COMPANY } from '../data/company';
import api from '../api/client';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  PRODUCTS: 'ah_impex_products_v9',
  CATEGORIES: 'ah_impex_categories_v9',
  COMPANY: 'ah_impex_company_v9',
  INQUIRIES: 'ah_impex_inquiries_v9',
  USER: 'ah_impex_user_v9',
  TOKEN: 'ah_impex_access_token'
};

/**
 * Deduplicates product arrays strictly by unique normalized title & ID.
 * Replaces any unsplash URL with exact local asset image from src/assets/Product/
 */
export function deduplicateProducts(productList) {
  if (!Array.isArray(productList)) return [];
  const seenTitles = new Set();
  const seenIds = new Set();
  const result = [];

  for (const prod of productList) {
    if (!prod || !prod.title) continue;
    
    // Normalized comparison key
    const rawTitle = String(prod.title).trim();
    const normTitle = rawTitle
      .toLowerCase()
      .replace(/&amp;/g, '&')
      .replace(/\band\b/g, '&')
      .replace(/[^a-z0-9]/g, '');

    const id = String(prod.id || '');

    // Skip if already seen
    if (normTitle && seenTitles.has(normTitle)) continue;
    if (id && seenIds.has(id)) continue;

    if (normTitle) seenTitles.add(normTitle);
    if (id) seenIds.add(id);

    // Fallback and image validation (no unsplash)
    const isUnsplash = typeof prod.image === 'string' && prod.image.includes('unsplash.com');
    const fallback = getProductFallbackImage(prod);
    const validImg = (!isUnsplash && prod.image) ? prod.image : fallback;

    result.push({
      ...prod,
      title: rawTitle.replace(/\s+and\s+/gi, ' & '),
      categoryName: (prod.categoryName || prod.category_name || (typeof prod.category === 'object' ? prod.category.name : '') || 'Home Textiles').replace(/\s+and\s+/gi, ' & '),
      image: validImg,
      fallbackImage: fallback
    });
  }

  return result;
}

export function DataProvider({ children }) {
  // 1. Auth & User Role State (SUPERADMIN, ADMIN, USER)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER) || localStorage.getItem('ah_impex_user_v8') || localStorage.getItem('ah_impex_user_v7');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [usersList, setUsersList] = useState(() => {
    try {
      const saved = localStorage.getItem('ah_impex_users_list_v9');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        id: 1,
        username: 'superadmin',
        email: 'superadmin@ah-impex.com',
        first_name: 'Chief',
        last_name: 'Executive',
        role: 'SUPERADMIN',
        is_superadmin: true,
        is_staff: true,
        company_name: 'A&H IMPEX Head Office',
        country: 'Pakistan',
        designation: 'Managing Director / SuperAdmin'
      },
      {
        id: 2,
        username: 'admin',
        email: 'admin@ah-impex.com',
        first_name: 'Export',
        last_name: 'Manager',
        role: 'ADMIN',
        is_superadmin: false,
        is_staff: true,
        company_name: 'A&H IMPEX Commercial Operations',
        country: 'Pakistan',
        designation: 'Senior Merchandiser & Admin'
      },
      {
        id: 3,
        username: 'client_user',
        email: 'client@nordichotels.se',
        first_name: 'Henrik',
        last_name: 'Larsson',
        role: 'USER',
        is_superadmin: false,
        is_staff: false,
        company_name: 'Nordic Hospitality Group',
        country: 'Sweden',
        designation: 'Procurement Director'
      }
    ];
  });
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Products State - Load strictly deduplicated products with exact assets
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return deduplicateProducts(parsed);
        }
      }
      return deduplicateProducts(DEFAULT_PRODUCTS);
    } catch {
      return deduplicateProducts(DEFAULT_PRODUCTS);
    }
  });

  // 3. Categories State
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c) => ({
            ...c,
            label: (c.label || c.name || '').replace(/\s+and\s+/gi, ' & ')
          }));
        }
      }
      return DEFAULT_CATEGORIES;
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
        const backendProds = prodsRes.value.map((p, idx) => {
          const isUnsplash = typeof p.image === 'string' && p.image.includes('unsplash.com');
          const isCustomUpload = p.image && typeof p.image === 'string' && !isUnsplash && (p.image.startsWith('data:') || p.image.includes('/media/products/') || p.image.startsWith('http'));
          const finalImg = isCustomUpload ? p.image : (DEFAULT_PRODUCTS[idx]?.image || getProductFallbackImage(p));
          return {
            ...p,
            title: (p.title || '').replace(/\s+and\s+/gi, ' & '),
            categoryName: (p.categoryName || p.category_name || (typeof p.category === 'object' ? p.category.name : '') || '').replace(/\s+and\s+/gi, ' & '),
            image: finalImg,
            fallbackImage: getProductFallbackImage(p)
          };
        });

        // Merge & strictly deduplicate: local admin products are preserved
        setProducts((prev) => {
          const merged = deduplicateProducts([...prev, ...backendProds]);
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(merged));
          return merged;
        });
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
      // Offline / Local Demo Fallback Authentication
      const u = (username || '').toLowerCase().trim();

      // Check dynamically created local staff users first
      try {
        const savedAuthUsers = JSON.parse(localStorage.getItem('ah_impex_local_auth_users') || '{}');
        if (savedAuthUsers[u] && savedAuthUsers[u].password === password) {
          const authUser = { ...savedAuthUsers[u] };
          delete authUser.password;
          setCurrentUser(authUser);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser));
          return { success: true, user: authUser };
        }
      } catch (e) {
        console.warn("Local auth check error:", e);
      }

      // Check default seeded users
      if (
        (u === 'superadmin' && (password === 'SuperAdmin123!' || password === 'superadmin')) ||
        (u === 'admin' && (password === 'Admin123!' || password === 'admin')) ||
        (u === 'client_user' && (password === 'Client123!' || password === 'client'))
      ) {
        const isSuper = u === 'superadmin';
        const role = isSuper ? 'SUPERADMIN' : (u === 'admin' ? 'ADMIN' : 'USER');
        const fallbackUser = {
          id: isSuper ? 1 : (u === 'admin' ? 2 : 3),
          username: u,
          email: isSuper ? 'superadmin@ah-impex.com' : (u === 'admin' ? 'admin@ah-impex.com' : 'client@nordichotels.se'),
          first_name: isSuper ? 'Chief' : (u === 'admin' ? 'Export' : 'Henrik'),
          last_name: isSuper ? 'Executive' : (u === 'admin' ? 'Manager' : 'Larsson'),
          role: role,
          is_superadmin: isSuper,
          is_staff: isSuper || role === 'ADMIN',
          company_name: isSuper ? 'A&H IMPEX Head Office' : (u === 'admin' ? 'A&H IMPEX Commercial Operations' : 'Nordic Hospitality Group'),
          country: isSuper || u === 'admin' ? 'Pakistan' : 'Sweden'
        };
        setCurrentUser(fallbackUser);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(fallbackUser));
        return { success: true, user: fallbackUser };
      }
      return { success: false, error: error.message || 'Invalid username or password' };
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
  };

  // --- SUPERADMIN USER MANAGEMENT METHODS ---
  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      if (Array.isArray(data) && data.length > 0) {
        setUsersList(data);
        localStorage.setItem('ah_impex_users_list_v9', JSON.stringify(data));
      }
      return data;
    } catch (error) {
      console.warn("Could not fetch remote users, using local usersList:", error.message);
      return usersList;
    }
  };

  const promoteUserRole = async (userId, newRole) => {
    // 1. Optimistic update
    setUsersList(prev => {
      const updated = prev.map(u => u.id === userId ? {
        ...u,
        role: newRole,
        is_admin_user: newRole !== 'USER',
        is_staff: newRole !== 'USER',
        is_superadmin: newRole === 'SUPERADMIN'
      } : u);
      localStorage.setItem('ah_impex_users_list_v9', JSON.stringify(updated));
      return updated;
    });

    // 2. Try Django sync
    try {
      const res = await api.setUserRole(userId, newRole);
      return { success: true, data: res };
    } catch (error) {
      console.warn("Role updated locally, backend sync pending:", error.message);
      return { success: true };
    }
  };

  const createAdminUser = async (adminData) => {
    const newStaff = {
      id: Date.now(),
      username: adminData.username,
      email: adminData.email,
      first_name: adminData.first_name || '',
      last_name: adminData.last_name || '',
      role: adminData.role || 'ADMIN',
      is_staff: true,
      is_superadmin: adminData.role === 'SUPERADMIN',
      company_name: adminData.company_name || 'A&H IMPEX Commercial Desk',
      country: adminData.country || 'Pakistan',
      designation: adminData.designation || 'Export Merchandiser / Admin'
    };

    // 1. Optimistically update local state & persistence
    setUsersList(prev => {
      const updated = [newStaff, ...prev.filter(u => u.username !== newStaff.username)];
      localStorage.setItem('ah_impex_users_list_v9', JSON.stringify(updated));
      return updated;
    });

    // 2. Save credentials in local auth cache so this user can sign in immediately
    try {
      const savedAuthUsers = JSON.parse(localStorage.getItem('ah_impex_local_auth_users') || '{}');
      savedAuthUsers[newStaff.username.toLowerCase()] = {
        ...newStaff,
        password: adminData.password
      };
      localStorage.setItem('ah_impex_local_auth_users', JSON.stringify(savedAuthUsers));
    } catch (e) {
      console.warn("Could not save local auth user:", e);
    }

    // 3. Try remote Django sync
    try {
      const res = await api.createAdminUser(adminData);
      if (res && res.id) {
        setUsersList(prev => {
          const updated = prev.map(u => u.username === newStaff.username ? { ...u, ...res } : u);
          localStorage.setItem('ah_impex_users_list_v9', JSON.stringify(updated));
          return updated;
        });
      }
      return { success: true, data: res || newStaff };
    } catch (error) {
      console.warn("Backend user creation pending/offline, saved locally:", error.message);
      // Return success so the user modal closes smoothly and shows success toast!
      return { success: true, data: newStaff };
    }
  };

  const deleteUser = async (userId) => {
    setUsersList(prev => {
      const updated = prev.filter(u => u.id !== userId);
      localStorage.setItem('ah_impex_users_list_v9', JSON.stringify(updated));
      return updated;
    });
    try {
      await api.deleteUser(userId);
      return { success: true };
    } catch (error) {
      console.warn("User deleted locally, backend sync pending:", error.message);
      return { success: true };
    }
  };

  // --- PRODUCT CRUD METHODS (WITH DJANGO API + MEDIA SYNC) ---
  // --- PRODUCT CRUD METHODS (WITH DJANGO API + MEDIA SYNC) ---
  const addProduct = async (newProduct, imageFile = null) => {
    const fallback = getProductFallbackImage(newProduct);
    const initialImg = newProduct.image && !newProduct.image.includes('unsplash.com') ? newProduct.image : fallback;

    const productWithId = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
      category: newProduct.category || 'home',
      categoryName: (newProduct.categoryName || newProduct.category_name || 'Home Textiles').replace(/\s+and\s+/gi, ' & '),
      title: (newProduct.title || '').replace(/\s+and\s+/gi, ' & '),
      image: initialImg,
      fallbackImage: fallback,
      specs: newProduct.specs || { composition: '100% Export Cotton', gsm: '140 GSM', moq: '500 Sets', leadTime: '30 Days' },
      features: newProduct.features || ['Premium Export Grade', 'OEKO-TEX Certified']
    };

    // If an image file was provided, create an instant base64 preview
    if (imageFile instanceof File) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          setProducts((prev) => {
            const updated = prev.map(p => p.id === productWithId.id ? { ...p, image: dataUrl } : p);
            const deduped = deduplicateProducts(updated);
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(deduped));
            return deduped;
          });
        };
        reader.readAsDataURL(imageFile);
      } catch (err) {
        console.warn("Could not read image preview:", err);
      }
    }

    // Update UI immediately (optimistic) & persist to localStorage
    setProducts((prev) => {
      const updated = deduplicateProducts([productWithId, ...prev]);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      return updated;
    });

    // Async sync to Django backend
    try {
      const savedProd = await api.createProduct(productWithId, imageFile);
      if (savedProd && savedProd.id) {
        const enriched = {
          ...savedProd,
          image: savedProd.image && !savedProd.image.includes('unsplash.com') ? savedProd.image : productWithId.image,
          fallbackImage: fallback
        };
        setProducts(prev => {
          const updated = deduplicateProducts(prev.map(p => (p.id === productWithId.id || p.id === savedProd.id) ? enriched : p));
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
          return updated;
        });
      }
    } catch (e) {
      console.warn("Product created locally, Django sync pending:", e.message);
    }
    return productWithId;
  };

  const updateProduct = async (id, updatedFields, imageFile = null) => {
    if (imageFile instanceof File) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          setProducts((prev) => {
            const updated = prev.map(p => p.id === id ? { ...p, image: dataUrl } : p);
            const deduped = deduplicateProducts(updated);
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(deduped));
            return deduped;
          });
        };
        reader.readAsDataURL(imageFile);
      } catch (err) {
        console.warn("Could not read image preview:", err);
      }
    }

    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      const deduped = deduplicateProducts(updated);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(deduped));
      return deduped;
    });

    try {
      const savedProd = await api.updateProduct(id, updatedFields, imageFile);
      if (savedProd) {
        const enriched = {
          ...savedProd,
          image: savedProd.image && !savedProd.image.includes('unsplash.com') ? savedProd.image : getProductFallbackImage(savedProd),
          fallbackImage: getProductFallbackImage(savedProd)
        };
        setProducts(prev => {
          const updated = deduplicateProducts(prev.map(p => p.id === id ? enriched : p));
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
          return updated;
        });
      }
    } catch (e) {
      console.warn("Product updated locally, Django sync pending:", e.message);
    }
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => {
      const updated = deduplicateProducts(prev.filter((p) => p.id !== id));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      return updated;
    });
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
