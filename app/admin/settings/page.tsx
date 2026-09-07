"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Save, Sparkles, CheckCircle2, Calculator } from "lucide-react";
import { SiteSettings } from "@/types";
import AdminHeader from "../components/AdminHeader";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setMsg("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Site settings updated successfully.");
      }
    } catch (err) {
      setMsg("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleInvestmentItemChange = (index: number, field: string, value: string) => {
    if (!settings) return;
    const updated = [...settings.investmentBreakdown];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, investmentBreakdown: updated });
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="text-sm font-semibold text-slate-400">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-16">
      <AdminHeader title="SITE & SEO SETTINGS" subtitle="Master Config Editor" />

      <div className="mx-auto max-w-4xl px-6 py-8">
        
        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4 mb-8">
          <Link href="/admin" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Dashboard Overview
          </Link>
          <Link href="/admin/leads" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Lead CRM
          </Link>
          <Link href="/admin/locations" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Outlet Locations
          </Link>
          <Link href="/admin/settings" className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black text-white">
            Site Settings
          </Link>
        </div>

        {msg && (
          <div className="mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-xs font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> {msg}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* General Business Stats & Identity */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Brand Identity & Hero Stats
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Brand Name</label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Starting Investment Badge</label>
                <input
                  type="text"
                  value={settings.startingInvestment}
                  onChange={(e) => setSettings({ ...settings, startingInvestment: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Target Launch Days Badge</label>
                <input
                  type="text"
                  value={settings.targetLaunchDays}
                  onChange={(e) => setSettings({ ...settings, targetLaunchDays: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Primary Phone Helpline</label>
                <input
                  type="text"
                  value={settings.primaryPhone}
                  onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">Corporate HQ Address</label>
              <textarea
                rows={2}
                value={settings.headquartersAddress}
                onChange={(e) => setSettings({ ...settings, headquartersAddress: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
              />
            </div>
          </div>

          {/* Investment Breakdown Config */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-black text-white">Editable ₹4 Lakh Investment Items</h2>
              <Calculator className="h-4 w-4 text-amber-400" />
            </div>

            <div className="space-y-3">
              {settings.investmentBreakdown.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => handleInvestmentItemChange(idx, "category", e.target.value)}
                    placeholder="Category Name"
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                  />
                  <input
                    type="text"
                    value={item.amount}
                    onChange={(e) => handleInvestmentItemChange(idx, "amount", e.target.value)}
                    placeholder="Amount (e.g. ₹1,50,000)"
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-red-400"
                  />
                  <input
                    type="text"
                    value={item.details}
                    onChange={(e) => handleInvestmentItemChange(idx, "details", e.target.value)}
                    placeholder="Item details description..."
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Legal Disclaimer Text */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Legal Disclaimer Text
            </h2>
            <textarea
              rows={3}
              value={settings.disclaimerText}
              onChange={(e) => setSettings({ ...settings, disclaimerText: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-slate-300 focus:border-red-500"
            />
          </div>

          {/* Master SEO Defaults */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Default Homepage SEO Meta Tags
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">Default Title Tag</label>
              <input
                type="text"
                value={settings.seoDefaultTitle}
                onChange={(e) => setSettings({ ...settings, seoDefaultTitle: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">Default Meta Description</label>
              <textarea
                rows={2}
                value={settings.seoDefaultDescription}
                onChange={(e) => setSettings({ ...settings, seoDefaultDescription: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-2xl bg-red-600 px-8 py-3.5 text-xs font-black text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition"
            >
              <Save className="h-4 w-4" /> {saving ? "Saving Changes..." : "Save Master Settings"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
