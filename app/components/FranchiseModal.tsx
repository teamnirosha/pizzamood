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
  Coffee,
  Store,
} from "lucide-react";
import { getUTMParams, trackLeadFormStep, trackLeadFormSubmission } from "@/lib/analytics";
import { InvestmentBudget, StoreType } from "@/types";
import { DEFAULT_BUDGET, budgetForStore, pricingCompact } from "@/lib/pricing";
import { exclusivityLine, whatsappLink } from "@/lib/usps";
import { fmt } from "@/lib/fmt";
import { useLocale } from "./LocaleProvider";

interface FranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCity?: string;
}

export default function FranchiseModal({ isOpen, onClose, defaultCity = "" }: FranchiseModalProps) {
  const { lang, t } = useLocale();
  const m = t.shell.modal;
  const f = t.shell.form;
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    city: defaultCity,
    preferredLocation: "",
    investmentBudget: DEFAULT_BUDGET as InvestmentBudget,
    ownsProperty: false,
    preferredStoreType: "Cafe" as StoreType,
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
        return "Store & Property";
      case 4:
        return "Timeline & Requirements";
      case 5:
        return "Confirmation";
      default:
        return "Enquiry";
    }
  };

  const saveOrUpdateLead = async (overrideId?: string | null, complete = false) => {
    try {
      const utms = getUTMParams();
      const payload = {
        id: overrideId || leadId || undefined,
        ...formData,
        investmentBudget: budgetForStore(formData.preferredStoreType),
        phone: formData.whatsapp,
        source: utms,
        complete,
      };

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.lead) {
        setLeadId(data.lead.id);
        return data.lead;
      }
    } catch (err) {
      console.error("Lead save error:", err);
    }
    return null;
  };

  const handleNext = async () => {
    setErrorMsg("");
    if (step === 1) {
      if (!formData.name.trim() || formData.name.length < 2) {
        setErrorMsg(f.errName);
        return;
      }
      if (formData.whatsapp.replace(/\D/g, "").length < 10) {
        setErrorMsg(f.errPhone);
        return;
      }

      setIsSubmitting(true);
      await saveOrUpdateLead();
      setIsSubmitting(false);
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.city.trim()) {
        setErrorMsg(f.errCityPreferred);
        return;
      }
      saveOrUpdateLead();
      setStep(3);
      return;
    }

    if (step === 3) {
      saveOrUpdateLead();
      setStep(4);
      return;
    }

    if (step === 4) {
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
      const finalLead = await saveOrUpdateLead(leadId, true);
      setIsSuccess(true);
      setStep(5);
      trackLeadFormSubmission(finalLead?.id || leadId || "PM-NEW", formData.city || "Not Specified", budgetForStore(formData.preferredStoreType));
    } catch (err) {
      setErrorMsg(f.errNetwork);
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

  const whatsappDirectUrl = whatsappLink(
    fmt(f.waDirect, {
      city: formData.city || f.myCity,
      format: formData.preferredStoreType === "Kiosk" ? f.formatKiosk : f.formatCafe,
    })
  );
  const stepLabels = [m.step1, m.step2, m.step3, m.step4];
  const timelines: [string, string][] = [
    ["Immediate", m.tlImmediate],
    ["Within 30 days", m.tl30],
    ["1–3 months", m.tl13],
    ["Just exploring", m.tlExploring],
  ];
  const nameParts = (tpl: string) =>
    fmt(tpl, { name: "\u0001", city: "\u0002" })
      .split(/([\u0001\u0002])/)
      .map((part, i) =>
        part === "\u0001" || part === "\u0002" ? (
          <span key={i} className="font-bold text-slate-900">
            {part === "\u0001" ? formData.name : formData.city}
          </span>
        ) : (
          part
        )
      );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-500 p-6 text-white">
          <button
            onClick={resetForm}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
            aria-label={m.close}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-900 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> {pricingCompact(lang)}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl text-white">
            {m.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-sky-50">
            {m.subtitle}
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
                    0{i} {stepLabels[i - 1]}
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
                {m.h1}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    {f.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={f.namePh}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    {f.whatsappNo} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={f.phonePh}
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
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
                {m.h2}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    {f.targetCity} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={m.cityPh}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    {f.areaLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={m.areaPh}
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <p className="mt-1.5 text-[11px] font-bold text-red-600">{exclusivityLine(lang)}</p>
                </div>

                <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-sky-900">{m.supportTitle}</p>
                      <p className="text-xs text-sky-700 mt-0.5">
                        {m.supportBody}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-extrabold text-slate-900">
                {m.h3}
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  {m.selectFormat} <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cafe Option */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredStoreType: "Cafe" })}
                    className={`group relative flex flex-col justify-between rounded-2xl p-4.5 text-left border-2 transition-all duration-200 ${
                      formData.preferredStoreType === "Cafe"
                        ? "border-sky-500 bg-sky-50/80 shadow-md ring-2 ring-sky-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                          formData.preferredStoreType === "Cafe"
                            ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                            : "bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-600"
                        }`}>
                          <Coffee className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-black text-slate-900">{f.formatCafe}</h4>
                            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-extrabold text-sky-700">
                              {m.popular}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">{m.cafeDesc}</p>
                        </div>
                      </div>
                      {formData.preferredStoreType === "Cafe" && (
                        <CheckCircle2 className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200/70 text-xs">
                      <span className="font-bold text-slate-700">{m.cafeSize}</span>
                      <span className="font-semibold text-slate-500">{m.cafeSeating}</span>
                    </div>
                  </button>

                  {/* Kiosk Option */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredStoreType: "Kiosk" })}
                    className={`group relative flex flex-col justify-between rounded-2xl p-4.5 text-left border-2 transition-all duration-200 ${
                      formData.preferredStoreType === "Kiosk"
                        ? "border-sky-500 bg-sky-50/80 shadow-md ring-2 ring-sky-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                          formData.preferredStoreType === "Kiosk"
                            ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                            : "bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-600"
                        }`}>
                          <Store className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-black text-slate-900">{f.formatKiosk}</h4>
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                              {m.compact}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">{m.kioskDesc}</p>
                        </div>
                      </div>
                      {formData.preferredStoreType === "Kiosk" && (
                        <CheckCircle2 className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200/70 text-xs">
                      <span className="font-bold text-slate-700">{m.kioskSize}</span>
                      <span className="font-semibold text-slate-500">{m.kioskCounter}</span>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {m.propertyQ}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ownsProperty: true })}
                    className={`rounded-xl border p-3.5 text-center text-xs font-bold transition ${
                      formData.ownsProperty
                        ? "border-sky-600 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {m.propYes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, ownsProperty: false })}
                    className={`rounded-xl border p-3.5 text-center text-xs font-bold transition ${
                      !formData.ownsProperty
                        ? "border-sky-600 bg-sky-50 text-sky-700 ring-2 ring-sky-500/20"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {m.propNo}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-extrabold text-slate-900">
                {m.h4}
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  {m.timelineTitle}
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {timelines.map(([tl, tlLabel]) => (
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
                      {tlLabel}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700">
                  {m.messageLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder={m.messagePh}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{m.safe}</span>
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
                {m.successTitle}
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-600 max-w-md mx-auto">
                {nameParts(m.successBody)}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  <MessageSquare className="h-4 w-4" /> {m.connectWa}
                </a>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto rounded-2xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  {m.closeWindow}
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
                  <ArrowLeft className="h-4 w-4" /> {m.back}
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
                  m.submitting
                ) : step === 4 ? (
                  <>
                    {m.requestCall} <PhoneCall className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    {m.next} <ArrowRight className="h-4 w-4" />
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
