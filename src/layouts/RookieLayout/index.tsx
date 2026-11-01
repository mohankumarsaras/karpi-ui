import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Calendar, User, LogOut, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const RookieLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/rookie/dashboard', icon: CheckCircle2 },
    { name: 'My Enrollments', path: '/rookie/enrollments', icon: BookOpen },
    { name: 'Profile Settings', path: '/rookie/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#030405] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#030405] border-b border-[#1E232B] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-xs font-bold text-[#A0B6D6] hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Main Website</span>
            </Link>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <Link to="/rookie/dashboard" className="flex items-center gap-2 font-black tracking-widest text-sm text-white">
              <div className="w-4 h-4 border border-white rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#3686C4]" />
              </div>
              <span>KARPI <span className="text-[#3686C4] font-medium text-xs">ROOKIE</span></span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                alt={user?.fullName || 'Student'}
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-none">{user?.fullName}</p>
                <p className="text-[10px] text-[#A0B6D6] leading-tight mt-0.5">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors text-xs flex items-center gap-1.5"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Logout</span>
            </button>
          </div>
        </div>

        {/* Secondary Subnav */}
        <div className="bg-[#0B0D11] border-t border-[#1E232B]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#1656B6] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E2E2] py-4 text-center text-xs text-slate-500">
        KARPI Educational Platform &bull; Rookie Student Portal
      </footer>
    </div>
  );
};

