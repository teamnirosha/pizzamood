import { Check } from "lucide-react";
import { USPS } from "@/lib/usps";

export default function UspChecklist() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {USPS.map((u) => (
        <li key={u.id} className="flex items-start gap-2 text-sm font-bold text-slate-800">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-600 p-0.5 text-white" aria-hidden="true" />
          <span>{u.title}</span>
        </li>
      ))}
    </ul>
  );
}
