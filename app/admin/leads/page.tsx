"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  FileSpreadsheet,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Lead, LeadStatus } from "@/types";
import AdminHeader from "../components/AdminHeader";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      setUpdating(true);
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note: `Status updated to ${newStatus}` }),
      });
      const data = await res.json();
      if (data.success) {
        fetchLeads();
        if (selectedLead?.id === id) {
          setSelectedLead(data.lead);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;

    try {
      setUpdating(true);
      const res = await fetch(`/api/enquiries/${selectedLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedLead.status, note: newNote.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setNewNote("");
        fetchLeads();
        setSelectedLead(data.lead);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Phone",
      "WhatsApp",
      "Email",
      "City",
      "Preferred Location",
      "Investment Budget",
      "Property Status",
      "Store Type",
      "Timeline",
      "Status",
      "Created At",
      "Message",
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.whatsapp || ""}"`,
      `"${l.email || ""}"`,
      `"${l.city}"`,
      `"${l.preferredLocation || ""}"`,
      `"${l.investmentBudget}"`,
      l.ownsProperty ? "Yes" : "No",
      `"${l.preferredStoreType}"`,
      `"${l.timeline}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `pizza_mood_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = selectedStatus === "all" || l.status === selectedStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      l.name.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <AdminHeader title="FRANCHISE LEAD CRM" subtitle="Pizza Mood Business Portal">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 transition"
        >
          <FileSpreadsheet className="h-4 w-4" /> Export Leads CSV
        </button>
      </AdminHeader>

      <div className="mx-auto max-w-7xl px-6 py-8">
        
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4 mb-8">
          <Link href="/admin" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Dashboard Overview
          </Link>
          <Link href="/admin/leads" className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black text-white">
            Lead CRM ({leads.length})
          </Link>
          <Link href="/admin/locations" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Outlet Locations
          </Link>
          <Link href="/admin/settings" className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300">
            Site Settings
          </Link>
        </div>

        {/* Controls Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, phone, city or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-xs font-semibold text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-bold text-white focus:border-red-500"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="site_discussion">Site Discussion</option>
              <option value="converted">Converted</option>
              <option value="not_interested">Not Interested</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Split View: Table Left, Detail View Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Table list */}
          <div className={`${selectedLead ? "lg:col-span-7" : "lg:col-span-12"} transition-all`}>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl overflow-x-auto">
              {loading ? (
                <div className="py-12 text-center text-sm font-semibold text-slate-400">Loading leads...</div>
              ) : (
                <table className="w-full text-left text-xs font-medium">
                  <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-black tracking-wider">
                    <tr>
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Applicant</th>
                      <th className="py-3 px-3">City</th>
                      <th className="py-3 px-3">Budget</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredLeads.map((l) => (
                      <tr
                        key={l.id}
                        onClick={() => setSelectedLead(l)}
                        className={`cursor-pointer transition hover:bg-slate-950 ${
                          selectedLead?.id === l.id ? "bg-slate-950 border-l-4 border-red-500" : ""
                        }`}
                      >
                        <td className="py-3.5 px-3 font-black text-white">{l.id}</td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white">{l.name}</div>
                          <div className="text-[11px] text-slate-400">{l.phone}</div>
                        </td>
                        <td className="py-3.5 px-3 font-bold text-amber-400">{l.city}</td>
                        <td className="py-3.5 px-3 text-emerald-400 font-bold">{l.investmentBudget}</td>
                        <td className="py-3.5 px-3">
                          <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-1 text-[10px] font-black uppercase text-amber-300">
                            {l.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(l);
                            }}
                            className="rounded-lg bg-red-600/20 px-3 py-1.5 text-[11px] font-black text-red-400 hover:bg-red-600 hover:text-white transition"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Detailed Drawer / Inspector */}
          {selectedLead && (
            <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-red-400">{selectedLead.id}</span>
                  <h2 className="text-xl font-black text-white">{selectedLead.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Status Manager */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Update Lead Pipeline Status
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  disabled={updating}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-black text-amber-400 focus:border-red-500"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted / Call Completed</option>
                  <option value="qualified">Qualified Candidate</option>
                  <option value="site_discussion">Site Feasibility Discussion</option>
                  <option value="converted">Converted Franchise Partner</option>
                  <option value="not_interested">Not Interested</option>
                  <option value="closed">Closed Lead</option>
                </select>
              </div>

              {/* Contact Links */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-xs font-black text-white hover:bg-red-700 transition"
                >
                  <Phone className="h-4 w-4" /> Call Applicant
                </a>
                <a
                  href={`https://wa.me/${(selectedLead.whatsapp || selectedLead.phone).replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-black text-white hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="h-4 w-4" /> WhatsApp
                </a>
              </div>

              {/* Lead Details Grid */}
              <div className="space-y-3 text-xs font-semibold text-slate-300 border-t border-slate-800 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target City:</span>
                  <span className="font-extrabold text-amber-400">{selectedLead.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Location:</span>
                  <span className="font-bold text-white">{selectedLead.preferredLocation || "Flexible"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Investment Budget:</span>
                  <span className="font-bold text-emerald-400">{selectedLead.investmentBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Property Owned?</span>
                  <span className="font-bold text-white">{selectedLead.ownsProperty ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Store Format:</span>
                  <span className="font-bold text-white">{selectedLead.preferredStoreType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Launch Timeline:</span>
                  <span className="font-bold text-white">{selectedLead.timeline}</span>
                </div>
                {selectedLead.message && (
                  <div className="pt-2">
                    <span className="block text-slate-500 text-[10px] font-black uppercase">Applicant Message:</span>
                    <p className="mt-1 rounded-xl bg-slate-950 p-3 text-xs font-medium text-slate-300">
                      {selectedLead.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Internal Notes History */}
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <h4 className="text-xs font-black uppercase text-slate-400">Internal Activity Notes</h4>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                  {(selectedLead.notes || []).map((n, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-950 p-2.5 text-[11px] text-slate-400 font-medium">
                      {n}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add internal note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    disabled={updating}
                    className="rounded-xl bg-red-600 px-4 py-2 text-xs font-black text-white hover:bg-red-700 transition"
                  >
                    Add
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
