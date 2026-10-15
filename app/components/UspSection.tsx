import { MessageCircle } from "lucide-react";
import { USPS, EXCLUSIVITY_LINE, whatsappLink } from "@/lib/usps";
import UspIcon from "./UspIcon";
import EnquiryButton from "./EnquiryButton";

export default function UspSection() {
  return (
    <section id="why-pizza-mood-promises" className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-sky-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-700 border border-sky-200">
            Our 7 Promises
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            What You Get When You Join Pizza Mood
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-600">Simple, clear and written down. No fine print surprises.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USPS.map((u) => (
            <div key={u.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <UspIcon name={u.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-base font-black text-slate-900">{u.title}</h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">{u.line}</p>
            </div>
          ))}
          <div className="flex flex-col justify-center rounded-2xl border-2 border-red-300 bg-red-50 p-5">
            <div className="text-xs font-black uppercase tracking-wider text-red-600">Limited by design</div>
            <p className="mt-1 text-base font-black text-slate-900">{EXCLUSIVITY_LINE}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <EnquiryButton />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-sm font-black text-white shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
