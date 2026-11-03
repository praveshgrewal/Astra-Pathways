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
      <div className="bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-[#F5F7FC] text-slate-900 py-14 sm:py-20 relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-amber-700 transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold mb-2 uppercase tracking-wider">
            <Scale className="w-4 h-4" /> Operational Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Dispute and Charge Resolution</h1>
          <p className="text-sm text-slate-600 mt-3 max-w-2xl leading-relaxed">
            Our established procedures for resolving student grievances, billing clarifications, charge inquiries, and legal arbitration under Madyan Holdings terms.
          </p>

          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div>
              <span className="block text-slate-500 uppercase tracking-wider text-[10px]">Informal Response SLA</span>
              <span className="font-semibold text-slate-900">Within 15 Business Days</span>
            </div>
            <div>
              <span className="block text-slate-500 uppercase tracking-wider text-[10px]">Good-Faith Period</span>
              <span className="font-semibold text-slate-900">30 Days</span>
            </div>
            <div>
              <span className="block text-slate-500 uppercase tracking-wider text-[10px]">Governing Law</span>
              <span className="font-semibold text-slate-900">State of Wyoming, USA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">

        {/* Quick Action Banner */}
        <div className="p-6 rounded-3xl bg-white text-slate-900 border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldAlert className="w-4 h-4" /> Have a Grievance or Billing Inquiry?
            </span>
            <p className="text-xs text-slate-600">
              Submit your dispute directly to Madyan Holdings management and finance for immediate priority review.
            </p>
          </div>
          <Link
            to="/forms/complaint"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold shadow-md hover:opacity-95 transition-all shrink-0"
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
              Madyan Holdings (operating Astra Pathways) is dedicated to providing transparent educational services. We believe that open, documented communication can resolve virtually any misunderstanding quickly and equitably before formal administrative or arbitration proceedings become necessary.
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
                If you observe an unexpected charge, installment discrepancy, or believe an error occurred on your account, please reach out to us first at <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] font-semibold underline">info@madyanholdings.com</a> or submit an online <Link to="/forms/query" className="text-[#4F7CFF] underline font-semibold">Query Form</Link>.
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
              Before initiating arbitration or filing a formal legal claim, the student and Madyan Holdings must engage in the following mandatory informal resolution process:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
              <li>
                <strong>Written Notice:</strong> The student must submit written notice via our online <Link to="/forms/complaint" className="text-[#4F7CFF] underline font-semibold">Complaint Form</Link> or by emailing <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] underline font-semibold">info@madyanholdings.com</a> containing:
                <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
                  <li>Full name and enrolled program</li>
                  <li>Date of enrollment</li>
                  <li>Clear description of the dispute and nature of concern</li>
                  <li>Supporting documents, emails, or evidence</li>
                  <li>The specific resolution or remedy requested</li>
                </ul>
              </li>
              <li>
                <strong>Initial Response:</strong> Madyan Holdings will acknowledge receipt and provide an initial substantive assessment within <strong>15 business days</strong>.
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
              Mandatory Binding Arbitration
            </h2>
            <p>
              If an informal resolution is not reached within thirty (30) days, you and Madyan Holdings agree that any unresolved dispute, controversy, or claim shall be settled exclusively by final and binding arbitration. The arbitration shall be administered by the American Arbitration Association (AAA) in accordance with its Consumer Arbitration Rules.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>Governing Law & Venue:</strong> The arbitration shall be governed by the Federal Arbitration Act (FAA) and the laws of the State of Wyoming, USA. The physical seat of the arbitration shall be Cheyenne, Wyoming, unless both parties mutually agree to conduct proceedings virtually or telephonically.</li>
              <li><strong>Arbitrator Authority:</strong> The arbitrator, and not any federal, state, or local court or agency, shall have exclusive authority to resolve any dispute relating to the interpretation, applicability, enforceability, or formation of this agreement. The arbitrator's award shall be final, binding, and may be entered as a judgment in any court of competent jurisdiction.</li>
              <li><strong>Costs:</strong> Payment of all filing, administration, and arbitrator fees will be governed by the AAA rules. Each party shall bear its own attorneys' fees and costs unless the arbitrator awards them otherwise based on statutory provisions.</li>
              <li><strong>Class Action Waiver:</strong> YOU AND MADYAN HOLDINGS AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, OR REPRESENTATIVE PROCEEDING. The arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding.</li>
            </ul>
          </section>

          {/* Section 5: 30-Day Opt-Out Right */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">5</span>
              30-Day Opt-Out Right
            </h2>
            <p>
              You have the right to opt out of this mandatory arbitration provision and class action waiver. To do so, you must send a clear, written opt-out notice via email to <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] underline font-semibold">info@madyanholdings.com</a> within thirty (30) calendar days from the date you submit your initial Enrollment Application.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              The opt-out notice must include your full legal name, the email address associated with your enrollment, and a specific statement requesting to opt out of binding arbitration. If you opt out timely, all disputes will be resolved exclusively in the state or federal courts located in the State of Wyoming.
            </p>
          </section>

          {/* Section 6: Contact */}
          <section className="space-y-3 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">6</span>
              Dispute Resolution Contact
            </h2>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700">
              <p><strong>Madyan Holdings Operations & Legal Affairs</strong></p>
              <p>30 N Gould St, STE N, Sheridan, WY, USA - 82801</p>
              <p className="mt-1">Email: <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] underline">info@madyanholdings.com</a> · Phone: 1-307-317-7151</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
