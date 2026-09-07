import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Pizza Mood Franchise India",
  description: "Privacy Policy for Pizza Mood India. Learn how we collect, protect, and handle franchise applicant personal information and site analytics.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 7, 2026";

  return (
    <div className="bg-slate-50 min-h-screen py-16 text-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-700">
            <ShieldCheck className="h-4 w-4" /> Legal Protection
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-semibold text-slate-500">
            Last Updated: {lastUpdated} • Pizza Mood Franchise India
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl space-y-8 text-sm leading-relaxed text-slate-700">
          
          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">1. Introduction & Overview</h2>
            <p>
              Pizza Mood ("Company", "We", "Us", or "Our") operates the official franchise website at{" "}
              <Link href="/" className="text-sky-600 font-bold hover:underline">
                pizzamood.in
              </Link>
              . We are committed to protecting the privacy and confidentiality of entrepreneurs, applicants, visitors, and partners who interact with our franchise platform.
            </p>
            <p className="mt-3">
              This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you submit a franchise enquiry, explore store locations, or communicate with our business development team.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">2. Information We Collect</h2>
            <p>When you interact with our website or submit an enquiry form, we may collect the following personal and business details:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 font-medium text-slate-600">
              <li><strong>Contact Information:</strong> Full name, phone number, WhatsApp number, and email address.</li>
              <li><strong>Franchise Intent Data:</strong> Target city, preferred area/location, property ownership status, preferred store format (Takeaway, Small QSR, etc.), and planned launch timeline.</li>
              <li><strong>Financial Preferences:</strong> Self-selected investment budget range (e.g., ₹4–6 Lakh, ₹6–10 Lakh).</li>
              <li><strong>Technical & Analytics Data:</strong> IP address, browser type, referral source (UTM parameters), page views, and device identifier collected automatically via anonymized site analytics.</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">3. How We Use Your Information</h2>
            <p>We use the information collected strictly for legitimate business operations related to franchise evaluation and customer support:</p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 font-medium text-slate-600">
              <li>To evaluate territorial viability and connect you with our regional franchise development manager.</li>
              <li>To contact you via phone call, SMS, or WhatsApp regarding your franchise application request.</li>
              <li>To provide customized financial breakdowns, equipment lists, and store setup assistance based on your target city.</li>
              <li>To analyze website performance, optimize user experience, and prevent fraudulent submissions.</li>
            </ul>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">4. Data Protection & Non-Sharing Policy</h2>
            <p>
              We prioritize data security and implement industry-standard administrative, technical, and physical safeguards to protect your personal details against unauthorized access, loss, or misuse.
            </p>
            <div className="mt-4 rounded-2xl bg-sky-50 border border-sky-200 p-4 text-xs font-semibold text-sky-900">
              <strong>Strict Confidentiality Commitment:</strong> Pizza Mood does NOT sell, rent, trade, or monetize your contact information or franchise enquiry details to third-party marketing brokers.
            </div>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">5. Cookies & Tracking Technologies</h2>
            <p>
              Our website uses essential cookies and performance analytics to store session preferences and measure traffic sources (such as UTM campaign tracking). You may choose to disable cookies through your browser settings; however, certain interactive features (like modal steps or map filters) may function with reduced performance.
            </p>
          </div>

          <div className="border-b border-slate-100 pb-6">
            <h2 className="text-lg font-black text-slate-900 mb-2">6. Your Rights & Data Opt-Out</h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or request complete removal of your enquiry record from our internal CRM database at any time.
            </p>
            <p className="mt-3">
              To request data removal or opt out of franchise communications, send an email with the subject line <strong>"Data Opt-Out Request"</strong> to{" "}
              <a href="mailto:info@pizzamood.in" className="text-sky-600 font-bold hover:underline">
                info@pizzamood.in
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900 mb-2">7. Contact Information</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our administrative desk:</p>
            <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-2 text-xs font-semibold text-slate-700">
              <p><strong>Pizza Mood India HQ</strong></p>
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
