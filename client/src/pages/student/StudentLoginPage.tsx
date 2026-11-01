import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, User, Lock, Mail, Phone, ArrowRight, 
  AlertCircle, CheckCircle2, ShieldCheck, KeyRound 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentLoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (isRegister) {
        await register({ name, email, password, phone });
      } else {
        await login({ email, password });
      }
      navigate('/student/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudentLogin = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await login({
        email: 'student@madyanholdings.com',
        password: 'StudentPass123!'
      });
      navigate('/student/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-slate-900 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background ambient flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#4F7CFF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shadow-md group-hover:border-[#4F7CFF]/60 transition-all">
            <img src="/logo.png" alt="Astra Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Astra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]">Pathways</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {isRegister ? 'Create Your Student Account' : 'Student Learning Portal'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isRegister 
            ? 'Access practical curricula, milestone projects, and learning resources' 
            : 'Sign in to access your enrolled programs, progress, and assignments'}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 shadow-xl">
          
          {/* Quick Demo Login Pill */}
          {!isRegister && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#4F7CFF]/10 to-[#8B5CF6]/10 border border-[#4F7CFF]/20 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-[#4F7CFF]">
                  <Sparkles className="w-3.5 h-3.5" /> Instant Evaluation
                </span>
                <span className="text-[11px] text-slate-500">Pre-seeded track</span>
              </div>
              <button
                type="button"
                onClick={handleDemoStudentLogin}
                disabled={loading}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" /> One-Click Sign In as Demo Student (Alex)
              </button>
            </div>
          )}

          {/* Toggle Tab */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                !isRegister ? 'bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white shadow' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isRegister ? 'bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white shadow' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Register
            </button>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm placeholder-slate-400 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="student@madyanholdings.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm placeholder-slate-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm placeholder-slate-400 transition-colors"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4F7CFF] focus:outline-none focus:ring-2 focus:ring-blue-100 text-slate-900 text-sm placeholder-slate-400 transition-colors"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white font-bold text-sm hover:opacity-95 disabled:opacity-50 transition-all shadow-md shadow-[#4F7CFF]/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isRegister ? 'Create Student Account' : 'Sign In to Portal'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Are you a platform administrator? </span>
            <Link to="/admin/login" className="text-[#4F7CFF] hover:underline font-semibold">
              Admin Console
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
