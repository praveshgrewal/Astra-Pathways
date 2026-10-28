import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, FileCheck, DollarSign, Clock, AlertTriangle, 
  HelpCircle, CheckCircle2, Calculator, ShieldCheck, Mail, ArrowRight 
} from 'lucide-react';

export const RefundsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B1020] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#8B5CF6]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#8B5CF6] font-semibold mb-2 uppercase tracking-wider">
            <FileCheck className="w-4 h-4" /> Policy Disclosures
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Refund and Cancellation Policy</h1>
          <p className="text-sm text-gray-300 mt-3 max-w-2xl leading-relaxed">
            This policy applies to all Astra Pathways educational programs, including the Learner’s Program and Skill2Scale tracks.
          </p>

          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400">
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Effective Date</span>
              <span className="font-semibold text-white">October 28, 2026</span>
            </div>
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Processing Timeline</span>
              <span className="font-semibold text-white">7–10 Business Days</span>
            </div>
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Cancellation Support</span>
              <span className="font-semibold text-white">info@astrapathways.net</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">

        {/* Quick Action Cards: Online Cancellation Form & Refund Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#4F7CFF]/50 transition-all">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#4F7CFF] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Step 1: Program Cancellation
              </span>
              <h3 className="text-lg font-bold text-[#0B1020]">Cancellation Form</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Submit an official request to cancel your cohort seat, pause active billing, or withdraw from a program track.
              </p>
            </div>
            <Link
              to="/forms/cancellation"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-gray-800 transition-all"
            >
              Open Cancellation Form <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#8B5CF6]/50 transition-all">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> Step 2: Financial Reimbursement
              </span>
              <h3 className="text-lg font-bold text-[#0B1020]">Refund Request Form</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Submit payment verification and bank details to request calculation and refund of eligible tuition amounts.
              </p>
            </div>
            <Link
              to="/forms/refund"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
            >
              Open Refund Request Form <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-10 text-sm sm:text-base text-gray-700 leading-relaxed">
          
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-600 space-y-1.5">
            <p><strong>Operating Entity:</strong> Astra Pathways (operating under Madyan Holdings)</p>
            <p><strong>Support & Billing Email:</strong> <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline font-semibold">info@astrapathways.net</a></p>
            <p className="pt-2 text-gray-500 border-t border-gray-200">
              By enrolling in any Astra Pathways program, the student confirms that they have read, understood, and accepted this policy.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xs font-extrabold">1</span>
              General Refund Principles
            </h2>
            <p>
              Astra Pathways provides education, training, mentorship, career-support services, and related services. Refund eligibility depends on the payment method selected and the amount of service already delivered.
            </p>
            <p>
              All cancellation requests must be submitted in writing through our online <Link to="/forms/cancellation" className="text-[#4F7CFF] font-semibold underline">Cancellation Form</Link> or by email to <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline">info@astrapathways.net</a> from the email address used during enrollment.
            </p>
            <p>A cancellation request must include:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Full name and registered email address.</li>
              <li>Program name and cohort or batch name.</li>
              <li>Enrollment date and payment method used.</li>
              <li>Reason for cancellation and any supporting documentation.</li>
            </ul>
            <p className="text-xs text-gray-500">
              Astra Pathways will acknowledge the request within 1 business day.
            </p>
          </section>

          {/* Section 2: Cash Payment */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xs font-extrabold">2</span>
              Cash / Upfront Payment
            </h2>
            
            <div className="space-y-3 text-sm text-gray-700">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <h3 className="font-bold text-emerald-950">2.1 Full Refund Window (72 Hours)</h3>
                <p className="mt-1 text-emerald-900 text-xs sm:text-sm">
                  A student may request a full (100%) refund if the cancellation request is submitted within <strong>72 hours</strong> of enrollment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <h3 className="font-bold text-gray-900">2.2 Cancellation After 72 Hours (Up to 90 Days)</h3>
                <p>
                  If the cancellation request is submitted after 72 hours but within <strong>90 calendar days</strong> of enrollment, the student may receive a refund calculated as follows:
                </p>
                <div className="p-3 rounded-lg bg-gray-900 text-white font-mono text-xs sm:text-sm">
                  Refund Amount = Total Amount Paid − 10% Administrative Fee − Pro-Rated Service Charge
                </div>
                <p className="text-xs text-gray-500">
                  The 10% administrative and cancellation fee is calculated on the total program fee.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <h3 className="font-bold text-blue-950 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-[#4F7CFF]" /> 2.3 Pro-Rated Service Charge Formula & Example
                </h3>
                <p className="text-xs sm:text-sm text-blue-900">
                  The pro-rated service charge reflects the training, platform access, career-support services, and other services already delivered:
                </p>
                <div className="p-2.5 rounded bg-white border border-blue-200 font-mono text-xs text-blue-950">
                  Pro-Rated Service Charge = Total Program Fee ÷ Total Program Weeks × Number of Weeks Elapsed From Cohort Start Date
                </div>
                <div className="text-xs text-blue-800 bg-blue-100/60 p-3 rounded-lg">
                  <strong>Example:</strong> If the total program fee is $6,000, the program is 24 weeks long, and 6 weeks have elapsed, the pro-rated service charge is:<br />
                  <code>$6,000 ÷ 24 × 6 = $1,500</code>.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                <h3 className="font-bold text-amber-950">2.4 No Refund After 90 Days</h3>
                <p className="text-xs sm:text-sm text-amber-900 mt-1">
                  No refund is available after <strong>90 calendar days</strong> from the enrollment date.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <h3 className="font-bold text-gray-900">2.5 Refund Processing</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Approved refunds will be processed within <strong>7–10 business days</strong> after cancellation approval. The time taken for the refund to appear in the student’s account may depend on the student’s bank or payment provider.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: In-House Payment Plan */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xs font-extrabold">3</span>
              In-House Payment Plan
            </h2>
            <p className="text-sm text-gray-600">
              The In-House Payment Plan is a no-interest installment payment plan offered directly by Astra Pathways.
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li><strong>3.1 Full Refund Window:</strong> A student may request a full refund of amounts already paid if the cancellation request is submitted within <strong>24 hours</strong> of enrollment.</li>
              <li><strong>3.2 Cancellation After 24 Hours:</strong> After 24 hours, enrollment payments are non-refundable, subject to the pro-rated cancellation calculation in Section 2.3. Any remaining scheduled installments may be cancelled only if amounts already paid cover the pro-rated service charge and applicable 10% fee. Otherwise, the student remains responsible for the shortfall.</li>
              <li><strong>3.3 No Interest:</strong> Astra Pathways does not charge interest, financing charges, or penalties under the In-House Payment Plan, except for the late fee described below.</li>
              <li><strong>3.4 Grace Period:</strong> A <strong>7-calendar-day grace period</strong> applies after each installment due date. No late fee is charged if payment is made within this period.</li>
              <li><strong>3.5 Late Fee:</strong> If an installment remains unpaid after the 7-day grace period, a <strong>$10 late fee</strong> will apply for every 3-calendar-day period the installment remains unpaid. The total late fee for any single overdue installment will not exceed <strong>$30</strong>.</li>
              <li><strong>3.6 Service Pause:</strong> If an installment remains unpaid for more than <strong>14 calendar days</strong> after its due date, Astra Pathways may pause student access to live sessions, course materials, assignments, mentorship, and career-support services. Access is restored within 1 business day after overdue installment and late fees are paid in full.</li>
              <li><strong>3.7 Recurring Payment Authorization:</strong> By selecting an installment plan, the student authorizes recurring charges. The student will be shown the total fee, installment count, due dates, grace period, late fee rules, and service-pause terms prior to checkout.</li>
            </ul>
          </section>

          {/* Section 4: Finance Option */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xs font-extrabold">4</span>
              Third-Party Finance Option
            </h2>
            <p className="text-sm text-gray-600">Where Astra Pathways offers financing through a third-party Finance Partner:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li><strong>4.1 Cancellation Within 5 Business Days:</strong> A student may request cancellation within 5 business days of enrollment confirmation. Astra Pathways will initiate the request with the Finance Partner. Any refund or loan reversal is subject to the Finance Partner's policies and processing timeline.</li>
              <li><strong>4.2 Cancellation After 5 Business Days (Up to 90 Days):</strong> <code>Refund/Adjustment = Total Amount Paid/Financed − 10% Admin Fee − Pro-Rated Service Charge</code>. Astra Pathways will coordinate with the Finance Partner to adjust financing where possible.</li>
              <li><strong>4.3 No Refund After 90 Days:</strong> No refund is available from Astra Pathways after 90 calendar days from enrollment date. Any remaining obligation is governed by the Finance Partner's loan agreement.</li>
            </ul>
          </section>

          {/* Section 5: Non-Refundable Situations */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xs font-extrabold">5</span>
              Non-Refundable Situations
            </h2>
            <p>No refund will be provided where:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
              <li>The cancellation request is submitted after the applicable refund window.</li>
              <li>The student has completed more than 90 calendar days of the program.</li>
              <li>The student is removed for fraud, identity misrepresentation, harassment, academic dishonesty, or material breach of the Terms.</li>
              <li>The student fails to make required payments under the In-House Payment Plan.</li>
              <li>The student voluntarily discontinues participation after the applicable refund period.</li>
              <li>The refund request relates to a third-party Finance Partner's loan terms outside Astra Pathways' control.</li>
            </ul>
          </section>

          {/* Section 6 & 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xs font-extrabold">6</span>
              Program Changes & No Employment Guarantee
            </h2>
            <p>
              If Astra Pathways materially changes program schedule, delivery format, or core curriculum, students may contact <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline">info@astrapathways.net</a> to discuss available options in good faith. A routine change in instructor, session timing, or non-core curriculum content does not automatically qualify for a refund.
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700">
              <strong>Educational Transparency Note:</strong> Astra Pathways provides training and career-support services. Refund eligibility is not connected to whether the student receives a job offer, interview, internship conversion, salary level, visa sponsorship, or immigration benefit. Astra Pathways does not guarantee employment or any specific career outcome.
            </div>
          </section>

          {/* Section 8: How to Request a Refund */}
          <section className="space-y-4 pt-2">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xs font-extrabold">8</span>
              How to Request a Refund
            </h2>
            <p>
              Students can submit their formal request instantly through our online <Link to="/forms/refund" className="text-[#4F7CFF] font-semibold underline">Refund Request Form</Link>, or by emailing <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline">info@astrapathways.net</a> with subject line <em>“Refund Request – [Full Name] – [Program Name]”</em> including full name, registered email, phone number, program name, cohort/batch, enrollment date, payment method, and reason for cancellation.
            </p>
            <p className="text-xs text-gray-500">
              Astra Pathways will review the request and respond within 3 business days.
            </p>
          </section>

          {/* Section 9 & 10 */}
          <section className="space-y-3 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center text-xs font-extrabold">9 & 10</span>
              Policy Changes & Contact Information
            </h2>
            <p className="text-sm text-gray-600">
              Astra Pathways may update this policy periodically. The version in effect on the student’s enrollment date applies to that student's enrollment, unless agreed in writing.
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700">
              <p><strong>Astra Pathways (Madyan Holdings)</strong></p>
              <p>30 N Gould St, STE N, Sheridan, WY, USA - 82801</p>
              <p>Email: <a href="mailto:info@astrapathways.net" className="text-[#4F7CFF] underline">info@astrapathways.net</a> · Tel: 1-307-317-7151</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
