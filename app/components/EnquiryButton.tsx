"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import FranchiseModal from "./FranchiseModal";

const DEFAULT_CLASS =
  "group inline-flex items-center gap-2.5 rounded-full bg-sky-500 border-2 border-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-600";

export default function EnquiryButton({ label = "Get Free Franchise Details", className = DEFAULT_CLASS }: { label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
      <FranchiseModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
