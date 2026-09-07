"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, MapPin } from "lucide-react";

export default function NewLocationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    area: "",
    state: "Maharashtra",
    postalCode: "",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    latitude: 18.5204,
    longitude: 73.8567,
    shortDescription: "",
    description: "",
    status: "active",
    seoTitle: "",
    seoDescription: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const citySlug = formData.city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const areaSlug = formData.area.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const slug = `${citySlug}/${areaSlug}`;

      const payload = {
        ...formData,
        slug,
        seo: {
          title: formData.seoTitle || `Best Pizza Store in ${formData.area}, ${formData.city} | Pizza Mood`,
          description: formData.seoDescription || `Visit Pizza Mood ${formData.area}, ${formData.city} for fresh pizza, fast food delivery, timings & directions.`,
          focusKeyword: `best pizza store in ${formData.area}`,
        },
      };

      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin/locations");
      } else {
        setErrorMsg(data.message || "Failed to create location.");
      }
    } catch (err) {
      setErrorMsg("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-16">
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/locations" className="rounded-xl bg-slate-800 p-2 text-slate-300 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-black text-white">Add New Store Outlet</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {errorMsg && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs font-bold text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Basic Details */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Basic Store Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Store Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pizza Mood Kharadi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Area *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kharadi"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">Full Address</label>
              <textarea
                rows={2}
                placeholder="Shop 4, Ground Floor, Main Road, Area, City..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
              />
            </div>
          </div>

          {/* Contact & Map Coordinates */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Contact & Map Geo Coordinates
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Local SEO Overrides */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">
              Local SEO Configuration
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">Custom Page Title</label>
              <input
                type="text"
                placeholder={`Best Pizza Store in ${formData.area || "Area"}, ${formData.city || "City"} | Pizza Mood`}
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">Meta Description</label>
              <textarea
                rows={2}
                placeholder="Looking for the best pizza in..."
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-red-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/admin/locations"
              className="rounded-2xl border border-slate-800 px-6 py-3 text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-2xl bg-red-600 px-8 py-3 text-xs font-black text-white hover:bg-red-700 transition"
            >
              <Save className="h-4 w-4" /> {submitting ? "Saving..." : "Save Store Location"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
