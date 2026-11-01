import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { CourseEnrollment, ProgramEnrollment, EventRegistration } from '../../../types';
import { BookOpen, Layers, Calendar, AlertCircle, X, CheckCircle2 } from 'lucide-react';

export const RookieEnrollments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'programs' | 'events'>('courses');
  const [data, setData] = useState<{
    courses: CourseEnrollment[];
    programs: ProgramEnrollment[];
    events: EventRegistration[];
  }>({ courses: [], programs: [], events: [] });
  const [loading, setLoading] = useState(true);

  // Cancellation Modal State
  const [cancellingItem, setCancellingItem] = useState<{
    type: 'courses' | 'programs' | 'events';
    id: string;
    title: string;
  } | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchEnrollments = async () => {
    try {
      const res = await api.getMyEnrollments();
      setData(res);
    } catch (err) {
      console.error('Failed to fetch enrollments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellingItem) return;
    setActionLoading(true);
    try {
      if (cancellingItem.type === 'courses') {
        await api.cancelCourseEnrollment(cancellingItem.id, cancelReason);
      } else if (cancellingItem.type === 'programs') {
        await api.cancelProgramEnrollment(cancellingItem.id, cancelReason);
      } else if (cancellingItem.type === 'events') {
        await api.cancelEventRegistration(cancellingItem.id, cancelReason);
      }
      setSuccessMsg(`Successfully cancelled enrollment for ${cancellingItem.title}`);
      setCancellingItem(null);
      setCancelReason('');
      await fetchEnrollments();
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to cancel enrollment');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#030405] tracking-tight">My Enrollments & Schedule</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your enrolled courses, coaching programs, and confirmed seminar passes.
        </p>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#E2E2E2] gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'courses'
              ? 'border-[#1656B6] text-[#1656B6]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Courses ({data.courses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('programs')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'programs'
              ? 'border-[#1656B6] text-[#1656B6]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Programs ({data.programs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'events'
              ? 'border-[#1656B6] text-[#1656B6]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events & Webinars ({data.events.length})</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {data.courses.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-[#E2E2E2]">
              You have not enrolled in any courses yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-subtle">
              {data.courses.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1656B6] bg-blue-50 px-2 py-0.5 rounded">
                        {item.course?.mode || 'Hybrid'}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        item.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.status === 'CANCELLED'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#030405]">{item.course?.title}</h3>
                    <p className="text-xs text-slate-500">Duration: {item.course?.duration} &bull; Enrolled: {new Date(item.createdAt).toLocaleDateString()}</p>
                    {item.cancellationReason && (
                      <p className="text-[11px] text-rose-500">Reason: {item.cancellationReason}</p>
                    )}
                  </div>

                  {item.status !== 'CANCELLED' && item.status !== 'COMPLETED' && (
                    <button
                      onClick={() => setCancellingItem({ type: 'courses', id: item.id, title: item.course?.title || 'Course' })}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                    >
                      Cancel Enrollment
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'programs' && (
        <div className="space-y-4">
          {data.programs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-[#E2E2E2]">
              You have not enrolled in any programs yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-subtle">
              {data.programs.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {item.status}
                    </span>
                    <h3 className="text-sm font-bold text-[#030405]">{item.program?.title}</h3>
                    <p className="text-xs text-slate-500">Type: {item.program?.type} &bull; Enrolled: {new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>

                  {item.status !== 'CANCELLED' && (
                    <button
                      onClick={() => setCancellingItem({ type: 'programs', id: item.id, title: item.program?.title || 'Program' })}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                    >
                      Cancel Enrollment
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          {data.events.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-[#E2E2E2]">
              You have not registered for any events yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-subtle">
              {data.events.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {item.status}
                    </span>
                    <h3 className="text-sm font-bold text-[#030405]">{item.event?.title}</h3>
                    <p className="text-xs text-slate-500">
                      Date: {item.event?.eventDate ? new Date(item.event.eventDate).toLocaleDateString() : 'TBD'} &bull; Format: {item.event?.mode}
                    </p>
                  </div>

                  {item.status !== 'CANCELLED' && (
                    <button
                      onClick={() => setCancellingItem({ type: 'events', id: item.id, title: item.event?.title || 'Event' })}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                    >
                      Cancel Pass
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancellingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#030405]">Cancel Enrollment</h3>
              <button onClick={() => setCancellingItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel your enrollment in <strong>{cancellingItem.title}</strong>? Your participation slot will be released.
            </p>

            <form onSubmit={handleCancelSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reason (Optional)</label>
                <textarea
                  rows={2}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Schedule clash with university exams"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E2E2E2] focus:outline-none focus:ring-1 focus:ring-[#1656B6]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCancellingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Keep Enrolled
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
                >
                  {actionLoading ? 'Processing...' : 'Confirm Cancellation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

