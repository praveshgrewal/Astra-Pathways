import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      <div className="bg-[#0B1020] text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#4F7CFF] font-semibold mb-2">
            <Shield className="w-4 h-4" /> Legal & Terms
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Terms & Conditions</h1>
          <p className="text-xs text-gray-400 mt-2">Last Updated: October 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Astra Pathways website, learning portal, or educational resources, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">2. Nature of Educational Services & Career Support</h2>
            <p>
              Astra Pathways provides industry-oriented skill instruction, practical project assignments, and career support services. You explicitly acknowledge and agree that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
              <li>Astra Pathways does not provide or guarantee job placement, employment outcomes, interviews, or specific salary levels.</li>
              <li>Placement assistance refers exclusively to advisory services such as resume reviews, mock interviews, portfolio presentation advice, and job-search strategy.</li>
              <li>Employment outcomes depend entirely on individual student dedication, competency, eligibility criteria, and employer hiring decisions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">3. Intellectual Property Rights</h2>
            <p>
              All curriculum designs, syllabi, software code exercises, written tutorials, videos, and branding elements remain the exclusive intellectual property of Astra Pathways. Learners retain full ownership of their original project code submitted during assignments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">4. Academic Integrity & Student Conduct</h2>
            <p>
              Learners agree to conduct themselves professionally and submit authentic, original work. Plagiarism, disruptive behavior in mentorship sessions, or unauthorized distribution of course materials will result in immediate termination of portal access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0B1020]">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Astra Pathways shall not be liable for any indirect, incidental, or consequential damages resulting from the use of or inability to use our platform or educational materials.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
