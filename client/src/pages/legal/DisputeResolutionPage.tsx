import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Scale, ShieldAlert, CheckCircle2, AlertTriangle, 
  HelpCircle, MessageSquare, ArrowRight, FileText, Phone, Mail 
} from 'lucide-react';

export const DisputeResolutionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B1020] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">
            <Scale className="w-4 h-4" /> Operational Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Dispute and Charge Resolution</h1>
          <p className="text-sm text-gray-300 mt-3 max-w-2xl leading-relaxed">
            Our established procedures for resolving student grievances, billing clarifications, charge inquiries, and legal arbitration under Astra Pathways terms.
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400">
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Informal Response SLA</span>
              <span className="font-semibold text-white">Within 15 Business Days</span>
            </div>
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Good-Faith Period</span>
              <span className="font-semibold text-white">30 Days</span>
            </div>
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Governing Law</span>
              <span className="font-semibold text-white">State of Wyoming, USA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">

        {/* Quick Action Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#0B1020] to-[#121B3A] text-white border border-amber-400/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldAlert className="w-4 h-4" /> Have a Grievance or Billing Inquiry?
            </span>
            <p className="text-xs text-gray-300">
              Submit your dispute directly to academic leadership and finance for immediate priority review.
            </p>
          </div>
          <Link
            to="/forms/complaint"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-[#0B1020] text-xs font-extrabold shadow-md hover:opacity-95 transition-all shrink-0"
          >
            Open Complaint & Dispute Form
          </Link>
        </div>

        {/* Main Resolution Framework */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-10 text-sm sm:text-base text-gray-700 leading-relaxed">
          
          {/* Principle */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">1</span>
              Commitment to Fair & Rapid Resolution
            </h2>
            <p>
              Astra Pathways is dedicated to providing transparent educational services. We believe that open, documented communication can resolve virtually any misunderstanding quickly and equitably before formal administrative or arbitration proceedings become necessary.
            </p>
          </section>

          {/* Section 2: Charge & Billing Resolution */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">2</span>
              Charge Inquiries & Billing Discrepancies
            </h2>
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 text-sm text-gray-800">
              <h3 className="font-bold text-gray-900">Before Contacting Your Card Issuer or Bank</h3>
              <p>
                If you observe an unexpected charge, installment discrepancy, or believe an error occurred on your account, please reach out to us first at <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] font-semibold underline">info@astrapathways.net</a> or submit an online <Link to="/forms/query" className="text-[#4F7CFF] underline font-semibold">Query Form</Link>.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-gray-600">
                <li>We review billing queries within <strong>24 to 48 hours</strong> and can issue direct corrections immediately.</li>
                <li>Filing an automated bank chargeback without prior notification often triggers automated administrative freezes on portal access while the bank investigation is pending.</li>
                <li>Our billing team is empowered to rectify duplicate charges, prorate installments according to our published policy, and correct processing errors promptly.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Informal Dispute Resolution Procedure */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">3</span>
              Informal Dispute Resolution Procedure (Section 14.2)
            </h2>
            <p>
              Before initiating arbitration or filing a formal legal claim, the student and Astra Pathways must engage in the following mandatory informal resolution process:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
              <li>
                <strong>Written Notice:</strong> The student must submit written notice via our online <Link to="/forms/complaint" className="text-[#4F7CFF] underline font-semibold">Complaint Form</Link> or by emailing <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline font-semibold">info@astrapathways.net</a> containing:
                <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
                  <li>Full name and enrolled program</li>
                  <li>Date of enrollment</li>
                  <li>Clear description of the dispute and nature of concern</li>
                  <li>Supporting documents, emails, or evidence</li>
                  <li>The specific resolution or remedy requested</li>
                </ul>
              </li>
              <li>
                <strong>Initial Response:</strong> Astra Pathways will acknowledge receipt and provide an initial substantive assessment within <strong>15 business days</strong>.
              </li>
              <li>
                <strong>30-Day Good-Faith Consultation:</strong> Both parties agree to confer in good faith (via phone, video conference, or email) for a period of <strong>30 calendar days</strong> from notice to achieve an amicable resolution.
              </li>
            </ol>
          </section>

          {/* Section 4: Binding Arbitration Agreement */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">4</span>
              Agreement to Arbitrate (Section 14.3)
            </h2>
            <p>
              If a dispute cannot be resolved through the 30-day informal discussion, either party may require that the dispute be resolved exclusively by final and binding individual arbitration:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li><strong>Arbitration Provider:</strong> Administered by the American Arbitration Association (AAA) or JAMS under its Consumer Arbitration Rules.</li>
              <li><strong>Location:</strong> Held in Sheridan, Wyoming, or remotely via secure video conference for the student's convenience.</li>
              <li><strong>Individual Claims Only:</strong> All disputes must be arbitrated on an individual basis. Class-action arbitrations, collective actions, and private attorney general suits are waived.</li>
              <li><strong>Fee Assistance:</strong> If the student's claim is under $10,000, Astra Pathways will reimburse the filing fee unless the arbitrator determines the claim was frivolous or filed for an improper purpose.</li>
            </ul>
          </section>

          {/* Section 5: 30-Day Opt-Out Right */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">5</span>
              30-Day Opt-Out Right (Section 14.7)
            </h2>
            <p>
              Students have the right to opt out of the arbitration agreement by sending written notice within <strong>30 calendar days</strong> of their initial enrollment or acceptance of terms to <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline">info@astrapathways.net</a>.
            </p>
            <p className="text-xs text-gray-500">
              The opt-out notice must state your name, registered email address, enrolled program, and the clear statement: <em>“I opt out of the arbitration agreement.”</em> Valid opt-out does not affect any other provisions of the Terms and Conditions.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="space-y-3 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">6</span>
              Dispute Resolution Contact
            </h2>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700">
              <p><strong>Astra Pathways Legal & Grievance Department</strong></p>
              <p>Madyan Holdings Corporate Operations</p>
              <p>30 N Gould St, STE N, Sheridan, WY, USA - 82801</p>
              <p className="mt-1">Email: <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline">info@astrapathways.net</a> · Phone: 1-307-317-7151</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
