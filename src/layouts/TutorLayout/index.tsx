import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Calendar,
  Users,
  MessageSquareQuote,
  Star,
  LogOut,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';

export const TutorLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/tutor/dashboard', icon: LayoutDashboard },
    { name: 'Courses', path: '/tutor/courses', icon: BookOpen },
    { name: 'Programs', path: '/tutor/programs', icon: Layers },
    { name: 'Events', path: '/tutor/events', icon: Calendar },
    { name: 'Students', path: '/tutor/students', icon: Users },
    { name: 'Testimonials', path: '/tutor/testimonials', icon: MessageSquareQuote },
    { name: 'Partner Reviews', path: '/tutor/partner-reviews', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#030405] text-[#F8FAFC] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#07090D] border-r border-[#1E232B] flex flex-col shrink-0">
        {/* Brand */}
        <div className="p-5 border-b border-[#1E232B] flex items-center justify-between">
          <Link to="/tutor/dashboard" className="flex items-center gap-2.5">
            <div className="w-5 h-5 border border-white rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#3686C4]" />
            </div>
            <div>
              <span className="text-sm font-black tracking-widest text-white block">KARPI</span>
              <span className="text-[10px] font-bold text-[#3686C4] tracking-wider uppercase block">Tutor Corporate</span>
            </div>
          </Link>
          <Link to="/" title="View Live Website" className="text-[#94A3B8] hover:text-white p-1 rounded hover:bg-white/5">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#1656B6] text-white shadow-md shadow-[#1656B6]/20'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-[#1E232B] bg-[#0B0D11]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#1656B6]/30 border border-[#3686C4] flex items-center justify-center font-bold text-xs text-white shrink-0">
                TA
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.fullName || 'Tutor Admin'}</p>
                <p className="text-[10px] text-[#A0B6D6] truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0D11]/40">
        <header className="h-16 border-b border-[#1E232B] px-6 flex items-center justify-between bg-[#07090D]/50 backdrop-blur-sm">
          <div className="text-xs font-bold text-[#A0B6D6] uppercase tracking-wider">
            {location.pathname.replace('/tutor/', '').replace('/', ' > ') || 'Dashboard'}
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ACTIVE
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

