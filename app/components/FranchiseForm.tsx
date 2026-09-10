"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  PhoneCall,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { getUTMParams, trackLeadFormSubmission } from "@/lib/analytics";
import { InvestmentBudget, StoreType } from "@/types";

export default function FranchiseForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "",
    preferredLocation: "",
    investmentBudget: "₹4–6 Lakh" as InvestmentBudget,
    ownsProperty: false,
    preferredStoreType: "Cafe" as StoreType,
    timeline: "Within 30 days",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || formData.name.length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.city.trim()) {
      setErrorMsg("Please enter your target city.");
      return;
    }

    setIsSubmitting(true);

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

  const whatsappDirectUrl = `https://wa.me/919096970369?text=${encodeURIComponent(
    `Hi Pizza Mood Franchise Team, I have submitted an enquiry for ${formData.city || "my city"}. I'd like to get complete franchise details for starting with ₹4 Lakh.`
  )}`;

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="mt-4 text-2xl font-black text-slate-900">
          Enquiry Received Successfully!
        </h3>
        <p className="mt-2 text-sm font-medium text-slate-600 max-w-md mx-auto">
          Thank you, <span className="font-bold text-slate-900">{formData.name}</span>! Our franchise business development manager for <span className="font-bold text-slate-900">{formData.city}</span> will call you shortly on <span className="font-bold text-slate-900">{formData.phone}</span>.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <MessageSquare className="h-4 w-4" /> Connect Directly on WhatsApp
          </a>
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full sm:w-auto rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="rounded-2xl bg-red-50 p-4 text-xs font-bold text-red-600 border border-red-200">
          {errorMsg}
        </div>
      )}

      {/* Applicant Info */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-sky-600 mb-3 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> 1. Applicant Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              WhatsApp Number (Optional)
            </label>
            <input
              type="tel"
              placeholder="Same as mobile if blank"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
      </div>

      {/* Target Location */}
      <div className="border-t border-slate-100 pt-5">
        <h3 className="text-xs font-black uppercase tracking-wider text-sky-600 mb-3">
          2. Target Location & Setup Details
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Target City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Pune, Mumbai, Thane, PCMC"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Preferred Area / Location
            </label>
            <input
              type="text"
              placeholder="e.g. Kharadi, Baner, Lokhandwala"
              value={formData.preferredLocation}
              onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
      </div>

      {/* Store Preference & Timeline */}
      <div className="border-t border-slate-100 pt-5">
        <h3 className="text-xs font-black uppercase tracking-wider text-sky-600 mb-3">
          3. Store Format & Timeline
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Store Format <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.preferredStoreType}
              onChange={(e) => setFormData({ ...formData, preferredStoreType: e.target.value as StoreType })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="Cafe">Cafe (Dine-in & Takeaway)</option>
              <option value="Kiosk">Kiosk (Express & Food Court)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Planned Launch Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="Immediate">Immediate (Ready to start)</option>
              <option value="Within 30 days">Within 30 days</option>
              <option value="1–3 months">1–3 months</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
          Additional Message or Location Details (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Tell us any specific requirements, property details, or questions..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>No obligation. Instant callback.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-2xl bg-sky-500 border-2 border-yellow-400 px-8 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-600 active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Submit Franchise Application <PhoneCall className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
