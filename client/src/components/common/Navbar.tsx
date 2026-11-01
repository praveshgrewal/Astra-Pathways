import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Sparkles, User, LogOut, LayoutDashboard, ChevronRight, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenAdvisorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdvisorModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, isStudent, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore Programs', href: '/programs' },
    { label: 'Learning Approach', href: '/learning-approach' },
    { label: 'Career Support', href: '/career-support' },
    { label: 'Resources', href: '/resources' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/50 py-2.5 border-b border-slate-200/90' 
          : 'bg-white/95 backdrop-blur-md py-3.5 border-b border-slate-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shadow-md shadow-blue-500/10 group-hover:border-[#4F7CFF]/60 transition-all">
              <img src="/logo.png" alt="Astra Pathways Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 font-sans">
                Astra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]">Pathways</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-semibold tracking-wider uppercase -mt-0.5">
                Practical EdTech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? 'text-[#4F7CFF] bg-blue-50/80 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons & Auth CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenAdvisorModal}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#4F7CFF]" />
              Talk to an Advisor
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/student/dashboard'}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] hover:opacity-95 shadow-md shadow-[#4F7CFF]/20 transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  {isAdmin ? 'Admin Panel' : 'Student Portal'}
                </Link>
                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/student/login"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
                >
                  <User className="w-3.5 h-3.5" />
                  Sign In
                </Link>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] hover:from-[#3d6bf0] hover:to-[#7c4bed] shadow-md shadow-[#4F7CFF]/25 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Explore Programs
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  isActive(link.href)
                    ? 'text-[#4F7CFF] bg-blue-50/80 font-semibold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvisorModal();
              }}
              className="w-full text-center text-sm font-semibold text-slate-700 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#4F7CFF]" />
              Talk to an Advisor
            </button>

            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/student/dashboard'}
                  className="w-full text-center text-sm font-bold text-white py-2.5 rounded-lg bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center gap-2 shadow-md shadow-[#4F7CFF]/20"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {isAdmin ? 'Admin Dashboard' : 'Student Portal'}
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-center text-xs text-red-500 py-2 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out ({user?.name})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/student/login"
                  className="text-center text-xs font-semibold text-slate-700 py-2.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/programs"
                  className="text-center text-xs font-bold text-white py-2.5 rounded-lg bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]"
                >
                  Explore Programs
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
