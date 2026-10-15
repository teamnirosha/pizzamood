import { MODELS } from "@/lib/pricing";

export default function PricingCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {MODELS.map((m) => (
        <div key={m.id} className="rounded-2xl border border-amber-200 bg-white p-4 shadow-xl shadow-amber-500/10">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">{m.label} Model</div>
          <div className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{m.formattedTotal}</div>
          <div className="mt-1 text-xs font-bold text-sky-600">Total investment ({m.lakh})</div>
        </div>
      ))}
    </div>
  );
}
