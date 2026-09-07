"use client";

import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import FranchiseModal from "./FranchiseModal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle Background Accent Blobs */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Headlines & Badges */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-black text-sky-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>INDIA'S HIGH-PROFIT QSR FRANCHISE OPPORTUNITY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
              Your Pizza Business <br />
              <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-500 bg-clip-text text-transparent">
                Starts Here.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base font-semibold text-slate-600 sm:text-lg leading-relaxed max-w-2xl">
              Start your own Pizza Mood franchise with an investment starting from{" "}
              <strong className="text-slate-900 underline decoration-yellow-400 decoration-4">
                ₹4 Lakh
              </strong>{" "}
              — complete with location selection assistance, kitchen equipment, staff training, fresh raw materials supply, and ongoing business guidance.
            </p>

            {/* 3 Bold Franchise Opportunity Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-xl shadow-sky-500/10 transition hover:-translate-y-1">
                <div className="text-2xl font-black text-sky-600 sm:text-3xl">₹4 Lakh+</div>
                <div className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Starting Investment
                </div>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-xl shadow-amber-500/10 transition hover:-translate-y-1">
                <div className="text-2xl font-black text-amber-600 sm:text-3xl">30 Days</div>
                <div className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Target Store Launch
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1">
                <div className="text-2xl font-black text-slate-900 sm:text-3xl">360°</div>
                <div className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Business Support
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="group flex items-center gap-2.5 rounded-full bg-sky-500 border-2 border-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-600 active:translate-y-0"
              >
                Start Your Franchise
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <a
                href="#opportunity"
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-extrabold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Explore the Opportunity
              </a>
            </div>

            {/* Trust bullet features */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" /> Zero Royalty Option Available
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" /> High Margin Product Ecosystem
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" /> No Prior Cooking Skill Needed
              </span>
            </div>

          </div>

          {/* Right Column: High Quality Food Visuals */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Banner Image Container */}
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl shadow-sky-900/20 border-4 border-yellow-400">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
                  alt="Pizza Mood Fresh Hot Oven Pizza"
                  className="h-[460px] w-full object-cover transition duration-700 hover:scale-105"
                />

                {/* Overlaid Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Overlay Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 backdrop-blur-md border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-600">
                        Signature Recipe
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        100% Mozzarella Cheese Burst Pizza
                      </h3>
                    </div>
                    <span className="rounded-xl bg-yellow-400 px-3 py-1 text-xs font-black text-slate-900">
                      High Demand
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge Left */}
              <div className="absolute -top-4 -left-4 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 font-bold">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">Rapid Store Expansion</div>
                    <div className="text-[10px] font-semibold text-slate-500">18+ Active Outlets</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-slate-900 p-4 text-white shadow-2xl border border-slate-800 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white font-bold">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">Target 30-Day Opening</div>
                    <div className="text-[10px] font-semibold text-yellow-400">Location to Grand Launch</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <FranchiseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}