import { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, ArrowLeft, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Pizza Mood Franchise India",
  description: "Terms & Conditions for Pizza Mood website and franchise application. Read investment disclaimers, brand usage guidelines, and operational policies.",
};

export default function TermsPage() {
  const lastUpdated = "September 7, 2026";

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-800">
            <FileText className="h-4 w-4" /> Legal Framework
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-xs font-semibold text-slate-500">
            Last Updated: {lastUpdated} • Pizza Mood Franchise India
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl space-y-8 text-sm leading-relaxed text-slate-700">
          
          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Pizza Mood website (
              <Link href="/" className="text-sky-600 font-bold hover:underline">
                pizzamood.in
              </Link>
              ), submitting a franchise enquiry form, or exploring business partnership details, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you should refrain from using our website.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">2. Franchise Investment Disclaimer</h2>
            <p>
              All financial figures, starting investment estimates (such as "starting from ₹4 Lakh"), equipment lists, and store setup timelines displayed on this website are indicative estimates for standard takeaway format QSR stores.
            </p>
            <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs font-semibold text-amber-900 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" /> Important Investment Note:
              </div>
              <p>
                Actual investment requirements may vary depending on store format (Takeaway, Small QSR, High Street, Food Court), commercial property square footage, city tier, civil work readiness, electrical setup, and localized operating costs. Final investment terms are formalized only upon executing an official Franchise Agreement.
              </p>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">3. No Guarantee of Revenue or Profits</h2>
            <p>
              Pizza Mood does not make, imply, or provide any legally binding guarantees regarding store sales volume, customer footfall, daily revenue, or monthly net profit margins for any proposed or active franchise outlet.
            </p>
            <p className="mt-3">
              Franchise success depends on individual operator diligence, localized marketing execution, customer service quality, site location dynamics, and general economic conditions. Past performance of existing outlets is not a legal guarantee of future performance.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">4. Site Selection & Approval Rights</h2>
            <p>
              Submitting a franchise enquiry or proposing a retail location does not constitute a binding grant of territorial exclusivity or store approval. Pizza Mood reserves the right to evaluate site feasibility, footfall density, catchment area, and proximity to existing outlets before granting final location approval.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">5. Intellectual Property Rights</h2>
            <p>
              All materials on this website—including the Pizza Mood brand logo, brand assets, images, text descriptions, menu item names, trade dress, and promotional graphics—are the exclusive property of Pizza Mood India.
            </p>
            <p className="mt-3">
              No party may copy, reproduce, modify, distribute, or display Pizza Mood trademarks or marketing collateral without prior written permission from Pizza Mood corporate management.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Pizza Mood and its officers, directors, employees, or brand representatives shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to access this website or its contents.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">7. Governing Law & Jurisdiction</h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any legal disputes or claims arising out of these terms or website usage shall be subject to the exclusive jurisdiction of the courts in <strong>Pune, Maharashtra, India</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900 mb-2">8. Contact Information</h2>
            <p>For questions or official legal correspondence regarding these Terms & Conditions, please reach out to our corporate office:</p>
            <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-2 text-xs font-semibold text-slate-700">
              <p><strong>Pizza Mood India Corporate Desk</strong></p>
              <p>Address: Mauli Krupa Complex, Karve Nagar, Pune, Maharashtra 411052</p>
              <p>Email: <a href="mailto:info@pizzamood.in" className="text-sky-600 hover:underline">info@pizzamood.in</a> | <a href="mailto:pizzamoodho@gmail.com" className="text-slate-500 hover:underline">pizzamoodho@gmail.com</a></p>
              <p>Helpline: +91 90969 70369 / +91 83909 09027</p>
            </div>
          </div>

        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-xs font-black text-slate-700 shadow-sm hover:bg-slate-100 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Pizza Mood Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
