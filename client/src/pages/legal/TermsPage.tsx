import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Shield, Scale, AlertCircle, FileText, CheckCircle2, 
  HelpCircle, ArrowRight, ExternalLink, Mail, MapPin, Building2 
} from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#0B1020] pb-24 font-sans">
      {/* Header Banner - Light & Crisp */}
      <div className="bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-[#F5F7FC] text-[#0B1020] py-14 sm:py-20 relative overflow-hidden border-b border-gray-200/80">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#4F7CFF]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#4F7CFF] font-semibold mb-2 uppercase tracking-wider">
            <Shield className="w-4 h-4" /> Legal & Operational Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">Terms and Conditions</h1>
          <p className="text-sm text-gray-600 mt-3 max-w-2xl leading-relaxed">
            These Terms govern your access to and use of Madyan Holdings' website, educational learning portal, programs, and career-support services provided through Astra Pathways.
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600">
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Effective Date</span>
              <span className="font-semibold text-gray-900">October 28, 2026</span>
            </div>
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Operating Entity</span>
              <span className="font-semibold text-gray-900">Madyan Holdings</span>
            </div>
            <div>
              <span className="block text-gray-500 uppercase tracking-wider text-[10px]">Jurisdiction</span>
              <span className="font-semibold text-gray-900">State of Wyoming, USA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        
        {/* Quick Navigation & Form Action Bar - Light Theme */}
        <div className="bg-white text-slate-800 p-6 rounded-3xl border border-gray-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 justify-center md:justify-start">
              <Scale className="w-3.5 h-3.5 text-amber-600" /> Student Rights & Forms Center
            </span>
            <p className="text-xs text-gray-600">
              Need to submit a formal cancellation, refund request, complaint, or query under these Terms?
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              to="/forms/cancellation"
              className="px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-semibold border border-gray-200 transition-all"
            >
              Cancellation Form
            </Link>
            <Link
              to="/forms/refund"
              className="px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-semibold border border-gray-200 transition-all"
            >
              Refund Form
            </Link>
            <Link
              to="/forms/complaint"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
            >
              Complaint / Dispute Form
            </Link>
          </div>
        </div>

        {/* Legal Document Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-sm space-y-10 text-sm sm:text-base text-gray-700 leading-relaxed">
          
          {/* Introductory Preamble */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-600 space-y-2">
            <p><strong>Merchant & Operating Company:</strong> Madyan Holdings (operating Astra Pathways)</p>
            <p><strong>Website:</strong> https://madyanholdings.com</p>
            <p><strong>Registered Address:</strong> 30 N Gould St, STE N, Sheridan, WY, USA - 82801</p>
            <p><strong>Support & Inquiries Email:</strong> <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] font-semibold underline">info@madyanholdings.com</a></p>
            <p className="pt-2 text-gray-500 border-t border-gray-200">
              These Terms and Conditions (“Terms”) govern your access to and use of Madyan Holdings website, learning platform, programs, career-support services, and related offerings (operating as Astra Pathways). By accessing the website, creating an account, enrolling in a program, making a payment, or using any service, you agree to these Terms, our <Link to="/privacy" className="text-[#4F7CFF] underline">Privacy Policy</Link>, and our <Link to="/refunds" className="text-[#4F7CFF] underline">Refund and Cancellation Policy</Link>.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">1</span>
              About Madyan Holdings & Astra Pathways
            </h2>
            <p>
              Madyan Holdings is an education, training, and career-support company operating Astra Pathways. We provide practical training, mentorship, portfolio development, career-support services, employer-outreach assistance, and related services in high-demand technology fields, including Cybersecurity, Generative AI, Data Science, and Full-Stack Development.
            </p>
            <p className="font-semibold text-gray-900 bg-amber-50 p-3.5 rounded-xl border border-amber-200/60">
              Madyan Holdings and Astra Pathways are not employers, staffing agencies guaranteeing employment, immigration consultants, law firms, or financial institutions.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">2</span>
              Eligibility
            </h2>
            <p>
              You must be at least 18 years old to enroll independently. If you are under 18, a parent or legal guardian must review and accept these Terms and complete the enrollment process on your behalf.
            </p>
            <p>
              Astra Pathways does not knowingly collect personal information from children under 13 without verifiable parental consent in accordance with COPPA regulations.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">3</span>
              Program Access
            </h2>
            <p>
              Upon successful enrollment and payment, Astra Pathways will provide access to the selected program, subject to the following:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>Access is personal, non-transferable, and limited exclusively to the enrolled student.</li>
              <li>Access begins on the cohort start date or the date login credentials are issued, whichever is earlier.</li>
              <li>Astra Pathways may modify course content, instructors, schedules, tools, delivery format, or support processes where reasonably necessary to maintain educational quality and relevance.</li>
              <li>Astra Pathways may pause access if a payment is overdue under the applicable payment plan.</li>
              <li>Astra Pathways may suspend or terminate access for fraud, misuse, harassment, non-payment, academic dishonesty, or material breach of these Terms.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">4</span>
              No Employment Guarantee
            </h2>
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2 text-sm">
              <p className="font-semibold text-gray-900">
                Astra Pathways provides training and career-support services. We do not guarantee employment, a job offer, income, salary level, interview invitation, internship conversion, visa sponsorship, immigration benefit, or any specific career outcome.
              </p>
              <p className="text-gray-600">
                Employer outreach, profile marketing, application assistance, interview preparation, and placement support do not create any obligation for an employer to hire a student. Employment decisions remain entirely at the discretion of external hiring organizations.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">5</span>
              Student Responsibilities
            </h2>
            <p>By enrolling, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>Provide accurate, current, and complete personal, educational, employment, and payment information.</li>
              <li>Keep your login credentials strictly confidential.</li>
              <li>Use all course materials only for your personal learning and career development.</li>
              <li>Not copy, record, resell, redistribute, scrape, or publicly share course content without written permission.</li>
              <li>Not misrepresent your identity, qualifications, work authorization, employment history, or skills.</li>
              <li>Not use Astra Pathways services for unlawful, abusive, fraudulent, or harassing purposes.</li>
              <li>Follow academic-integrity standards and any employer or internship workplace policies.</li>
              <li>Respond to career-support communications and complete required program activities where applicable.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-5">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">6</span>
              Payments and Payment Methods
            </h2>
            <p>Astra Pathways may offer the following payment methods:</p>

            <div className="space-y-4">
              {/* 6.1 Cash Payment */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
                <h3 className="font-bold text-gray-900 text-base">6.1 Cash / Upfront Payment</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                  <li>A student may request a full refund within <strong>72 hours</strong> of enrollment.</li>
                  <li>After 72 hours but within <strong>90 calendar days</strong>, a student may cancel and receive a refund of amounts paid, minus a <strong>10% administrative and cancellation fee</strong> and a <strong>monthly pro-rated service charge</strong> for services already delivered.</li>
                  <li><strong>Monthly Calculation Basis:</strong> Refunds are calculated on a monthly basis rather than weekly. Our standard average monthly invoice is <strong>$500</strong>, which is used to charge on a pro-rated basis for the duration of services utilized.</li>
                  <li>After <strong>90 calendar days</strong>, no refund is available.</li>
                  <li>The pro-rated service charge is calculated as: <code>Months Elapsed × $500 (average monthly invoice rate)</code>.</li>
                  <li><strong>Refund Formula:</strong> <code>Refund Amount = Total Paid − 10% Admin Fee − (Months Elapsed × $500)</code>.</li>
                  <li>Approved refunds are processed within <strong>7–10 business days</strong>.</li>
                </ul>
              </div>

              {/* 6.2 In-House Payment Plan */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
                <h3 className="font-bold text-gray-900 text-base">6.2 In-House Payment Plan</h3>
                <p className="text-sm text-gray-600">The In-House Payment Plan is a no-interest installment payment plan offered by Madyan Holdings (operating Astra Pathways).</p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                  <li>A student may request a full refund within <strong>24 hours</strong> of enrollment.</li>
                  <li>After 24 hours, enrollment payments are non-refundable, subject to the monthly pro-rated cancellation calculation ($500/month average rate).</li>
                  <li>No interest, financing charge, or penalty other than the stated late fee applies.</li>
                  <li>A <strong>7-calendar-day grace period</strong> applies after each installment due date.</li>
                  <li>After the grace period, a <strong>$10 late fee</strong> applies for every 3-calendar-day period the installment remains unpaid. Total late fees for any single overdue installment will not exceed <strong>$30</strong>.</li>
                  <li>If an installment remains unpaid for more than <strong>14 calendar days</strong> after its due date, program access and related services may be paused until the overdue amount and applicable late fee are paid.</li>
                  <li>Access will be restored within 1 business day after full payment of the overdue amount and late fee.</li>
                </ul>
              </div>

              {/* 6.3 Finance Option */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
                <h3 className="font-bold text-gray-900 text-base">6.3 Third-Party Finance Option</h3>
                <p className="text-sm text-gray-600">Where Madyan Holdings offers financing through an authorized third-party Finance Partner:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                  <li>A student may request cancellation within <strong>5 business days</strong> of enrollment confirmation.</li>
                  <li>Madyan Holdings will initiate the cancellation with the Finance Partner, but any refund, loan reversal, or adjustment is subject to the Finance Partner's policies and processing timeline.</li>
                  <li>After 5 business days but within <strong>90 calendar days</strong>, the 10% administrative and cancellation fee and monthly pro-rated service charge ($500/month average rate) apply.</li>
                  <li>After 90 calendar days, no refund is available from Madyan Holdings. Any remaining obligation to the Finance Partner is governed by the Finance Partner's loan agreement.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">7</span>
              Recurring Payment Authorization
            </h2>
            <p>
              By selecting an installment or recurring payment method, you authorize Madyan Holdings or its authorized payment processor to charge your selected payment method for the scheduled installment amounts on their due dates.
            </p>
            <p>You confirm that you have reviewed:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
              <li>The total program fee, installment count, and due dates.</li>
              <li>The 7-day grace period, $10 late-fee rule, and $30 late-fee cap.</li>
              <li>The service-pause policy after 14 days of non-payment.</li>
              <li>The monthly cancellation and refund calculation policy ($500/month rate).</li>
            </ul>
            <p className="text-xs text-gray-500 pt-1">
              You may cancel future recurring authorizations by providing written notice to <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] underline">info@madyanholdings.com</a> or by submitting our online <Link to="/forms/cancellation" className="text-[#4F7CFF] underline">Cancellation Form</Link> at least three (3) business days prior to the next scheduled installment due date. Failure to provide timely notice will result in the processing of the scheduled charge.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">8</span>
              Intellectual Property
            </h2>
            <p>
              All Astra Pathways course materials, recordings, templates, frameworks, assessments, branding, website content, and platform features are owned by Astra Pathways or its licensors.
            </p>
            <p>
              Students receive a limited, revocable, non-exclusive, non-transferable license to use the materials for personal learning. Students may not sell, license, sublicense, distribute, or commercially exploit Astra Pathways materials.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">9</span>
              Third-Party Services
            </h2>
            <p>
              Astra Pathways may use third-party providers for payments, financing, learning management, email, CRM, analytics, cloud hosting, communication, job boards, and employer outreach. These providers operate under their own terms and privacy policies. Astra Pathways is not responsible for the acts, omissions, availability, or security practices of third-party services beyond its reasonable control.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">10</span>
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Astra Pathways will not be liable for indirect, incidental, special, consequential, or punitive damages, including lost wages, lost employment opportunities, lost profits, or emotional distress.
            </p>
            <p>
              Astra Pathways’ total liability arising from or relating to these Terms, the program, or the services shall not exceed the total amount actually paid by you to Madyan Holdings for the specific program giving rise to the liability.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">11</span>
              Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by, construed, and enforced in accordance with the laws of the State of Wyoming, USA, without regard to conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the state or federal courts located in Wyoming, and you hereby consent to personal jurisdiction therein.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">12</span>
              Chargeback and Dispute Policy
            </h2>
            <p>
              You agree to contact support at <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] underline font-semibold">info@madyanholdings.com</a> to resolve any billing issues or dissatisfaction before initiating a chargeback or dispute with your bank or credit card provider. In the event of an unauthorized chargeback, Astra Pathways reserves the right to suspend platform access immediately and pursue collection of the outstanding balance plus any administrative fees incurred.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">13</span>
              Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Astra Pathways, its affiliates, employees, contractors, and agents from claims, damages, losses, and expenses arising from your breach of these Terms, misuse of the platform, infringement of third-party rights, or unlawful conduct.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">14</span>
              Termination
            </h2>
            <p>Astra Pathways may suspend or terminate your access if you:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
              <li>Fail to make required payments.</li>
              <li>Violate these Terms.</li>
              <li>Engage in fraud, harassment, or academic dishonesty.</li>
              <li>Misuse employer contacts, student data, or platform resources.</li>
              <li>Create risk or legal exposure for Astra Pathways, its students, partners, or employees.</li>
            </ul>
            <p className="text-xs text-gray-500">
              Upon termination, access to paid content may be revoked, and no refund is provided where termination results from student breach.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">15</span>
              Changes to These Terms
            </h2>
            <p>
              Astra Pathways may update these Terms from time to time. The updated version will be posted on the website with a new effective date. Continued use of the website or services after the effective date constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 16: Dispute Resolution and Arbitration Provision */}
          <section className="space-y-5 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-extrabold">16</span>
              <h2 className="text-xl font-bold text-[#0B1020]">
                DISPUTE RESOLUTION AND ARBITRATION PROVISION
              </h2>
            </div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              (For Wyoming Jurisdictional Enforcement)
            </p>
            
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-5 text-sm text-gray-800">
              
              <div>
                <h3 className="font-bold text-gray-900 text-base">1. Dispute Resolution Policy & Intent</h3>
                <p className="mt-1.5 text-gray-700 leading-relaxed">
                  Madyan Holdings (operating as Astra Pathways) is committed to resolving student concerns efficiently and amicably. You agree that in the event of any dispute, claim, question, or disagreement arising out of or relating to these Terms, your enrollment, or the services provided, you must first contact our support team at <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] underline font-semibold">info@madyanholdings.com</a> to attempt an informal, good-faith negotiation. No formal legal proceeding or arbitration may be initiated until both parties have engaged in this informal process for a minimum of thirty (30) calendar days.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-base">2. Mandatory Binding Arbitration</h3>
                <p className="mt-1.5 text-gray-700 leading-relaxed">
                  If an informal resolution is not reached within thirty (30) days, you and Madyan Holdings agree that any unresolved dispute, controversy, or claim shall be settled exclusively by final and binding arbitration. The arbitration shall be administered by the American Arbitration Association (AAA) in accordance with its Consumer Arbitration Rules.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Governing Law & Venue:</strong> The arbitration shall be governed by the Federal Arbitration Act (FAA) and the laws of the State of Wyoming, USA. The physical seat of the arbitration shall be Cheyenne, Wyoming, unless both parties mutually agree to conduct proceedings virtually or telephonically.
                  </li>
                  <li>
                    <strong>Arbitrator Authority:</strong> The arbitrator, and not any federal, state, or local court or agency, shall have exclusive authority to resolve any dispute relating to the interpretation, applicability, enforceability, or formation of this agreement. The arbitrator's award shall be final, binding, and may be entered as a judgment in any court of competent jurisdiction.
                  </li>
                  <li>
                    <strong>Costs:</strong> Payment of all filing, administration, and arbitrator fees will be governed by the AAA rules. Each party shall bear its own attorneys' fees and costs unless the arbitrator awards them otherwise based on statutory provisions.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-base">3. Class Action Waiver</h3>
                <p className="mt-1.5 text-gray-900 font-bold uppercase tracking-wide leading-relaxed">
                  YOU AND MADYAN HOLDINGS AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, OR REPRESENTATIVE PROCEEDING. The arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-base">4. 30-Day Opt-Out Right</h3>
                <p className="mt-1.5 text-gray-700 leading-relaxed">
                  You have the right to opt out of this mandatory arbitration provision and class action waiver. To do so, you must send a clear, written opt-out notice via email to <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] underline font-semibold">info@madyanholdings.com</a> within thirty (30) calendar days from the date you submit your initial Enrollment Application. The opt-out notice must include your full legal name, the email address associated with your enrollment, and a specific statement requesting to opt out of binding arbitration. If you opt out timely, all disputes will be resolved exclusively in the state or federal courts located in the State of Wyoming.
                </p>
              </div>

            </div>
          </section>

          {/* Section 17 */}
          <section className="space-y-4 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-bold text-[#0B1020] flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4F7CFF]/10 text-[#4F7CFF] flex items-center justify-center text-xs font-extrabold">17</span>
              Contact Information & Inquiries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">Madyan Holdings</span>
                <p className="text-gray-600">Operating Astra Pathways</p>
                <p className="text-gray-600">30 N Gould St, STE N, Sheridan, WY, USA - 82801</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">Electronic Inquiries</span>
                <p className="text-gray-600">Support Email: <a href="mailto:info@madyanholdings.com" className="text-[#4F7CFF] underline">info@madyanholdings.com</a></p>
                <p className="text-gray-600">Telephone: <a href="tel:13073177151" className="text-[#4F7CFF] underline">1-307-317-7151</a></p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
