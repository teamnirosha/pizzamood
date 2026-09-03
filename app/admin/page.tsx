"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  LogOut,
  Eye,
  Phone,
  MapPin,
  Store,
  Users,
  Clock,
  CheckCircle2,
  X,
  Lock,
  RefreshCw,
} from "lucide-react";

type EnquiryStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "closed";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  city: string;
  shopType: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
};

/*
  DEMO PASSWORD ONLY

  For production, move authentication to the server.
*/
const ADMIN_PASSWORD = "PizzaLoot@123";

const shopTypeLabels: Record<string, string> = {
  existing_shop: "Existing Shop",
  new_shop: "New Shop",
  cloud_kitchen: "Cloud Kitchen",
  restaurant: "Restaurant",
  cafe: "Cafe",
  other: "Other",
};

const statusLabels: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  closed: "Closed",
};

const statusStyles: Record<EnquiryStatus, string> = {
  new: "bg-orange-100 text-orange-700",
  contacted: "bg-blue-100 text-blue-700",
  qualified: "bg-green-100 text-green-700",
  closed: "bg-slate-100 text-slate-700",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | EnquiryStatus
  >("all");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState<Enquiry | null>(null);

  useEffect(() => {
    const isLoggedIn =
      sessionStorage.getItem("pizzaloot_admin") === "true";

    if (isLoggedIn) {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchEnquiries();
    }
  }, [authenticated]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/enquiries", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to load enquiries"
        );
      }

      setEnquiries(result.enquiries || []);
    } catch (error) {
      console.error("Fetch enquiries error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("pizzaloot_admin", "true");
      setAuthenticated(true);
      setLoginError("");
      setPassword("");
    } else {
      setLoginError("Incorrect admin password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pizzaloot_admin");
    setAuthenticated(false);
    setEnquiries([]);
  };

  const filteredEnquiries = useMemo(() => {
    const query = search.toLowerCase().trim();

    return enquiries.filter((enquiry) => {
      const matchesSearch =
        !query ||
        enquiry.name.toLowerCase().includes(query) ||
        enquiry.phone.toLowerCase().includes(query) ||
        enquiry.city.toLowerCase().includes(query) ||
        enquiry.shopType.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        enquiry.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, search, statusFilter]);

  const totalEnquiries = enquiries.length;

  const newEnquiries = enquiries.filter(
    (item) => item.status === "new"
  ).length;

  const contactedEnquiries = enquiries.filter(
    (item) => item.status === "contacted"
  ).length;

  const qualifiedEnquiries = enquiries.filter(
    (item) => item.status === "qualified"
  ).length;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  /*
    LOGIN SCREEN
  */
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#fffaf5] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[2rem] shadow-xl border border-orange-100 p-8 sm:p-10">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-black">
                  PL
                </span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-900">
                PizzaLoot Admin
              </h1>

              <p className="mt-2 text-slate-500">
                Sign in to view partnership enquiries.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Admin Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {loginError && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-600">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 transition"
              >
                Login to Dashboard
                        </button>
                        <p className="text-sm text-gray-400">Password : PizzaLoot@123</p>
            </form>
          </div>

          <p className="text-center text-sm text-slate-400 mt-6">
            PizzaLoot Admin Dashboard
          </p>
        </div>
      </main>
    );
  }

  /*
    ADMIN DASHBOARD
  */
  return (
    <main className="min-h-screen bg-[#fffaf5]">
      {/* Header */}
      <header className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-20 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                  <span className="font-black">PL</span>
                </div>

                <div>
                  <h1 className="font-black text-lg">
                    PizzaLoot Admin
                  </h1>

                  <p className="text-xs text-slate-400">
                    Partnership Enquiries
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold hover:bg-slate-900 transition"
            >
              <LogOut size={17} />
              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-orange-600 font-bold text-sm uppercase tracking-wider">
              Dashboard
            </p>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
              Enquiry Overview
            </h2>

            <p className="text-slate-500 mt-2">
              Manage and follow up with PizzaLoot partnership leads.
            </p>
          </div>

          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:border-orange-300 transition disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                <Users
                  size={21}
                  className="text-orange-600"
                />
              </div>

              <span className="text-xs font-bold text-slate-400">
                TOTAL
              </span>
            </div>

            <p className="text-3xl font-black text-slate-900 mt-5">
              {totalEnquiries}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Total Enquiries
            </p>
          </div>

          {/* New */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                <Clock
                  size={21}
                  className="text-orange-600"
                />
              </div>

              <span className="text-xs font-bold text-orange-500">
                NEW
              </span>
            </div>

            <p className="text-3xl font-black text-slate-900 mt-5">
              {newEnquiries}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              New Enquiries
            </p>
          </div>

          {/* Contacted */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                <Phone
                  size={21}
                  className="text-blue-600"
                />
              </div>

              <span className="text-xs font-bold text-blue-500">
                CONTACTED
              </span>
            </div>

            <p className="text-3xl font-black text-slate-900 mt-5">
              {contactedEnquiries}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Contacted
            </p>
          </div>

          {/* Qualified */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2
                  size={21}
                  className="text-green-600"
                />
              </div>

              <span className="text-xs font-bold text-green-500">
                QUALIFIED
              </span>
            </div>

            <p className="text-3xl font-black text-slate-900 mt-5">
              {qualifiedEnquiries}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Qualified Leads
            </p>
          </div>
        </div>

        {/* Search / Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search name, phone, city..."
                className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                    | "all"
                    | EnquiryStatus
                )
              }
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-500 bg-white font-medium text-slate-700"
            >
              <option value="all">
                All Status
              </option>

              <option value="new">
                New
              </option>

              <option value="contacted">
                Contacted
              </option>

              <option value="qualified">
                Qualified
              </option>

              <option value="closed">
                Closed
              </option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filteredEnquiries.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-900">
              {totalEnquiries}
            </span>{" "}
            enquiries
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              Loading enquiries...
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Users className="text-slate-400" />
              </div>

              <h3 className="font-bold text-slate-900 mt-4">
                No enquiries found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                New contact form submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Customer
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Phone
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Location
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Business
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="text-right px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="hover:bg-orange-50/40 transition"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">
                          {enquiry.name}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {enquiry.id}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <a
                          href={`tel:${enquiry.phone}`}
                          className="font-medium text-slate-700 hover:text-orange-600"
                        >
                          {enquiry.phone}
                        </a>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin size={15} />
                          {enquiry.city}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Store size={15} />

                          {shopTypeLabels[
                            enquiry.shopType
                          ] || enquiry.shopType}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            statusStyles[enquiry.status]
                          }`}
                        >
                          {statusLabels[enquiry.status]}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">
                        {formatDate(enquiry.createdAt)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() =>
                            setSelectedEnquiry(enquiry)
                          }
                          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-orange-500 transition"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {loading ? (
            <div className="bg-white rounded-2xl p-10 text-center text-slate-500">
              Loading enquiries...
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <Users className="mx-auto text-slate-400" />

              <p className="font-bold text-slate-900 mt-3">
                No enquiries found
              </p>
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-slate-900">
                      {enquiry.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      {enquiry.id}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      statusStyles[enquiry.status]
                    }`}
                  >
                    {statusLabels[enquiry.status]}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <Phone
                      size={16}
                      className="text-orange-500"
                    />
                    {enquiry.phone}
                  </a>

                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin
                      size={16}
                      className="text-orange-500"
                    />
                    {enquiry.city}
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <Store
                      size={16}
                      className="text-orange-500"
                    />

                    {shopTypeLabels[
                      enquiry.shopType
                    ] || enquiry.shopType}
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-xs">
                    <Clock size={15} />
                    {formatDate(enquiry.createdAt)}
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedEnquiry(enquiry)
                  }
                  className="w-full mt-5 rounded-xl bg-slate-900 text-white py-3 font-bold text-sm flex items-center justify-center gap-2 hover:bg-orange-500 transition"
                >
                  <Eye size={16} />
                  View Enquiry
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View enquiry modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="bg-slate-950 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                  Partnership Enquiry
                </p>

                <h3 className="text-xl font-black mt-1">
                  {selectedEnquiry.name}
                </h3>
              </div>

              <button
                onClick={() =>
                  setSelectedEnquiry(null)
                }
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Phone
                  </p>

                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex items-center gap-2 text-slate-900 font-bold mt-2"
                  >
                    <Phone
                      size={16}
                      className="text-orange-500"
                    />
                    {selectedEnquiry.phone}
                  </a>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    City
                  </p>

                  <p className="flex items-center gap-2 text-slate-900 font-bold mt-2">
                    <MapPin
                      size={16}
                      className="text-orange-500"
                    />
                    {selectedEnquiry.city}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Business Type
                  </p>

                  <p className="flex items-center gap-2 text-slate-900 font-bold mt-2">
                    <Store
                      size={16}
                      className="text-orange-500"
                    />

                    {shopTypeLabels[
                      selectedEnquiry.shopType
                    ] || selectedEnquiry.shopType}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Status
                  </p>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold mt-2 ${
                      statusStyles[
                        selectedEnquiry.status
                      ]
                    }`}
                  >
                    {
                      statusLabels[
                        selectedEnquiry.status
                      ]
                    }
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs text-slate-400 font-bold uppercase">
                  Message
                </p>

                <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 leading-6 min-h-24">
                  {selectedEnquiry.message ||
                    "No message provided."}
                </div>
              </div>

              <div className="mt-5 text-xs text-slate-400">
                Submitted:{" "}
                {formatDate(
                  selectedEnquiry.createdAt
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="flex-1 rounded-xl bg-orange-500 hover:bg-orange-600 text-white py-3 font-bold text-center flex items-center justify-center gap-2 transition"
                >
                  <Phone size={17} />
                  Call Customer
                </a>

                <button
                  onClick={() =>
                    setSelectedEnquiry(null)
                  }
                  className="px-5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

