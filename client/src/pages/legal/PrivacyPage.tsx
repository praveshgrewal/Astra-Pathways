import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Server, CheckCircle2, UserCheck, FileText, AlertCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B1020] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-2 uppercase tracking-wider">
            <Shield className="w-4 h-4" /> Data Governance & Security
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Privacy & Data Security Policy</h1>
          <p className="text-sm text-gray-300 mt-3 max-w-2xl leading-relaxed">
            Explaining how Astra Pathways collects, uses, shares, protects, and retains personal information, alongside our internal Data Privacy and Security standards.
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400">
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Effective Date</span>
              <span className="font-semibold text-white">October 28, 2026</span>
            </div>
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Privacy Contact</span>
              <span className="font-semibold text-white">info@astrapathways.net</span>
            </div>
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Commercial Data Sale</span>
              <span className="font-semibold text-emerald-400">Strictly Prohibited (Zero Sale)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        
        {/* Document Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-12 text-sm sm:text-base text-gray-700 leading-relaxed">
          
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-600 space-y-1.5">
            <p><strong>Company:</strong> Astra Pathways (operating under Madyan Holdings)</p>
            <p><strong>Registered Address:</strong> 30 N Gould St, STE N, Sheridan, WY, USA - 82801</p>
            <p><strong>Privacy Contact:</strong> <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline font-semibold">info@astrapathways.net</a></p>
          </div>

          {/* ================= PART 1: PRIVACY POLICY ================= */}
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4F7CFF] bg-[#4F7CFF]/10 px-3 py-1 rounded-full">Part I</span>
              <h2 className="text-2xl font-black text-[#0B1020] mt-2">Privacy Policy</h2>
            </div>

            {/* 1. Information We Collect */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">1. Information We Collect</h3>
              <p>We may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li><strong>Identity and contact information:</strong> Name, email address, phone number, mailing address, date of birth, and government-issued identification where required for verification.</li>
                <li><strong>Enrollment information:</strong> Program selected, cohort, enrollment date, education background, employment history, skills, certifications, and career goals.</li>
                <li><strong>Payment information:</strong> Payment method, transaction history, invoices, refunds, installment schedule, and financing status. We do not store full card numbers or CVV codes on our systems.</li>
                <li><strong>Career-support information:</strong> Resume, portfolio links, work samples, job preferences, interview feedback, employer communications, and application-tracking records.</li>
                <li><strong>Learning information:</strong> Course progress, attendance, assignments, assessments, project submissions, session participation, and support requests.</li>
                <li><strong>Technical information:</strong> IP address, browser type, device information, pages visited, cookies, and analytics data.</li>
              </ul>
            </section>

            {/* 2. How We Use Information */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">2. How We Use Information</h3>
              <p>We use personal information to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                <li>Process enrollments, payments, refunds, and installment billing.</li>
                <li>Deliver training, student support, and career services.</li>
                <li>Communicate about cohorts, schedules, assignments, payments, and account matters.</li>
                <li>Provide resume, portfolio, interview, and job-search support.</li>
                <li>Share student profiles with potential employers <em>only with the student’s documented consent</em>.</li>
                <li>Improve our programs, website, marketing, and customer experience.</li>
                <li>Prevent fraud, misuse, and unauthorized access.</li>
                <li>Comply with legal, tax, accounting, and regulatory obligations.</li>
              </ul>
            </section>

            {/* 3. Legal Basis and Consent */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">3. Legal Basis and Consent</h3>
              <p>We process personal information based on: your consent; performance of our enrollment agreement; legitimate business interests (such as service improvement and fraud prevention); and legal or regulatory obligations.</p>
              <p className="text-xs text-gray-500">
                We obtain separate opt-in consent for marketing messages, employer-profile sharing, session recordings, testimonials, and optional data uses. You may withdraw consent for future optional uses by emailing <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline">info@astrapathways.net</a>.
              </p>
            </section>

            {/* 4. Sharing of Information */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">4. Sharing of Information</h3>
              <p>We may share personal information with:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Payment processors and Finance Partners to process payments, refunds, and financing.</li>
                <li>Learning-management, CRM, email, cloud-hosting, communication, and analytics providers.</li>
                <li>Employers or recruiting partners, only with the student’s explicit authorization.</li>
                <li>Professional advisers, auditors, insurers, and legal representatives.</li>
                <li>Government authorities, where required by applicable law.</li>
                <li>Successors in connection with a merger, acquisition, financing, or asset sale.</li>
              </ul>
              <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold">
                We do not sell students’ personal information under any circumstances.
              </div>
            </section>

            {/* 5. Cookies and Tracking */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">5. Cookies and Tracking</h3>
              <p>
                We use essential cookies for website security, login, checkout, and fraud prevention. We may also use analytics and marketing cookies to understand website performance and measure campaigns. You may manage cookie preferences through our cookie banner or browser settings.
              </p>
            </section>

            {/* 6. Data Retention */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">6. Data Retention</h3>
              <p>We retain personal information only as long as necessary for the purposes described in this policy:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Enrollment, payment, invoice, and tax records are retained for the period required by applicable law.</li>
                <li>Learning and career-support data are retained while the student is active and for <strong>24 months</strong> after program completion, unless a longer period is required for legal, dispute, audit, or regulatory purposes.</li>
                <li>Marketing data are retained until the individual unsubscribes or requests deletion.</li>
              </ul>
            </section>

            {/* 7. Your Privacy Rights */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">7. Your Privacy Rights</h3>
              <p>Depending on your state or country of residence, you may have rights to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Request access to your personal information.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of personal information, subject to legal retention requirements.</li>
                <li>Request a copy of your data in a portable format.</li>
                <li>Opt out of marketing communications.</li>
                <li>Withdraw consent for optional data uses.</li>
              </ul>
              <p className="text-xs text-gray-500">
                To exercise these rights, email <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline">info@astrapathways.net</a>. We may verify your identity before processing the request.
              </p>
            </section>

            {/* 8, 9, 10, 11, 12 */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">8. Children's Privacy</h3>
              <p className="text-sm text-gray-600">
                Astra Pathways is not directed to children under 13. We do not knowingly collect personal information from children under 13 without verifiable parental consent.
              </p>

              <h3 className="text-lg font-bold text-gray-900">9. Data Security</h3>
              <p className="text-sm text-gray-600">
                We use administrative, technical, and physical safeguards including role-based access controls, MFA for administrative access, encryption in transit (HTTPS/TLS), vendor security reviews, and incident response procedures.
              </p>

              <h3 className="text-lg font-bold text-gray-900">10. International Transfers</h3>
              <p className="text-sm text-gray-600">
                Astra Pathways operates with teams and cloud servers in the United States and abroad. Where personal information is transferred internationally, we use appropriate contractual safeguards.
              </p>
            </section>
          </div>

          {/* ================= PART 2: DATA PRIVACY AND SECURITY POLICY ================= */}
          <div className="space-y-8 pt-8 border-t border-gray-200">
            <div className="border-b border-gray-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">Part II</span>
              <h2 className="text-2xl font-black text-[#0B1020] mt-2">Data Privacy & Security Policy</h2>
              <p className="text-xs text-gray-500 mt-1">Applies to: Employees, contractors, instructors, and vendors handling Astra Pathways data.</p>
            </div>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">1. Purpose</h3>
              <p>This policy protects the confidentiality, integrity, and availability of student, employee, partner, and business data handled by Astra Pathways.</p>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">2. Data Classification</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                <li><strong>Public:</strong> Website content, public course descriptions, marketing materials.</li>
                <li><strong>Internal:</strong> Lead lists, student status, enrollment records, internal reports.</li>
                <li><strong>Confidential:</strong> Resumes, contact details, payment schedules, assessment records, employer contacts.</li>
                <li><strong>Restricted:</strong> Government IDs, full payment credentials, background-check information, health-related information, and sensitive student records.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">3. Access Control & Handling Rules</h3>
              <p className="text-sm text-gray-600">
                Access is granted only on a need-to-know and least-privilege basis. Every team member must use a unique account; shared logins are strictly prohibited. Multi-factor authentication is enforced across administrative systems.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                <li>Student data must be stored only in approved systems (CRM, LMS, payment processor).</li>
                <li>Card numbers, CVV codes, passwords, and identity documents must never be stored in spreadsheets or unapproved messaging channels.</li>
                <li>Resumes and identity documents are shared only through secure, access-controlled channels.</li>
                <li>Student profiles must not be shared with employers without documented consent.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">4. Incident Response & Employee Responsibilities</h3>
              <p className="text-sm text-gray-600">
                If a data-security incident occurs: 1) Contain the incident and preserve evidence; 2) Notify the Data Protection Lead within 24 hours; 3) Identify affected systems and data types; 4) Assess legal notification requirements; 5) Notify affected individuals and regulators where required; 6) Document cause and remediation.
              </p>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
};
