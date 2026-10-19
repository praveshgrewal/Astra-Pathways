import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileCheck } from 'lucide-react';

export const RefundsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      <div className="bg-[#0B1020] text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#4F7CFF] font-semibold mb-2">
            <FileCheck className="w-4 h-4" /> Academic Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Enrollment Terms & Policies</h1>
          <p className="text-xs text-gray-400 mt-2">Last Updated: October 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">1. Enrollment Confirmation</h2>
            <p>
              Program enrollment is confirmed upon registration through the admissions portal and receipt of confirmed scheduling details. Enrolled students receive access to corresponding learning modules, lab environments, and mentor office hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">2. Program Deferral & Schedule Adjustments</h2>
            <p>
              We understand that unforeseen life events arise. Learners in good academic standing may request a one-time cohort deferral by notifying academic operations at least seven (7) days prior to the start of a module.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">3. Transparent Educational Terms</h2>
            <p>
              Astra Pathways operates with complete educational transparency:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
              <li>Course curricula focus on practical, project-based skill development.</li>
              <li>Career support and placement assistance are preparatory support services, not guarantees of employment.</li>
              <li>For any specific administrative questions, contact academic advisement at admissions@astrapathways.com.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
