import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { User, Phone, School, Mail, Calendar, CheckCircle2 } from 'lucide-react';

export const RookieProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [collegeName, setCollegeName] = useState(user?.collegeName || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const updated = await api.updateRookieProfile({ phoneNumber, collegeName });
      updateUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err: any) {
      alert('Failed to update profile: ' + (err?.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#030405] tracking-tight">Rookie Student Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Your identity is verified through Google OAuth. Update optional college or contact details below.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Verified Google Account Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E2E2] shadow-subtle space-y-4">
        <h3 className="text-xs font-bold text-[#1656B6] uppercase tracking-wider">
          Verified Google Identity
        </h3>

        <div className="flex items-center gap-4">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={user?.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#1656B6]"
          />
          <div>
            <h4 className="text-base font-bold text-[#030405]">{user?.fullName}</h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.email}</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded ml-1">
                Verified
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member'}
            </p>
          </div>
        </div>
      </div>

      {/* Editable Student Information Form */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E2E2] shadow-subtle space-y-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          College & Contact Details
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E2E2] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              College or Institution (Optional)
            </label>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="e.g. PSG College of Technology, Coimbatore"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#E2E2E2] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-[#0A2460] hover:bg-[#1656B6] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

