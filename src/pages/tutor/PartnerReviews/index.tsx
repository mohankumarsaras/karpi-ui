import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { PartnerReview } from '../../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Building2 } from 'lucide-react';

export const TutorPartnerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<PartnerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Partial<PartnerReview> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await api.getAllPartnerReviewsAdmin();
      setReviews(res);
    } catch (err) {
      console.error('Failed to load partner reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleOpenCreate = () => {
    setEditingReview({
      partnerName: '',
      reviewerName: '',
      reviewerDesignation: '',
      reviewContent: '',
      isPublished: true,
      displayOrder: 0,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: PartnerReview) => {
    setEditingReview({ ...item });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    setSaving(true);
    try {
      if (editingReview.id) {
        await api.updatePartnerReview(editingReview.id, editingReview);
      } else {
        await api.createPartnerReview(editingReview);
      }
      setModalOpen(false);
      await fetchReviews();
    } catch (err: any) {
      alert('Failed to save partner review: ' + (err?.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      await api.deletePartnerReview(id);
      await fetchReviews();
    } catch (err: any) {
      alert('Failed to delete review: ' + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Corporate Partner Reviews</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Manage feedback and testimonials from collaborating colleges, universities, and industry partners.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1656B6] hover:bg-[#3686C4] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Partner Review</span>
        </button>
      </div>

      <div className="bg-[#0B0D11] rounded-2xl border border-[#1E232B] overflow-hidden shadow-bento-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A0B6D6]">
            <thead className="bg-[#07090D] border-b border-[#1E232B] uppercase text-[10px] tracking-wider text-[#94A3B8]">
              <tr>
                <th className="py-3 px-4">Partner Institution</th>
                <th className="py-3 px-4">Reviewer</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No partner reviews currently registered.
                  </td>
                </tr>
              ) : (
                reviews.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#3686C4]" />
                      <span>{r.partnerName}</span>
                    </td>
                    <td className="py-3.5 px-4">{r.reviewerName}</td>
                    <td className="py-3.5 px-4">{r.reviewerDesignation}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        r.isPublished ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {r.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#A0B6D6] hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id, r.partnerName)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && editingReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E232B]">
              <h3 className="text-base font-bold text-white">
                {editingReview.id ? 'Edit Partner Review' : 'Add Partner Review'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Partner Organization / College</label>
                <input
                  type="text"
                  required
                  value={editingReview.partnerName || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, partnerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                  placeholder="e.g. Coimbatore Institute of Technology"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Reviewer Name</label>
                  <input
                    type="text"
                    required
                    value={editingReview.reviewerName || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, reviewerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                    placeholder="e.g. Dr. K. Ramanathan"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Reviewer Designation</label>
                  <input
                    type="text"
                    required
                    value={editingReview.reviewerDesignation || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, reviewerDesignation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                    placeholder="e.g. Head of Placement & Training"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Review / Endorsement</label>
                <textarea
                  rows={4}
                  required
                  value={editingReview.reviewContent || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, reviewContent: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1E232B]">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-[#1656B6] text-white font-bold uppercase">
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

