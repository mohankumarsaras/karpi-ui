import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Program } from '../../../types';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

export const TutorPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPrograms = async () => {
    try {
      const list = await api.getPrograms();
      setPrograms(list);
    } catch (err) {
      console.error('Failed to load programs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenCreate = () => {
    setEditingProgram({
      title: '',
      slug: '',
      type: 'Online Live Classes',
      shortDescription: '',
      detailedDescription: '',
      deliveryFormat: 'Interactive Virtual Sessions',
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prog: Program) => {
    setEditingProgram({ ...prog });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;
    setSaving(true);
    try {
      if (editingProgram.id) {
        await api.updateProgram(editingProgram.id, editingProgram);
      } else {
        await api.createProgram(editingProgram);
      }
      setModalOpen(false);
      await fetchPrograms();
    } catch (err: any) {
      alert('Failed to save program: ' + (err?.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.deleteProgram(id);
      await fetchPrograms();
    } catch (err: any) {
      alert('Failed to delete program: ' + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Coaching & Training Programs</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Manage comprehensive educational initiatives (Seminars, Online Live, Campus Coaching).
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1656B6] hover:bg-[#3686C4] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#1656B6]/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Program</span>
        </button>
      </div>

      <div className="bg-[#0B0D11] rounded-2xl border border-[#1E232B] overflow-hidden shadow-bento-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A0B6D6]">
            <thead className="bg-[#07090D] border-b border-[#1E232B] uppercase text-[10px] tracking-wider text-[#94A3B8]">
              <tr>
                <th className="py-3 px-4">Program Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {programs.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div>{item.title}</div>
                    <div className="text-[10px] font-normal text-slate-500">/{item.slug}</div>
                  </td>
                  <td className="py-3.5 px-4">{item.type}</td>
                  <td className="py-3.5 px-4">{item.deliveryFormat}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      item.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
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
                      onClick={() => handleDelete(item.id, item.title)}
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

      {modalOpen && editingProgram && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E232B]">
              <h3 className="text-base font-bold text-white">
                {editingProgram.id ? 'Edit Program' : 'Create New Program'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingProgram.title || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={editingProgram.slug || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Program Classification</label>
                <input
                  type="text"
                  required
                  value={editingProgram.type || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                  placeholder="e.g. Online Live Classes, Technical Seminars"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProgram.shortDescription || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={editingProgram.detailedDescription || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, detailedDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#1E232B]">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-[#1656B6] text-white font-bold uppercase">
                  {saving ? 'Saving...' : 'Save Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

