"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, MapPin, Phone, ExternalLink } from "lucide-react";
import { OutletLocation } from "@/types";
import AdminHeader from "../components/AdminHeader";

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<OutletLocation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/locations");
      const data = await res.json();
      if (data.success && data.locations) {
        setLocations(data.locations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchLocations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <AdminHeader title="LOCATION MANAGEMENT" subtitle="Pizza Mood Store Outlets">
        <Link
          href="/admin/locations/new"
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-black text-white hover:bg-red-700 transition"
        >
          <Plus className="h-4 w-4" /> Add New Store Outlet
        </Link>
      </AdminHeader>

      <div className="mx-auto max-w-7xl px-6 py-8">
        
        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4 mb-8">
          <Link href="/admin" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Dashboard Overview
          </Link>
          <Link href="/admin/leads" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Lead CRM
          </Link>
          <Link href="/admin/locations" className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black text-white">
            Outlet Locations ({locations.length})
          </Link>
          <Link href="/admin/settings" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Site Settings
          </Link>
        </div>

        {/* Locations List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-950">
                  <img
                    src={loc.images[0]?.url || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"}
                    alt={loc.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-slate-900/90 px-3 py-1 text-[10px] font-black text-amber-400">
                    {loc.city} • {loc.area}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black text-white">{loc.name}</h3>
                  <p className="text-xs text-slate-400 font-medium line-clamp-2">{loc.address}</p>

                  <div className="text-xs font-semibold text-slate-300 space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-red-500" /> {loc.phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-amber-400 font-bold">Slug:</span> /locations/{loc.slug}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                <Link
                  href={`/locations/${loc.slug}`}
                  target="_blank"
                  className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View Live Page
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/locations/${loc.id}`}
                    className="flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700"
                  >
                    <Edit className="h-3.5 w-3.5 text-amber-400" /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(loc.id, loc.name)}
                    className="flex items-center gap-1 rounded-xl bg-red-600/20 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
