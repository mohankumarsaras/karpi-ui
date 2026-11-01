import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { User } from '../../../types';
import { Search, ShieldAlert, CheckCircle2, UserX, UserCheck, Eye, X } from 'lucide-react';

export const TutorStudents: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const fetchStudents = async () => {
    try {
      const res = await api.getRookies({ search: search.trim() || undefined });
      setStudents(res);
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const handleToggleStatus = async (user: User) => {
    const nextStatus = !user.isActive;
    const confirmMsg = nextStatus
      ? `Reactivate account for ${user.fullName}?`
      : `Suspend account for ${user.fullName}? They will not be able to log in or enroll.`;

    if (!window.confirm(confirmMsg)) return;

    try {
      await api.updateRookieStatus(user.id, nextStatus);
      await fetchStudents();
    } catch (err: any) {
      alert('Failed to update student status: ' + (err?.response?.data?.message || err.message));
    }
  };

  const handleViewDetail = async (id: string) => {
    try {
      const detail = await api.getRookieDetail(id);
      setSelectedStudent(detail);
    } catch (err: any) {
      alert('Failed to load student details');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Rookie Student Directory</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Manage authenticated students, inspect course participations, and control account active states.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B0D11] border border-[#1E232B] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#3686C4]"
          />
        </div>
      </div>

      <div className="bg-[#0B0D11] rounded-2xl border border-[#1E232B] overflow-hidden shadow-bento-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#A0B6D6]">
            <thead className="bg-[#07090D] border-b border-[#1E232B] uppercase text-[10px] tracking-wider text-[#94A3B8]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">College / Institution</th>
                <th className="py-3 px-4">Total Enrollments</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E232B]">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5">
                      <img
                        src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
                        alt={student.fullName}
                        className="w-7 h-7 rounded-full object-cover border border-white/20"
                      />
                      <span>{student.fullName}</span>
                    </td>
                    <td className="py-3.5 px-4">{student.email}</td>
                    <td className="py-3.5 px-4">{student.collegeName || '—'}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 font-bold text-white">
                        {student.enrollmentsCount || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        student.isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {student.isActive ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleViewDetail(student.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#A0B6D6] hover:text-white transition-colors"
                        title="View Enrollments History"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(student)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          student.isActive
                            ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                        }`}
                        title={student.isActive ? 'Suspend Account' : 'Reactivate Account'}
                      >
                        {student.isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Inspection Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0D11] border border-[#1E232B] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E232B]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={selectedStudent.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-[#1656B6]"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedStudent.fullName}</h3>
                  <p className="text-xs text-[#94A3B8]">{selectedStudent.email} &bull; {selectedStudent.phoneNumber || 'No phone'}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                Enrolled Courses ({selectedStudent.courses?.length || 0})
              </h4>
              <div className="divide-y divide-[#1E232B] bg-[#07090D] rounded-xl border border-[#1E232B] p-2">
                {selectedStudent.courses?.map((c: any) => (
                  <div key={c.id} className="p-2 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{c.course?.title}</p>
                      <p className="text-[10px] text-slate-500">Enrolled: {new Date(c.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase">
                      {c.status}
                    </span>
                  </div>
                ))}
                {(!selectedStudent.courses || selectedStudent.courses.length === 0) && (
                  <div className="p-3 text-center text-slate-500">No course enrollments</div>
                )}
              </div>

              <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] pt-2">
                Programs & Event Passes ({ (selectedStudent.programs?.length || 0) + (selectedStudent.events?.length || 0) })
              </h4>
              <div className="divide-y divide-[#1E232B] bg-[#07090D] rounded-xl border border-[#1E232B] p-2">
                {selectedStudent.programs?.map((p: any) => (
                  <div key={p.id} className="p-2 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{p.program?.title}</p>
                      <p className="text-[10px] text-slate-500">Program Track</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                      {p.status}
                    </span>
                  </div>
                ))}
                {selectedStudent.events?.map((ev: any) => (
                  <div key={ev.id} className="p-2 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{ev.event?.title}</p>
                      <p className="text-[10px] text-slate-500">Event Pass &bull; {ev.event?.mode}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 font-bold uppercase">
                      {ev.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#1E232B]">
              <button onClick={() => setSelectedStudent(null)} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

