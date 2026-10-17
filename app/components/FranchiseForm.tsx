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
import { DEFAULT_BUDGET, budgetForStore } from "@/lib/pricing";
import { exclusivityLine, whatsappLink } from "@/lib/usps";
import { fmt } from "@/lib/fmt";
import { useLocale } from "./LocaleProvider";

export default function FranchiseForm() {
  const { lang, t } = useLocale();
  const f = t.shell.form;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    city: "",
    preferredLocation: "",
    investmentBudget: DEFAULT_BUDGET as InvestmentBudget,
    ownsProperty: false,
    preferredStoreType: "Cafe" as StoreType,
    timeline: "Within 30 days",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || formData.name.length < 2) {
      setErrorMsg(f.errName);
      return;
    }
    if (formData.whatsapp.replace(/\D/g, "").length < 10) {
      setErrorMsg(f.errPhone);
      return;
    }
    if (!formData.city.trim()) {
      setErrorMsg(f.errCityTarget);
      return;
    }

    setIsSubmitting(true);

    try {
      const utms = getUTMParams();
      const payload = {
        ...formData,
        investmentBudget: budgetForStore(formData.preferredStoreType),
        phone: formData.whatsapp,
        source: utms,
        complete: true,
      };

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
        trackLeadFormSubmission(data.lead?.id || "PM-NEW", formData.city, budgetForStore(formData.preferredStoreType));
      } else {
        setErrorMsg((lang === "en" && data.message) || f.errFailed);
      }
    } catch (err) {
      setErrorMsg(f.errNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = whatsappLink(
    fmt(f.waDirect, {
      city: formData.city || f.myCity,
      format: formData.preferredStoreType === "Kiosk" ? f.formatKiosk : f.formatCafe,
    })
  );

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="mt-4 text-2xl font-black text-slate-900">
          {f.successTitle}
        </h3>
        <p className="mt-2 text-sm font-medium text-slate-600 max-w-md mx-auto">
          {fmt(f.successBody, { name: "\u0001", city: "\u0002", phone: "\u0003" })
            .split(/([\u0001\u0002\u0003])/)
            .map((part, i) =>
              part === "\u0001" || part === "\u0002" || part === "\u0003" ? (
                <span key={i} className="font-bold text-slate-900">
                  {part === "\u0001" ? formData.name : part === "\u0002" ? formData.city : formData.whatsapp}
                </span>
              ) : (
                part
              )
            )}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <MessageSquare className="h-4 w-4" /> {f.connectWa}
          </a>
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full sm:w-auto rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            {f.submitAnother}
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
          <Sparkles className="h-3.5 w-3.5" /> {f.sec1}
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              {f.fullName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={f.namePh}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              {f.whatsappNo} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder={f.phonePh}
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
          {f.sec2}
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              {f.targetCity} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={f.cityPh}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              {f.areaLabel}
            </label>
            <input
              type="text"
              placeholder={f.areaPh}
              value={formData.preferredLocation}
              onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            <p className="mt-1.5 text-[11px] font-bold text-red-600">{exclusivityLine(lang)}</p>
          </div>
        </div>
      </div>

      {/* Store Preference & Timeline */}
      <div className="border-t border-slate-100 pt-5">
        <h3 className="text-xs font-black uppercase tracking-wider text-sky-600 mb-3">
          {f.sec3}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              {f.storeFormat} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.preferredStoreType}
              onChange={(e) => setFormData({ ...formData, preferredStoreType: e.target.value as StoreType })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="Cafe">{f.optCafe}</option>
              <option value="Kiosk">{f.optKiosk}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              {f.timelineLabel}
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="Immediate">{f.tlImmediate}</option>
              <option value="Within 30 days">{f.tl30}</option>
              <option value="1–3 months">{f.tl13}</option>
              <option value="Just exploring">{f.tlExploring}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
          {f.messageLabel}
        </label>
        <textarea
          rows={3}
          placeholder={f.messagePh}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{f.noObligation}</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-2xl bg-sky-500 border-2 border-yellow-400 px-8 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-600 active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            f.submitting
          ) : (
            <>
              {f.submit} <PhoneCall className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
