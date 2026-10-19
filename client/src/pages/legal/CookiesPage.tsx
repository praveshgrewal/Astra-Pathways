import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';

export const CookiesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      <div className="bg-[#0B1020] text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#4F7CFF] font-semibold mb-2">
            <Cookie className="w-4 h-4" /> Technical Policies
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Cookie Policy</h1>
          <p className="text-xs text-gray-400 mt-2">Last Updated: October 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your browser or device when you navigate web applications. They allow websites to remember user preferences, maintain authenticated sessions, and measure platform responsiveness.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">2. Cookies We Use</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li>
                <strong className="text-[#0B1020]">Essential Cookies:</strong> Required to authenticate users and enable secure portal navigation. Disabling these prevents login.
              </li>
              <li>
                <strong className="text-[#0B1020]">Functional Preferences:</strong> Store dismissal states for announcements and active learning dashboard configurations.
              </li>
              <li>
                <strong className="text-[#0B1020]">Anonymous Performance Telemetry:</strong> Help us measure page response times and fix broken routes without identifying individual users.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">3. Managing Cookies</h2>
            <p>
              You can configure your browser to decline or clear cookies at any time. Note that clearing authentication tokens will require signing in again to access the student portal or admin console.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
