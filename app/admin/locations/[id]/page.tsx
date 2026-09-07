"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { OutletLocation } from "@/types";

export default function EditLocationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState<OutletLocation | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/locations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.location) {
          setFormData(data.location);
        } else {
          setErrorMsg("Location not found.");
        }
      })
      .catch(() => setErrorMsg("Error fetching details."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/locations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin/locations");
      } else {
        setErrorMsg(data.message || "Failed to update location.");
      }
    } catch (err) {
      setErrorMsg("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="text-sm font-semibold text-slate-400">Loading store details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-16">
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/locations" className="rounded-xl bg-slate-800 p-2 text-slate-300 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-black text-white">Edit Store Outlet: {formData.name}</h1>
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
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">Basic Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Store Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-amber-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Area</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">Full Address</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          {/* Contact & Map Coordinates */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">Contact & Map Geo Coordinates</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">WhatsApp</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Local SEO */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">Local SEO Metadata Overrides</h2>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">SEO Title</label>
              <input
                type="text"
                value={formData.seo?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, title: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400">Meta Description</label>
              <textarea
                rows={2}
                value={formData.seo?.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    seo: { ...formData.seo, description: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white"
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
              <Save className="h-4 w-4" /> {submitting ? "Updating..." : "Update Store Outlet"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
