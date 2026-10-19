import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Sparkles, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const user = await login({ email, password });
      if (user.role !== 'admin') {
        throw new Error('Access denied. Administrator privileges required.');
      }
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid administrative credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdminFill = async () => {
    setEmail('admin@astrapathways.com');
    setPassword('AdminPass123!');
    setLoading(true);
    setErrorMessage('');
    try {
      await login({
        email: 'admin@astrapathways.com',
        password: 'AdminPass123!'
      });
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed admin login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#0B1020] border border-white/20 flex items-center justify-center shadow-lg shadow-[#8B5CF6]/20">
            <img src="/logo-icon.svg" alt="Astra Logo" className="w-8 h-8" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Astra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]">Pathways</span>
          </span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30 mb-2">
          <Shield className="w-3.5 h-3.5" /> Operations Console
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Administrative Portal
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Restricted access for academic administrators and content managers
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0B1020]/90 backdrop-blur-xl py-8 px-6 sm:px-10 rounded-3xl border border-white/10 shadow-2xl">
          
          {/* Quick Demo Fill Pill */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/15 to-[#4F7CFF]/15 border border-[#8B5CF6]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-200">
              <span className="flex items-center gap-1.5 text-[#8B5CF6]">
                <Sparkles className="w-3.5 h-3.5" /> Authorized Testing Account
              </span>
              <span className="text-[11px] text-gray-400">Pre-seeded Admin</span>
            </div>
            <button
              type="button"
              onClick={handleDemoAdminFill}
              disabled={loading}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#4F7CFF] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" /> One-Click Sign In as Administrator
            </button>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@astrapathways.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] text-white text-sm placeholder-gray-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] text-white text-sm placeholder-gray-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#4F7CFF] text-white font-bold text-sm hover:opacity-95 disabled:opacity-50 transition-all shadow-md shadow-[#8B5CF6]/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Access Admin Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
            <span>Looking for student courses? </span>
            <Link to="/student/login" className="text-[#4F7CFF] hover:underline font-semibold">
              Student Portal
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
