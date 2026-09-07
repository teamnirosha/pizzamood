import Link from "next/link";
import { getLeads, getLocations } from "@/lib/db";
import AdminHeader from "./components/AdminHeader";
import {
  Users,
  Building2,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  PlusCircle,
  FileSpreadsheet,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const leads = await getLeads();
  const locations = await getLocations();

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const contactedLeads = leads.filter((l) => l.status === "contacted").length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <AdminHeader />

      <div className="mx-auto max-w-7xl px-6 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4 mb-8">
          <Link
            href="/admin"
            className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-red-600/30"
          >
            Dashboard Overview
          </Link>
          <Link
            href="/admin/leads"
            className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
          >
            Lead CRM ({totalLeads})
          </Link>
          <Link
            href="/admin/locations"
            className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
          >
            Outlet Locations ({locations.length})
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
          >
            Site & SEO Settings
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-extrabold uppercase tracking-wider">Total Enquiries</span>
              <Users className="h-5 w-5 text-red-500" />
            </div>
            <div className="mt-3 text-3xl font-black text-white">{totalLeads}</div>
            <p className="mt-1 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> High Quality Franchise Pipeline
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-extrabold uppercase tracking-wider">New Actionable Leads</span>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div className="mt-3 text-3xl font-black text-amber-400">{newLeads}</div>
            <p className="mt-1 text-[11px] font-semibold text-slate-400">Awaiting initial call back</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-extrabold uppercase tracking-wider">Qualified / Site Discussion</span>
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="mt-3 text-3xl font-black text-emerald-400">{qualifiedLeads}</div>
            <p className="mt-1 text-[11px] font-semibold text-slate-400">Site feasibility evaluation stage</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-extrabold uppercase tracking-wider">Active Store Outlets</span>
              <Building2 className="h-5 w-5 text-blue-500" />
            </div>
            <div className="mt-3 text-3xl font-black text-white">{locations.length}</div>
            <p className="mt-1 text-[11px] font-semibold text-blue-400">Across Pune, Mumbai & Thane</p>
          </div>
        </div>

        {/* Lead Funnel Pipeline Bar */}
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-300">
              Franchise Lead Conversion Funnel
            </h3>
            <span className="text-xs font-extrabold text-emerald-400">
              Conversion Rate: {conversionRate}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs text-slate-400 font-bold">New</span>
              <div className="text-xl font-black text-white mt-1">{newLeads}</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs text-slate-400 font-bold">Contacted</span>
              <div className="text-xl font-black text-blue-400 mt-1">{contactedLeads}</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs text-slate-400 font-bold">Qualified</span>
              <div className="text-xl font-black text-emerald-400 mt-1">{qualifiedLeads}</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs text-slate-400 font-bold">Converted</span>
              <div className="text-xl font-black text-amber-400 mt-1">{convertedLeads}</div>
            </div>
          </div>
        </div>

        {/* Recent Enquiries Table */}
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-white">Recent Franchise Enquiries</h3>
              <p className="text-xs font-semibold text-slate-400">Latest leads submitted through website</p>
            </div>

            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1 text-xs font-black text-red-400 hover:underline"
            >
              View All Leads →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-black tracking-wider">
                <tr>
                  <th className="py-3 px-4">Lead ID</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Target City</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Timeline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id} className="hover:bg-slate-950/50 transition">
                    <td className="py-3.5 px-4 font-black text-white">{l.id}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{l.name}</td>
                    <td className="py-3.5 px-4 text-slate-400">{l.phone}</td>
                    <td className="py-3.5 px-4 font-extrabold text-amber-400">{l.city}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-bold">{l.investmentBudget}</td>
                    <td className="py-3.5 px-4 text-slate-400">{l.timeline}</td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-full bg-red-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-red-400 border border-red-500/30">
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-500">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
