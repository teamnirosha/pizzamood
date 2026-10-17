"use client";

import { useState } from "react";
import Link from "@/app/components/LocalizedLink";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, Sparkles } from "lucide-react";
import { exclusivityLine } from "@/lib/usps";
import FranchiseModal from "./FranchiseModal";
import { SHOW_GALLERY } from "@/lib/flags";
import { pricingCompact } from "@/lib/pricing";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

const ALL_NAV = [
  { key: "home", href: "/" },
  { key: "franchise", href: "/franchise" },
  { key: "howItWorks", href: "/how-it-works" },
  { key: "investment", href: "/investment" },
  { key: "support", href: "/support" },
  { key: "locations", href: "/locations" },
  { key: "gallery", href: "/gallery" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

const NAV = ALL_NAV.filter((n) => n.key !== "gallery" || SHOW_GALLERY);

const LANGS: { code: Locale; label: string }[] = [
  { code: "mr", label: "मराठी" },
  { code: "en", label: "EN" },
];

function LanguageSwitcher({ path }: { path: string }) {
  const { lang, t } = useLocale();
  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 text-xs font-extrabold">
      {LANGS.map((l) => (
        <NextLink
          key={l.code}
          href={localePath(l.code, path)}
          hrefLang={l.code}
          lang={l.code}
          aria-current={l.code === lang ? "true" : undefined}
          className={`rounded-full px-3 py-1.5 transition ${l.code === lang ? "bg-sky-500 text-white shadow" : "text-slate-600 hover:text-slate-900"}`}
        >
          {l.label}
        </NextLink>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { lang, t } = useLocale();
  const rawPath = usePathname();
  const path = stripLocale(rawPath);
  const navItems = NAV.map((n) => ({ ...n, label: t.nav[n.key] }));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-500 px-4 py-2 text-center text-xs font-extrabold text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] uppercase font-black text-slate-900 shadow-sm">
              <Sparkles className="h-3 w-3" /> {pricingCompact(lang)}
            </span>
            <span className="font-bold text-white">{exclusivityLine(lang)}</span>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-4">
            <a
              href="tel:+919096970369"
              className="flex items-center gap-1 hover:underline text-white font-bold"
            >
              <Phone className="h-3 w-3" /> +91 90969 70369
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="underline font-black text-yellow-300 hover:text-white"
            >
              {t.nav.reserveArea}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Official Pizza Mood Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="group flex items-center"
          >
            <div className="relative h-16 w-16 transition group-hover:scale-105 lg:h-[72px] lg:w-[72px]">
              <img src="/logo-144.webp" alt="Pizza Mood Logo" width={72} height={72} className="h-full w-full object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = path === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition ${
                    isActive
                      ? "bg-sky-50 text-sky-600"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <LanguageSwitcher path={path} />
            <button
              onClick={() => setModalOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-sky-500 border-2 border-yellow-400 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-600 active:translate-y-0"
            >
              {t.nav.startFranchise}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile: language switcher stays visible next to the menu button */}
          <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher path={path} />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-sky-300 hover:text-sky-600 xl:hidden"
            aria-label={t.nav.toggleMenu}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-6 xl:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = path === item.href;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                      isActive
                        ? "bg-sky-50 text-sky-600"
                        : "text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setModalOpen(true);
                }}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-3.5 text-sm font-black text-white shadow-lg shadow-sky-500/30"
              >
                {t.nav.startFranchiseLong}
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Franchise Modal */}
      <FranchiseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}