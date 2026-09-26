import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrown,
  faShieldHalved,
  faUser,
  faUserPlus,
  faTrash,
  faSearch,
  faEnvelope,
  faBuilding,
  faGlobe,
  faPhone,
  faRotateRight,
  faCheckCircle,
  faKey
} from '@fortawesome/free-solid-svg-icons';
import { useData } from '../../context/DataContext';

export default function UserManagerTab({ onToast }) {
  const { currentUser, isSuperAdmin, usersList, fetchUsers, promoteUserRole, createAdminUser, deleteUser } = useData();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

  // New Admin Form State
  const [newAdminData, setNewAdminData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company_name: 'A&H IMPEX Commercial Desk',
    country: 'Pakistan',
    designation: 'Export Merchandiser / Admin',
    role: 'ADMIN'
  });

  useEffect(() => {
    if (isSuperAdmin) {
      loadUsers();
    }
  }, [isSuperAdmin]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      await fetchUsers();
    } catch (e) {
      if (onToast) onToast('Failed to sync users with Django backend');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, targetUserRole, newRole) => {
    if (userId === currentUser?.id && newRole !== 'SUPERADMIN') {
      alert('SuperAdmin cannot demote their own account.');
      return;
    }

    if (window.confirm(`Are you sure you want to change this user's role from ${targetUserRole} to ${newRole}?`)) {
      const res = await promoteUserRole(userId, newRole);
      if (res.success) {
        if (onToast) onToast(`User role updated to ${newRole}`);
      } else {
        alert(res.error || 'Failed to update role');
      }
    }
  };

  const handleDeleteUser = async (userObj) => {
    if (userObj.id === currentUser?.id) {
      alert('You cannot delete your own account.');
      return;
    }

    if (window.confirm(`Are you sure you want to permanently delete user account "${userObj.username}"?`)) {
      const res = await deleteUser(userObj.id);
      if (res.success) {
        if (onToast) onToast(`User "${userObj.username}" deleted successfully`);
      } else {
        alert(res.error || 'Failed to delete user');
      }
    }
  };

  const handleCreateAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createAdminUser(newAdminData);
    setLoading(false);
    if (res.success) {
      setIsAddAdminModalOpen(false);
      setNewAdminData({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        company_name: 'A&H IMPEX Commercial Desk',
        country: 'Pakistan',
        designation: 'Export Merchandiser / Admin',
        role: 'ADMIN'
      });
      if (onToast) onToast(`New staff account "${res.data.username}" created successfully`);
    } else {
      alert(res.error || 'Failed to create Admin account');
    }
  };

  // Filtered users
  const filteredUsers = usersList.filter(u => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      u.username.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      (u.company_name && u.company_name.toLowerCase().includes(query)) ||
      (u.first_name && u.first_name.toLowerCase().includes(query)) ||
      (u.last_name && u.last_name.toLowerCase().includes(query));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* SuperAdmin Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <FontAwesomeIcon icon={faShieldHalved} className="text-slate-500" />
            <span>Staff &amp; Access Governance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            User Accounts &amp; Staff Roles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Manage staff credentials, allocate administrative privileges, &amp; review registered buyer access levels across the platform.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={loadUsers}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 shadow-sm transition-all"
          >
            <FontAwesomeIcon icon={faRotateRight} className={loading ? 'animate-spin' : ''} />
            <span>Sync Database</span>
          </button>

          <button
            onClick={() => setIsAddAdminModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white text-xs font-bold shadow-md flex items-center gap-2 shimmer-sweep"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Create New Admin</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by username, email, company, or name..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium font-mono">Role:</span>
          {['all', 'SUPERADMIN', 'ADMIN', 'USER'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                roleFilter === r
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {r === 'all' ? 'All' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">User Details</th>
                <th className="py-3 px-4">Company &amp; Country</th>
                <th className="py-3 px-4">Current Role</th>
                <th className="py-3 px-4">Role Action / Promotion</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 text-sm">
                    {loading ? 'Loading user data from PostgreSQL database...' : 'No users found matching your criteria.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrent = u.id === currentUser?.id;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* User Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            u.role === 'SUPERADMIN'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : u.role === 'ADMIN'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}>
                            <FontAwesomeIcon icon={
                              u.role === 'SUPERADMIN' ? faCrown : u.role === 'ADMIN' ? faShieldHalved : faUser
                            } />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{u.username}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 text-[10px] font-mono">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-slate-500 text-[11px] block">{u.email}</span>
                            {(u.first_name || u.last_name) && (
                              <span className="text-[10px] text-slate-400">
                                {u.first_name} {u.last_name} {u.designation ? `• ${u.designation}` : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Company & Country */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 block">{u.company_name || 'Individual / Buyer'}</span>
                        <span className="text-slate-400 text-[11px]">{u.country || 'Global'}</span>
                      </td>

                      {/* Current Role Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase ${
                          u.role === 'SUPERADMIN'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : u.role === 'ADMIN'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}>
                          <FontAwesomeIcon icon={u.role === 'SUPERADMIN' ? faCrown : u.role === 'ADMIN' ? faShieldHalved : faUser} className="text-[10px]" />
                          <span>{u.role}</span>
                        </span>
                      </td>

                      {/* Role Promotion Dropdown */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={u.role}
                            disabled={isCurrent}
                            onChange={(e) => handleRoleChange(u.id, u.role, e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold text-xs focus:outline-none focus:border-brand-500 shadow-sm disabled:opacity-50 disabled:bg-slate-100"
                          >
                            <option value="SUPERADMIN">👑 SUPERADMIN (Full Control)</option>
                            <option value="ADMIN">🛡️ ADMIN (Catalog &amp; Inquiries)</option>
                            <option value="USER">👤 USER (Standard Client)</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u)}
                          disabled={isCurrent}
                          title="Delete User Account"
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      {isAddAdminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative text-slate-800"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <FontAwesomeIcon icon={faUserPlus} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">Create New Staff Admin Account</h3>
                  <span className="text-[11px] text-slate-500">Grants administrative access to products &amp; RFQs</span>
                </div>
              </div>
              <button
                onClick={() => setIsAddAdminModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAdminSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    value={newAdminData.username}
                    onChange={(e) => setNewAdminData({ ...newAdminData, username: e.target.value })}
                    placeholder="e.g. export_manager"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newAdminData.email}
                    onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                    placeholder="manager@ah-impex.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-medium mb-1">Initial Password *</label>
                <input
                  type="password"
                  required
                  value={newAdminData.password}
                  onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    value={newAdminData.first_name}
                    onChange={(e) => setNewAdminData({ ...newAdminData, first_name: e.target.value })}
                    placeholder="Tariq"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newAdminData.last_name}
                    onChange={(e) => setNewAdminData({ ...newAdminData, last_name: e.target.value })}
                    placeholder="Mahmood"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-medium mb-1">Role Type</label>
                <select
                  value={newAdminData.role}
                  onChange={(e) => setNewAdminData({ ...newAdminData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-brand-500 font-bold"
                >
                  <option value="ADMIN">🛡️ Staff Admin (Catalog &amp; Inquiries)</option>
                  <option value="SUPERADMIN">👑 SuperAdmin (Executive Full Access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddAdminModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-brand-500 to-brand-600 hover:from-blue-500 hover:to-brand-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-cyan-500/25 transition-all shimmer-sweep disabled:opacity-50 active:scale-98"
                >
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
