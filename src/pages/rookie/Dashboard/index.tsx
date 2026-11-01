import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { CourseEnrollment, ProgramEnrollment, EventRegistration } from '../../../types';
import { BookOpen, Calendar, Layers, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const RookieDashboard: React.FC = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<{
    courses: CourseEnrollment[];
    programs: ProgramEnrollment[];
    events: EventRegistration[];
  }>({ courses: [], programs: [], events: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getMyEnrollments();
        setEnrollments(data);
      } catch (err) {
        console.error('Failed to load student enrollments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalActive =
    enrollments.courses.filter((c) => c.status === 'ACTIVE').length +
    enrollments.programs.filter((p) => p.status === 'ACTIVE').length;

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="bg-[#030405] text-white p-6 sm:p-8 rounded-3xl border border-[#1E232B] relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#1656B6]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#3686C4]">
              ROOKIE LEARNER WORKSPACE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {user?.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
              Track your enrolled technical courses, upcoming webinars, and manage your hands-on laboratory schedule.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#030405] hover:bg-[#3686C4] hover:text-white transition-all text-xs font-extrabold tracking-wider uppercase shrink-0 shadow-md"
          >
            <span>Explore More Tracks</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E2E2] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0A2460]/10 text-[#0A2460] flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#030405]">{enrollments.courses.length}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Courses Enrolled</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E2E2] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1656B6]/10 text-[#1656B6] flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#030405]">{enrollments.programs.length}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Programs Active</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E2E2] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-[#030405]">{enrollments.events.length}</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Events Registered</p>
          </div>
        </div>
      </div>

      {/* Recent Enrolled Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#030405]">Recent Learning Tracks</h2>
          <Link to="/rookie/enrollments" className="text-xs font-bold text-[#1656B6] hover:underline">
            View All ({enrollments.courses.length})
          </Link>
        </div>

        {enrollments.courses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E2E2] p-8 text-center space-y-3">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No active course enrollments yet</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start mastering C++, Python, Data Structures, or Cloud by enrolling in our practical curriculums.
            </p>
            <Link
              to="/courses"
              className="inline-block mt-2 px-4 py-2 rounded-full bg-[#0A2460] text-white text-xs font-bold tracking-wider uppercase"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrollments.courses.slice(0, 4).map((enr) => (
              <div
                key={enr.id}
                className="bg-white p-5 rounded-2xl border border-[#E2E2E2] shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1656B6] bg-blue-50 px-2 py-0.5 rounded">
                      {enr.course?.level || 'Technical Track'}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      enr.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {enr.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#030405] line-clamp-1">
                    {enr.course?.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {enr.course?.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {enr.course?.duration}
                  </span>
                  <Link
                    to={`/courses/${enr.course?.slug}`}
                    className="font-bold text-[#1656B6] hover:underline"
                  >
                    Course Syllabus &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

