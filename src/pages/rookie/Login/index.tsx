import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

export const RookieLogin: React.FC = () => {
  const { loginWithGoogle, isAuthenticated, isRookie } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  React.useEffect(() => {
    if (isAuthenticated && isRookie) {
      navigate('/rookie/dashboard');
    }
  }, [isAuthenticated, isRookie, navigate]);

  // Production Google OAuth handler: receives credential JWT from Google Identity Services
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError('Google authentication was cancelled or returned empty credentials.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Send verified token to backend POST /api/v1/auth/google
      await loginWithGoogle(credentialResponse.credential);
      navigate('/rookie/dashboard');
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        'Authentication verification failed on the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-In failed or popup was closed. Please try again.');
  };

  // Fallback demo authentication for development environment when Client ID is not yet configured
  const handleDevDemoSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const mockPayload = {
        sub: 'google_user_' + Math.floor(Math.random() * 1000000),
        email: 'learner.student@gmail.com',
        name: 'College Tech Rookie',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        email_verified: true,
      };
      const token = `header.${btoa(JSON.stringify(mockPayload))}.signature`;
      await loginWithGoogle(token);
      navigate('/rookie/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Authentication failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030405] text-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background glow matching Dribbble reference */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1656B6]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#A0B6D6] hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0D11] border border-[#1E232B] text-[10px] font-bold tracking-widest text-[#3686C4] uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>STUDENT ROOKIE PORTAL</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Sign In with Google
          </h2>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
            Access your technical learning tracks, hands-on lab sessions, and manage your course enrollments.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[#0B0D11] py-8 px-6 sm:px-10 rounded-2xl border border-[#1E232B] shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* 1. Production Google Identity Services Button */}
            {googleClientId ? (
              <div className="flex justify-center w-full py-1">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="filled_black"
                  shape="pill"
                  size="large"
                  text="continue_with"
                  width="100%"
                />
              </div>
            ) : (
              /* When VITE_GOOGLE_CLIENT_ID is not yet set in .env */
              <div className="space-y-3">
                <button
                  onClick={handleDevDemoSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white text-[#030405] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
                </button>

                <p className="text-[10px] text-amber-400/90 text-center bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg">
                  Notice: Add <code>VITE_GOOGLE_CLIENT_ID</code> in <code>karpi-ui/.env</code> to load live Google OAuth prompt.
                </p>
              </div>
            )}

            <div className="pt-2 text-[11px] text-[#94A3B8] text-center leading-relaxed">
              By continuing, you agree to KARPI's educational terms. We securely retrieve your Google name, email, and avatar for automatic account provisioning.
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E232B] flex flex-col gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3686C4]" />
              <span>Instant enrollment in online & offline courses</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3686C4]" />
              <span>Track workshops, seminars, and bootcamps</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3686C4]" />
              <span>No manual passwords or account forms needed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
