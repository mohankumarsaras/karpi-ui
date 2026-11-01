import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Testimonial } from '../../../types';
import { Plus, Edit2, Trash2, Star, Eye, EyeOff, X } from 'lucide-react';

export const TutorTestimonials: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await api.getTestimonials();
      setItems(res);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem({
      studentName: '',
      roleOrCollege: '',
      content: '',
      rating: 5,
      isPublished: true,
      displayOrder: 0,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingItem({ ...t });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    try {
      if (editingItem.id) {
        await api.updateTestimonial(editingItem.id, editingItem);
      } else {
        await api.createTestimonial(editingItem);
      }
      setModalOpen(false);
      await fetchTestimonials();
    } catch (err: any) {
      alert('Failed to save testimonial: ' + (err?.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      await api.deleteTestimonial(id);
      await fetchTestimonials();
    } catch (err: any) {
      alert('Failed to delete testimonial: ' + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Testimonials Management</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Curate authentic feedback, ratings, and student reviews published across the website.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1656B6] hover:bg-[#3686C4] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Testimonial</span>
        </button>
      </div>

      <div className="bg-[#0B0D11] rounded-2xl border border-[#1E232B] overflow-hidden shadow-bento-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A0B6D6]">
            <thead className="bg-[#07090D] border-b border-[#1E232B] uppercase text-[10px] tracking-wider text-[#94A3B8]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">College / Role</th>
                <th className="py-3 px-4">Feedback Preview</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5">
                    <img
                      src={item.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
                      alt={item.studentName}
                      className="w-7 h-7 rounded-full object-cover border border-white/20"
                    />
                    <span>{item.studentName}</span>
                  </td>
                  <td className="py-3.5 px-4">{item.roleOrCollege}</td>
                  <td className="py-3.5 px-4 max-w-xs truncate">{item.content}</td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating || 5}.0</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#A0B6D6] hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.studentName)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E232B]">
              <h3 className="text-base font-bold text-white">
                {editingItem.id ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.studentName || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, studentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">College or Job Designation</label>
                <input
                  type="text"
                  required
                  value={editingItem.roleOrCollege || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, roleOrCollege: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                  placeholder="e.g. B.Tech CSE, PSG Tech"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Testimonial Content</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.content || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1E232B]">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-[#1656B6] text-white font-bold uppercase">
                  {saving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

