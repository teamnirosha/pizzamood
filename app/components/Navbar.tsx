"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, Sparkles } from "lucide-react";
import FranchiseModal from "./FranchiseModal";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Franchise", href: "/franchise" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Investment", href: "/investment" },
  { label: "Support", href: "/support" },
  { label: "Locations", href: "/locations" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-500 px-4 py-2 text-center text-xs font-extrabold text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] uppercase font-black text-slate-900 shadow-sm">
              <Sparkles className="h-3 w-3" /> ₹4 Lakh Opportunity
            </span>
            <span className="font-bold text-white">Own a Pizza Mood Franchise in your city!</span>
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
              Check City Availability →
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
            <div className="relative h-16 w-16 transition group-hover:scale-105">
              <img src="/logo.svg" alt="Pizza Mood Logo" className="h-full w-full object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
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
            <button
              onClick={() => setModalOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-sky-500 border-2 border-yellow-400 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-600 active:translate-y-0"
            >
              Start Your Franchise
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-sky-300 hover:text-sky-600 xl:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-6 xl:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
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
                Start Your Pizza Mood Franchise
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