import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Course } from '../../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, Check, X } from 'lucide-react';

export const TutorCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Create / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchCourses = async () => {
    try {
      const list = await api.getCourses();
      setCourses(list);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenCreate = () => {
    setEditingCourse({
      title: '',
      slug: '',
      shortDescription: '',
      overview: '',
      level: 'Beginner',
      mode: 'Hybrid',
      duration: '6 Weeks',
      isPublished: true,
      isFeatured: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse({ ...course });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    setSaving(true);
    try {
      if (editingCourse.id) {
        await api.updateCourse(editingCourse.id, editingCourse);
      } else {
        await api.createCourse(editingCourse);
      }
      setModalOpen(false);
      await fetchCourses();
    } catch (err: any) {
      alert('Failed to save course: ' + (err?.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.deleteCourse(id);
      await fetchCourses();
    } catch (err: any) {
      alert('Failed to delete course: ' + (err?.response?.data?.message || err.message));
    }
  };

  const handleTogglePublish = async (course: Course) => {
    try {
      await api.updateCourse(course.id, { isPublished: !course.isPublished });
      await fetchCourses();
    } catch (err: any) {
      alert('Failed to update publishing status: ' + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Course Curriculum Management</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Create, edit, publish or archive technical engineering learning tracks.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1656B6] hover:bg-[#3686C4] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#1656B6]/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>

      <div className="bg-[#0B0D11] rounded-2xl border border-[#1E232B] overflow-hidden shadow-bento-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A0B6D6]">
            <thead className="bg-[#07090D] border-b border-[#1E232B] uppercase text-[10px] tracking-wider text-[#94A3B8]">
              <tr>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div>{course.title}</div>
                    <div className="text-[10px] font-normal text-slate-500">/{course.slug}</div>
                  </td>
                  <td className="py-3.5 px-4">{course.level}</td>
                  <td className="py-3.5 px-4">{course.mode}</td>
                  <td className="py-3.5 px-4">{course.duration}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(course)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        course.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                      }`}
                    >
                      {course.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{course.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(course)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#A0B6D6] hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id, course.title)}
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

      {/* Edit / Create Course Modal */}
      {modalOpen && editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E232B]">
              <h3 className="text-base font-bold text-white">
                {editingCourse.id ? 'Edit Course' : 'Create New Course Track'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none focus:border-[#3686C4]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={editingCourse.slug || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none focus:border-[#3686C4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Skill Level</label>
                  <select
                    value={editingCourse.level || 'Beginner'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none focus:border-[#3686C4]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Learning Mode</label>
                  <select
                    value={editingCourse.mode || 'Hybrid'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, mode: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none focus:border-[#3686C4]"
                  >
                    <option value="Online Live">Online Live</option>
                    <option value="Offline Classroom">Offline Classroom</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.duration || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none focus:border-[#3686C4]"
                    placeholder="e.g. 8 Weeks"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Short Summary</label>
                <textarea
                  rows={2}
                  value={editingCourse.shortDescription || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none focus:border-[#3686C4]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Curriculum Overview</label>
                <textarea
                  rows={3}
                  value={editingCourse.overview || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, overview: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030405] border border-[#1E232B] text-white focus:outline-none focus:border-[#3686C4]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCourse.isPublished ?? true}
                    onChange={(e) => setEditingCourse({ ...editingCourse, isPublished: e.target.checked })}
                    className="rounded text-[#1656B6] focus:ring-0"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#1E232B]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#1656B6] hover:bg-[#3686C4] text-white font-bold uppercase tracking-wider"
                >
                  {saving ? 'Saving...' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

