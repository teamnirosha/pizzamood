"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Go4thsas") {
      document.cookie = "pm_admin_auth=true; path=/; max-age=86400";
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid admin password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white font-black text-2xl shadow-lg shadow-red-600/30">
            🍕
          </div>
          <h1 className="mt-4 text-2xl font-black text-white">Pizza Mood Admin CRM</h1>
          <p className="mt-1 text-xs font-semibold text-slate-400">
            Franchise Lead Management & Store Location Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-bold text-red-400 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400">
              Admin Access Key / Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-3 text-sm font-semibold text-white focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3.5 text-sm font-black text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition"
          >
            Authenticate Access <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Protected Franchise Portal</span>
        </div>
      </div>
    </div>
  );
}
