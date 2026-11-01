import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ArrowLeft, Lock, Shield, AlertCircle } from 'lucide-react';

export const TutorLogin: React.FC = () => {
  const { loginTutor, isAuthenticated, isTutor } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('karpi-admin');
  const [password, setPassword] = useState('KarpiAdmin@2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isAuthenticated && isTutor) {
      navigate('/tutor/dashboard');
    }
  }, [isAuthenticated, isTutor, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginTutor({ username, password });
      navigate('/tutor/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid administrative credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030405] text-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1656B6]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#A0B6D6] hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0D11] border border-[#1E232B] text-[10px] font-bold tracking-widest text-[#3686C4] uppercase">
            <Shield className="w-3 h-3" />
            <span>CORPORATE TUTOR LOGIN</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Administrator Access
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
            Authorized administrative access for KARPI platform operations and content management.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[#0B0D11] py-8 px-6 sm:px-10 rounded-2xl border border-[#1E232B] shadow-2xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#A0B6D6] uppercase tracking-wider mb-1.5">
                Username or Corporate Email
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030405] border border-[#1E232B] text-white text-xs focus:outline-none focus:border-[#3686C4]"
                placeholder="karpi-admin"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A0B6D6] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030405] border border-[#1E232B] text-white text-xs focus:outline-none focus:border-[#3686C4]"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1656B6] hover:bg-[#3686C4] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 mt-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? 'Verifying...' : 'Sign In as Tutor'}</span>
            </button>
          </form>

          <div className="pt-3 border-t border-[#1E232B] text-center text-[10px] text-slate-500">
            Internal corporate credentials only. Registration is restricted to administrative personnel.
          </div>
        </div>
      </div>
    </div>
  );
};

