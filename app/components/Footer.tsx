"use client";

import { pricingHeadline } from "@/lib/pricing";
import { fmt } from "@/lib/fmt";
import { useLocale } from "./LocaleProvider";
import { useState } from "react";
import Link from "@/app/components/LocalizedLink";
import {
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  ArrowRight,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { whatsappLink } from "@/lib/usps";
import FranchiseModal from "./FranchiseModal";
import { SHOW_GALLERY } from "@/lib/flags";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const { lang, t } = useLocale();
  const f = t.shell.footer;
  const pricing = pricingHeadline(lang);

  return (
    <>
      <footer className="border-t border-slate-200 bg-slate-950 text-white pt-16 pb-24 md:pb-12">
        {/* Banner CTA */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-500 p-8 sm:p-12 shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block rounded-full bg-yellow-400 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-slate-900 shadow-sm">
                {f.badge}
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-white">
                {f.heading}
              </h2>
              <p className="mt-2 text-sm font-medium text-sky-50 sm:text-base">
                {f.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="group flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-sky-600 shadow-xl transition hover:bg-slate-100"
                >
                  {f.startBtn}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                <a
                  href={whatsappLink(f.waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  <MessageSquare className="h-4 w-4" /> {f.whatsappBtn}
                </a>
              </div>
            </div>
          </div>

          {/* Main Footer Links */}
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1: Brand info */}
            <div className="lg:col-span-1 sm:col-span-2 space-y-4">
              <Link href="/" className="flex items-center">
                <img src="/logo-144.webp" alt={f.logoAlt} width={56} height={56} className="h-14 w-14 object-contain" />
              </Link>

              <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-sm">
                {fmt(f.about, { pricing })}
              </p>

              <div className="space-y-2 text-xs font-semibold text-slate-300 pt-2">
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <a href="tel:+919096970369" className="hover:text-white block">+91 90969 70369</a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <a href="mailto:info@pizzamood.in" className="hover:text-white block font-bold text-sky-400">info@pizzamood.in</a>
                    <a href="mailto:pizzamoodho@gmail.com" className="hover:text-white block text-slate-400 text-[11px]">pizzamoodho@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{f.hq}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com/pizzamoodofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-bold text-pink-400 hover:bg-slate-800 transition"
                >
                  <InstagramIcon className="h-3.5 w-3.5" /> @pizzamoodofficial
                </a>
                <a
                  href="https://facebook.com/pizzamood11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-bold text-blue-400 hover:bg-slate-800 transition"
                >
                  <FacebookIcon className="h-3.5 w-3.5" /> facebook.com/pizzamood11
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400">
                {f.hubTitle}
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs font-semibold text-slate-400">
                <li>
                  <Link href="/franchise" className="hover:text-white">
                    {f.overview}
                  </Link>
                </li>
                <li>
                  <Link href="/franchise/pune" className="hover:text-white">
                    {f.pune}
                  </Link>
                </li>
                <li>
                  <Link href="/franchise/under-10-lakhs" className="hover:text-white">
                    {f.under10}
                  </Link>
                </li>
                <li>
                  <Link href="/franchise/cost-in-india" className="hover:text-white">
                    {f.costGuide}
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    {f.process}
                  </Link>
                </li>
                <li>
                  <Link href="/investment" className="hover:text-white">
                    {f.investment}
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    {f.support}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    {f.faq}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    {f.enquiry}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Outlets & SEO */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400">
                {f.outletsTitle}
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs font-semibold text-slate-400">
                <li>
                  <Link href="/locations/pune/bavdhan" className="hover:text-white">
                    {f.bavdhan}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Corporate & Information */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400">
                {f.companyTitle}
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs font-semibold text-slate-400">
                <li>
                  <Link href="/story" className="hover:text-white">
                    {f.story}
                  </Link>
                </li>
                {SHOW_GALLERY && (
                  <li>
                    <Link href="/gallery" className="hover:text-white">
                      {f.gallery}
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    {f.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    {f.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-12 border-t border-slate-800 pt-8 text-[11px] font-medium text-slate-500 leading-relaxed">
            <p>
              <strong className="text-slate-400">{f.disclaimerLabel}</strong> {fmt(f.disclaimer, { pricing })}
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900 pt-6 text-xs text-slate-400">
            <p>{fmt(f.copyright, { year: new Date().getFullYear() })}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>{f.designedBy}</span>
              <a
                href="https://nirosha.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sky-400 hover:text-yellow-400 transition-colors underline decoration-sky-400/40 hover:decoration-yellow-400 underline-offset-4"
              >
                Team Nirosha
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE QUICK-ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/95 p-2.5 backdrop-blur-md md:hidden shadow-2xl">
        <a
          href="tel:+919096970369"
          className="flex flex-1 flex-col items-center gap-1 py-1 text-[11px] font-bold text-slate-700 hover:text-sky-600"
        >
          <Phone className="h-4 w-4 text-sky-600" />
          <span>{f.callUs}</span>
        </a>
        <a
          href={whatsappLink(f.waTextShort)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center gap-1 py-1 text-[11px] font-bold text-slate-700 hover:text-emerald-600"
        >
          <MessageSquare className="h-4 w-4 text-emerald-600" />
          <span>{f.whatsapp}</span>
        </a>
        <button
          onClick={() => setModalOpen(true)}
          className="flex flex-[1.5] items-center justify-center gap-1.5 rounded-xl bg-sky-500 border border-yellow-400 py-2.5 text-xs font-black text-white shadow-md shadow-sky-500/30"
        >
          <span>{f.enquireNow}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <FranchiseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}