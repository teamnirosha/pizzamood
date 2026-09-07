import { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare, ArrowRight } from "lucide-react";

import FranchiseForm from "../components/FranchiseForm";

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact Pizza Mood Franchise Team | Enquire Today",
  description: "Get in touch with Pizza Mood franchise development managers. Phone, WhatsApp, email & office address for franchise opportunities in India.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-sky-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-700">
            Get In Touch
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Contact Pizza Mood Franchise Team
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Have questions about territorial rights, investment breakdown, or store setup? Submit your enquiry below or reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6">
              <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
                Corporate Contact Details
              </h2>

              <div className="space-y-5 text-xs font-semibold text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Phone / WhatsApp</span>
                    <a href="tel:+919096970369" className="text-base font-black text-slate-900 hover:text-sky-600 block">
                      +91 90969 70369
                    </a>
                    <a href="tel:+918390909027" className="text-base font-black text-slate-900 hover:text-sky-600 block">
                      +91 83909 09027
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Official Email</span>
                    <a href="mailto:info@pizzamood.in" className="text-sm font-black text-sky-600 hover:underline block">
                      info@pizzamood.in
                    </a>
                    <a href="mailto:pizzamoodho@gmail.com" className="text-xs font-bold text-slate-500 hover:underline block">
                      pizzamoodho@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 shrink-0">
                    <InstagramIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Instagram Handle</span>
                    <a
                      href="https://instagram.com/pizzamoodpune"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-black text-slate-900 hover:text-pink-600"
                    >
                      @pizzamoodpune
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                    <FacebookIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Facebook Page</span>
                    <a
                      href="https://facebook.com/pizzamood11"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-black text-slate-900 hover:text-blue-600"
                    >
                      facebook.com/pizzamood11
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">HQ Office</span>
                    <span className="text-slate-900 font-bold leading-relaxed">
                      Mauli Krupa Complex, Karve Nagar, Pune, Maharashtra 411052
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/919096970369?text=Hi%20Pizza%20Mood,%20I%20want%20to%20know%20more%20about%20franchise."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-xs font-black text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="h-4 w-4" /> Connect Directly on WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-black text-slate-900">Looking for an existing store?</h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">Check address, timings and contact details of active Pizza Mood outlets across India.</p>
              <Link href="/locations" className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-sky-600 hover:underline">
                View Locations Directory <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Embedded Franchise Application Form */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-black text-slate-900">Start Your Franchise Application</h2>
            <p className="mt-1 text-xs font-medium text-slate-600 mb-6">
              Fill out the form below to request a direct call back from our franchise business development manager.
            </p>

            <FranchiseForm />
          </div>

        </div>

      </div>
    </div>
  );
}