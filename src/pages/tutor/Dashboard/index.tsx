import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { TutorDashboardOverview } from '../../../types';
import {
  Users,
  BookOpen,
  Layers,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TutorDashboard: React.FC = () => {
  const [data, setData] = useState<TutorDashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.getTutorOverview();
        setData(res);
      } catch (err) {
        console.error('Failed to load tutor dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-[#1656B6] border-t-white animate-spin" />
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalRookies: 0,
    totalCourses: 0,
    publishedCourses: 0,
    totalPrograms: 0,
    activePrograms: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalEnrollments: 0,
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Executive Corporate Dashboard</h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Real-time platform operations, verified students, curriculum publishing, and enrollment tracking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/tutor/courses"
            className="px-4 py-2 rounded-xl bg-[#1656B6] hover:bg-[#3686C4] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#1656B6]/20"
          >
            Manage Courses
          </Link>
          <Link
            to="/tutor/students"
            className="px-4 py-2 rounded-xl bg-[#0E1117] border border-[#1E232B] hover:border-[#3686C4] text-[#A0B6D6] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Review Students
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0B0D11] p-5 rounded-2xl border border-[#1E232B] shadow-bento-dark">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A0B6D6] uppercase tracking-wider">Total Rookies</span>
            <div className="w-8 h-8 rounded-lg bg-[#1656B6]/20 text-[#3686C4] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{metrics.totalRookies}</p>
          <p className="text-[11px] text-[#94A3B8] mt-1">Verified Google Accounts</p>
        </div>

        <div className="bg-[#0B0D11] p-5 rounded-2xl border border-[#1E232B] shadow-bento-dark">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A0B6D6] uppercase tracking-wider">Courses Active</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">
            {metrics.publishedCourses} <span className="text-xs text-[#94A3B8] font-normal">/ {metrics.totalCourses} total</span>
          </p>
          <p className="text-[11px] text-emerald-400 mt-1">Published in Catalog</p>
        </div>

        <div className="bg-[#0B0D11] p-5 rounded-2xl border border-[#1E232B] shadow-bento-dark">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A0B6D6] uppercase tracking-wider">Programs Active</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">
            {metrics.activePrograms} <span className="text-xs text-[#94A3B8] font-normal">/ {metrics.totalPrograms} total</span>
          </p>
          <p className="text-[11px] text-[#A0B6D6] mt-1">Coaching & Bootcamps</p>
        </div>

        <div className="bg-[#0B0D11] p-5 rounded-2xl border border-[#1E232B] shadow-bento-dark">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A0B6D6] uppercase tracking-wider">Total Enrollments</span>
            <div className="w-8 h-8 rounded-lg bg-[#3686C4]/20 text-[#3686C4] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3">{metrics.totalEnrollments}</p>
          <p className="text-[11px] text-[#94A3B8] mt-1">Across all tracks & events</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-wide">Recent Course & Program Enrollments</h2>
          <Link to="/tutor/students" className="text-xs font-bold text-[#3686C4] hover:underline flex items-center gap-1">
            <span>View All Students</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#0B0D11] rounded-2xl border border-[#1E232B] overflow-hidden shadow-bento-dark">
          {(!data?.recentActivity?.courses || data.recentActivity.courses.length === 0) ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No recent course enrollments recorded in the database.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#A0B6D6]">
                <thead className="bg-[#07090D] border-b border-[#1E232B] uppercase text-[10px] tracking-wider text-[#94A3B8]">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Track</th>
                    <th className="py-3 px-4">Enrolled At</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E232B]">
                  {data.recentActivity.courses.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5">
                        <img
                          src={item.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
                          alt={item.user?.fullName}
                          className="w-6 h-6 rounded-full object-cover border border-white/20"
                        />
                        <span>{item.user?.fullName}</span>
                      </td>
                      <td className="py-3.5 px-4">{item.course?.title}</td>
                      <td className="py-3.5 px-4">{new Date(item.createdAt).toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

