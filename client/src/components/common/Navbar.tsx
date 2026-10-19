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
          ? 'glass-nav shadow-lg shadow-black/20 py-3' 
          : 'bg-[#0B1020]/95 backdrop-blur-md py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0B1020] border border-white/10 flex items-center justify-center shadow-lg shadow-[#4F7CFF]/10 group-hover:border-[#4F7CFF]/50 transition-all">
              <img src="/logo-icon.svg" alt="Astra Pathways Logo" className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-sans">
                Astra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]">Pathways</span>
              </span>
              <span className="block text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-0.5">
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
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
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
              className="text-xs font-semibold text-gray-200 hover:text-white px-3.5 py-2 rounded-lg border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all flex items-center gap-1.5"
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
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/student/login"
                  className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1"
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
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
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
        <div className="lg:hidden bg-[#0B1020]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvisorModal();
              }}
              className="w-full text-center text-sm font-semibold text-gray-200 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
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
                  className="w-full text-center text-xs text-red-400 py-2 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out ({user?.name})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/student/login"
                  className="text-center text-xs font-semibold text-gray-300 py-2.5 rounded-lg border border-white/10 bg-white/5"
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
