import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Footer } from './components/common/Footer';
import { EnquiryModal } from './components/common/EnquiryModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { AboutPage } from './pages/AboutPage';
import { LearningApproachPage } from './pages/LearningApproachPage';
import { CareerSupportPage } from './pages/CareerSupportPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';

// Legal Pages
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { CookiesPage } from './pages/legal/CookiesPage';
import { RefundsPage } from './pages/legal/RefundsPage';

// Student Portal Pages
import { StudentLoginPage } from './pages/student/StudentLoginPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentPrograms } from './pages/student/StudentPrograms';
import { StudentAssignments } from './pages/student/StudentAssignments';

// Admin Portal Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminPrograms } from './pages/admin/AdminPrograms';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminStudents } from './pages/admin/AdminStudents';

// Scroll to top on navigation helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Student Route
const ProtectedStudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center text-white">
        <span className="w-8 h-8 border-2 border-[#4F7CFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace />;
  }
  return <>{children}</>;
};

// Protected Admin Route
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1020] flex items-center justify-center text-white">
        <span className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

// 404 Fallback Page
const NotFoundPage: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F5F7FC] text-[#0B1020] px-4 text-center">
    <span className="text-6xl font-black text-[#4F7CFF] mb-2">404</span>
    <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
    <p className="text-sm text-gray-500 max-w-sm mb-6">
      The pathway or document you are seeking does not exist or has been relocated.
    </p>
    <Link
      to="/"
      className="px-6 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
    >
      Return to Home
    </Link>
  </div>
);

export function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProgram, setModalProgram] = useState<string | undefined>(undefined);
  const location = useLocation();

  const handleOpenAdvisorModal = (programTitle?: string) => {
    setModalProgram(programTitle);
    setModalOpen(true);
  };

  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FC] selection:bg-[#4F7CFF] selection:text-white">
      <ScrollToTop />
      
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Global Navigation Bar */}
      <Navbar onOpenAdvisorModal={() => handleOpenAdvisorModal()} />

      {/* Page Content */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage onOpenAdvisorModal={handleOpenAdvisorModal} />} />
          <Route path="/programs" element={<ProgramsPage onOpenAdvisorModal={handleOpenAdvisorModal} />} />
          <Route path="/programs/:id" element={<ProgramDetailPage onOpenAdvisorModal={handleOpenAdvisorModal} />} />
          <Route path="/about" element={<AboutPage onOpenAdvisorModal={() => handleOpenAdvisorModal()} />} />
          <Route path="/learning-approach" element={<LearningApproachPage onOpenAdvisorModal={() => handleOpenAdvisorModal()} />} />
          <Route path="/career-support" element={<CareerSupportPage onOpenAdvisorModal={() => handleOpenAdvisorModal()} />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage onOpenAdvisorModal={() => handleOpenAdvisorModal()} />} />

          {/* Legal Routes */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/refunds" element={<RefundsPage />} />

          {/* Student Portal Routes */}
          <Route path="/student/login" element={<StudentLoginPage />} />
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedStudentRoute>
                <StudentDashboard />
              </ProtectedStudentRoute>
            } 
          />
          <Route 
            path="/student/programs" 
            element={
              <ProtectedStudentRoute>
                <StudentPrograms />
              </ProtectedStudentRoute>
            } 
          />
          <Route 
            path="/student/assignments" 
            element={
              <ProtectedStudentRoute>
                <StudentAssignments />
              </ProtectedStudentRoute>
            } 
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/leads" 
            element={
              <ProtectedAdminRoute>
                <AdminLeads />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/programs" 
            element={
              <ProtectedAdminRoute>
                <AdminPrograms />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/content" 
            element={
              <ProtectedAdminRoute>
                <AdminContent />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/students" 
            element={
              <ProtectedAdminRoute>
                <AdminStudents />
              </ProtectedAdminRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      {!isAdminRoute && <Footer />}

      {/* Global Reusable Advisory Inquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialProgram={modalProgram}
      />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
