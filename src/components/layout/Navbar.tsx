import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, User, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isRookie, isTutor } = useAuth();

  const navLinks = [
    { name: 'COURSES', path: '/courses' },
    { name: 'PROGRAMS', path: '/programs' },
    { name: 'EVENTS', path: '/events' },
    { name: 'ABOUT US', path: '/about' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030405]/95 backdrop-blur-md border-b border-[#1E232B]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with polygon/geometric icon as in reference */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-5 h-5 border border-white/80 rotate-45 flex items-center justify-center transition-transform group-hover:rotate-90 duration-300">
              <div className="w-2 h-2 bg-[#3686C4]"></div>
            </div>
            <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-white">
              KARPI.EDU
            </span>
          </Link>

          {/* Centered micro uppercase links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-bold tracking-[0.18em] transition-colors py-1 ${
                  isActive(link.path)
                    ? 'text-white border-b-2 border-[#3686C4]'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action: Clean Portal button + Pill action */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to={isTutor ? '/tutor/dashboard' : '/rookie/dashboard'}
                className="text-[11px] font-bold tracking-wider px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5"
              >
                {isTutor ? <Shield className="w-3.5 h-3.5 text-[#3686C4]" /> : <User className="w-3.5 h-3.5 text-[#3686C4]" />}
                <span>{isTutor ? 'TUTOR PORTAL' : 'MY DASHBOARD'}</span>
              </Link>
            ) : (
              <Link
                to="/rookie/login"
                className="text-[11px] font-bold tracking-wider px-3.5 py-1.5 rounded-full text-[#A0B6D6] hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>STUDENT LOGIN</span>
              </Link>
            )}

            <button
              onClick={onOpenEnquiry}
              className="text-[11px] font-bold tracking-wider px-4 py-2 rounded-full bg-white text-[#030405] hover:bg-[#3686C4] hover:text-white transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>ENROL NOW</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile button & toggle */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <Link
                to={isTutor ? '/tutor/dashboard' : '/rookie/dashboard'}
                className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white"
              >
                PORTAL
              </Link>
            ) : (
              <Link
                to="/rookie/login"
                className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full text-slate-300 border border-[#1E232B]"
              >
                LOGIN
              </Link>
            )}

            <button
              onClick={onOpenEnquiry}
              className="text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full bg-white text-[#030405] active:scale-95 transition-transform"
            >
              ENROL
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#94A3B8] hover:text-white focus:outline-none rounded-lg hover:bg-[#101318]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0D11] border-b border-[#1E232B] px-5 py-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 px-3 rounded-lg text-xs font-bold tracking-widest transition-colors ${
                isActive(link.path)
                  ? 'bg-[#101318] text-[#3686C4]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#101318]'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2 border-t border-[#1E232B]/60 space-y-2">
            <Link
              to={isAuthenticated ? (isTutor ? '/tutor/dashboard' : '/rookie/dashboard') : '/rookie/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold tracking-wider uppercase"
            >
              {isAuthenticated ? 'Open Portal Workspace' : 'Student Sign In (Google)'}
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full text-center py-2.5 rounded-lg bg-[#3686C4] text-white text-xs font-bold tracking-wider uppercase"
            >
              ENROL NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
