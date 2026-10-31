import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { api } from '../../services/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await api.submitContact({
        fullName: 'Newsletter Subscriber',
        email,
        subject: 'Newsletter Subscription',
        message: 'Subscribed to KARPI technical newsletter.',
      });
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#030405] text-[#94A3B8] border-t border-[#1E232B] relative overflow-hidden">
      {/* Top Footer Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#1E232B]/80">
          {/* Brand & Links */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-5 h-5 border border-white/80 rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#3686C4]"></div>
              </div>
              <span className="text-sm font-black tracking-[0.2em] text-white">
                KARPI.EDU
              </span>
            </Link>
            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              Modern computer science and software engineering platform. Practical hands-on training, online classes, and career guidance.
            </p>
            <div className="pt-2 flex items-center gap-6 text-[11px] font-bold tracking-widest text-[#94A3B8]">
              <Link to="/courses" className="hover:text-white transition-colors">COURSES</Link>
              <Link to="/programs" className="hover:text-white transition-colors">PROGRAMS</Link>
              <Link to="/events" className="hover:text-white transition-colors">EVENTS</Link>
              <Link to="/about" className="hover:text-white transition-colors">ABOUT US</Link>
            </div>
          </div>

          {/* LET'S CONNECT Form (Matching reference design) */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-[0.2em] text-[#3686C4] uppercase block mb-1">
              CONNECT
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              LET'S CONNECT
            </h3>
            <p className="text-xs text-[#94A3B8] mb-5">
              Receive batch notifications, workshop schedules, and technical roadmaps.
            </p>

            {subscribed ? (
              <p className="text-xs text-emerald-400 font-bold">Thank you for connecting with KARPI.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-[#0B0D11] border border-[#1E232B] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#3686C4]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold rounded-lg bg-white text-[#030405] hover:bg-[#3686C4] hover:text-white transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  SUBSCRIBE
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Small Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#626262] tracking-wider uppercase">
          <p>© {new Date().getFullYear()} KARPI. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 mt-2 sm:mt-0">
            <span>TERMS</span>
            <span>PRIVACY</span>
            <Link to="/about#contact" className="hover:text-white transition-colors">CAMPUS CONTACT</Link>
          </div>
        </div>
      </div>

      {/* GIANT LUMINOUS BLUE WAVE AT BOTTOM */}
      <div className="relative w-full h-36 sm:h-56 overflow-hidden pointer-events-none mt-4">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1656B6] via-[#0A2460] to-transparent opacity-85"></div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-[#3686C4]/60 blur-[90px] rounded-full animate-wave-glow"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl sm:text-8xl md:text-9xl font-black tracking-widest text-white/15 select-none uppercase">
            KARPI
          </span>
        </div>
      </div>
    </footer>
  );
};
