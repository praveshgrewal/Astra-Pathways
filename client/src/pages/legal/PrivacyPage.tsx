import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      <div className="bg-[#0B1020] text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#4F7CFF] font-semibold mb-2">
            <Shield className="w-4 h-4" /> Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Privacy Policy</h1>
          <p className="text-xs text-gray-400 mt-2">Last Updated: October 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">1. Introduction</h2>
            <p>
              Astra Pathways ("we", "our", or "us") respects your personal privacy and is committed to protecting the information you share with us. This Privacy Policy outlines our standards for collecting, using, and safeguarding information when you visit our website or interact with our learning services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">2. Information We Collect</h2>
            <p>We may collect information you voluntarily provide through inquiry forms, admissions discussions, or student registration, including:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Contact details such as your name, email address, and telephone number.</li>
              <li>Academic background, current technical experience, and program interests.</li>
              <li>Communication preferences and notes recorded during advisory consultations.</li>
              <li>Technical usage data including IP address, browser type, and operating system collected via standard access logs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">3. How We Use Your Information</h2>
            <p>Your information is used strictly to:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Respond to advisory inquiries and provide curriculum details.</li>
              <li>Administer student enrollment, track project submissions, and deliver learning support.</li>
              <li>Analyze web platform reliability and improve user experience.</li>
              <li>Comply with applicable legal and regulatory obligations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">4. No Commercial Sharing or Sale of Data</h2>
            <p>
              We do not sell, rent, or trade your personal information to third-party marketing companies. We only disclose information to authorized service providers bound by strict confidentiality agreements to deliver core platform services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">5. Security Standards</h2>
            <p>
              We implement industry-standard administrative, physical, and technical defenses to safeguard your personal data against unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">6. Contact Us</h2>
            <p>
              For privacy-related questions or data deletion requests, contact our team at{' '}
              <a href="mailto:privacy@astrapathways.com" className="text-[#4F7CFF] font-semibold underline">
                privacy@astrapathways.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
