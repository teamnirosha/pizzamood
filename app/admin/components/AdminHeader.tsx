"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ArrowLeft } from "lucide-react";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function AdminHeader({
  title = "PIZZA MOOD ADMIN",
  subtitle = "Franchise CRM & Store Management",
  children,
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "pm_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-600 font-black text-xl text-white shadow-md shadow-red-600/30">
            🍕
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white">{title}</h1>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400">
              {subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {children}
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Main Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white transition"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
