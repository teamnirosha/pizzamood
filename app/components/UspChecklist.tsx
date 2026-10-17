"use client";

import { Check } from "lucide-react";
import { getUsps } from "@/lib/usps";
import { useLocale } from "./LocaleProvider";

export default function UspChecklist() {
  const { lang } = useLocale();
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {getUsps(lang).map((u) => (
        <li key={u.id} className="flex items-start gap-2 text-sm font-bold text-slate-800">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-600 p-0.5 text-white" aria-hidden="true" />
          <span>{u.title}</span>
        </li>
      ))}
    </ul>
  );
}
