"use client";

import { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Building2,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { getUTMParams, trackLeadFormStep, trackLeadFormSubmission } from "@/lib/analytics";
import { InvestmentBudget, StoreType } from "@/types";

interface FranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCity?: string;
}

export default function FranchiseModal({ isOpen, onClose, defaultCity = "" }: FranchiseModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: defaultCity,
    preferredLocation: "",
    investmentBudget: "₹4–6 Lakh" as InvestmentBudget,
    ownsProperty: false,
    preferredStoreType: "Takeaway" as StoreType,
    timeline: "Within 30 days",
    message: "",
  });

  useEffect(() => {
    if (defaultCity) {
      setFormData((prev) => ({ ...prev, city: defaultCity }));
    }
  }, [defaultCity]);

  useEffect(() => {
    if (isOpen) {
      trackLeadFormStep(step, getStepName(step));
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const getStepName = (s: number) => {
    switch (s) {
      case 1:
        return "Personal Details";
      case 2:
        return "Location Choice";
      case 3:
        return "Investment & Property";
      case 4:
        return "Timeline & Requirements";
      case 5:
        return "Confirmation";
      default:
        return "Enquiry";
    }
  };

  const handleNext = () => {
    setErrorMsg("");
    if (step === 1) {
      if (!formData.name.trim() || formData.name.length < 2) {
        setErrorMsg("Please enter your full name.");
        return;
      }
      if (!formData.phone.trim() || formData.phone.length < 10) {
        setErrorMsg("Please enter a valid 10-digit mobile number.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.city.trim()) {
        setErrorMsg("Please enter your preferred city.");
        return;
      }
    }

    if (step < 4) {
      const nextStep = step + 1;
      setStep(nextStep);
    } else if (step === 4) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setErrorMsg("");
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const utms = getUTMParams();
      const payload = {
        ...formData,
        whatsapp: formData.whatsapp || formData.phone,
        source: utms,
      };

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
        setStep(5);
        trackLeadFormSubmission(data.lead?.id || "PM-NEW", formData.city, formData.investmentBudget);
      } else {
        setErrorMsg(data.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setErrorMsg("");
    onClose();
  };

  const whatsappDirectUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi Pizza Mood Franchise Team, I have submitted an enquiry for ${formData.city || "my city"}. I'd like to get complete franchise details for starting with ₹4 Lakh.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-500 p-6 text-white">
          <button
            onClick={resetForm}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-900 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> Start From ₹4 Lakh
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl text-white">
            Pizza Mood Franchise Application
          </h2>
          <p className="mt-1 text-sm font-medium text-sky-50">
            Join India's fastest growing QSR brand. 360° support from store setup to launch.
          </p>

          {/* Progress indicators */}
          {!isSuccess && (
            <div className="mt-6 flex items-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i <= step ? "bg-yellow-400" : "bg-white/30"
                    }`}
                  />
                  <span className="mt-1 block text-[10px] font-bold text-sky-100">
                    0{i} {getStepName(i)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-extrabold text-slate-900">
                01. Tell us about yourself
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="Same as mobile if blank"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-extrabold text-slate-900">
                02. Where do you want to open your outlet?
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Target City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Mumbai, Thane, Nashik, Nagpur, PCMC"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Preferred Area / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kharadi, Baner, Lokhandwala, Vashi, High Street"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-sky-900">Location Support Included</p>
                      <p className="text-xs text-sky-700 mt-0.5">
                        Don't have a location ready? Pizza Mood experts evaluate footfall, commercial catchment, and competitor density to help you pick the prime spot.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-extrabold text-slate-900">
                03. Investment Budget & Store Preferences
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Select Investment Budget Range
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {(
                    ["₹4–6 Lakh", "₹6–10 Lakh", "₹10–15 Lakh", "₹15 Lakh+", "Need guidance"] as InvestmentBudget[]
                  ).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, investmentBudget: b })}
                      className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${
                        formData.investmentBudget === b
                          ? "border-sky-600 bg-sky-50 text-sky-700 font-bold ring-2 ring-sky-500/20"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 font-medium"
                      }`}
                    >
                      <span className="text-xs">{b}</span>
                      {formData.investmentBudget === b && (
                        <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Do you own or have commercial property ready?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ownsProperty: true })}
                    className={`rounded-xl border p-3 text-center text-xs font-bold transition ${
                      formData.ownsProperty
                        ? "border-sky-600 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    Yes, I have property
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ownsProperty: false })}
                    className={`rounded-xl border p-3 text-center text-xs font-bold transition ${
                      !formData.ownsProperty
                        ? "border-sky-600 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    No, looking for rental site
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Preferred Store Format
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {(["Takeaway", "Small QSR", "High Street", "Food Court"] as StoreType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredStoreType: t })}
                      className={`rounded-xl border p-2.5 text-center text-xs font-bold transition ${
                        formData.preferredStoreType === t
                          ? "border-sky-600 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20"
                          : "border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-extrabold text-slate-900">
                04. When do you plan to launch your store?
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Target Launch Timeline
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["Immediate", "Within 30 days", "1–3 months", "Just exploring"].map((tl) => (
                    <button
                      key={tl}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline: tl })}
                      className={`rounded-xl border p-3 text-center text-xs font-bold transition ${
                        formData.timeline === tl
                          ? "border-sky-600 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20"
                          : "border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {tl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Additional Message or Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us any specific requirements or questions you have..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Your details are safe with Pizza Mood. Our franchise team will contact you shortly.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 - SUCCESS STATE */}
          {isSuccess && (
            <div className="py-6 text-center animate-in zoom-in-95 duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-2xl font-black text-slate-900">
                Your Pizza Mood Journey Starts Here!
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-bold text-slate-900">{formData.name}</span>! Our franchise business development manager for <span className="font-bold text-slate-900">{formData.city}</span> will call you within 24 hours.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  <MessageSquare className="h-4 w-4" /> Prefer Instant Chat? Connect on WhatsApp
                </a>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          {!isSuccess && (
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-2xl bg-sky-500 border-2 border-yellow-400 px-6 py-3 text-sm font-black text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-600 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : step === 4 ? (
                  <>
                    Request Franchise Call <PhoneCall className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next Step <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
