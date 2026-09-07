import { Metadata } from "next";
import { CheckCircle2, ArrowRight, PhoneCall, MapPin, Store, GraduationCap, Rocket, LineChart } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | 7-Step Pizza Mood Franchise Launch Journey",
  description: "Learn how to open your Pizza Mood franchise store in 7 clear steps. From enquiry and site selection to store launch in 30 days.",
};

const steps = [
  { step: "01", title: "Submit Enquiry", desc: "Fill out the 5-step online franchise application form on our website with your target city & budget.", icon: PhoneCall },
  { step: "02", title: "Speak With Franchise Team", desc: "Our Franchise Manager calls you within 24 hours to explain unit economics, territory availability & setup details.", icon: PhoneCall },
  { step: "03", title: "Select Location", desc: "Our site intelligence team analyzes footfall, demographics, and commercial viability to finalize a prime site.", icon: MapPin },
  { step: "04", title: "Finalize Store", desc: "Sign the franchise agreement and lock in your exclusive territory rights for your target area.", icon: Store },
  { step: "05", title: "Store Setup", desc: "Receive turnkey architectural layout blueprints, commercial pizza oven installation & exterior LED signage.", icon: Store },
  { step: "06", title: "Staff Training", desc: "We provide comprehensive hands-on kitchen SOPs, pizza assembly, hygiene, and billing software training.", icon: GraduationCap },
  { step: "07", title: "Launch & Grow", desc: "Execute grand launch marketing, Swiggy/Zomato onboarding, and receive ongoing business growth guidance.", icon: Rocket },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">
            Franchise Roadmap
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Your 7-Step Journey to Owning a Pizza Mood
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            From your initial enquiry to opening day in as little as 30 days. Here is exactly how we work together.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-red-200 hidden md:block" />

          <div className="space-y-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="relative flex flex-col md:flex-row items-start gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-xl hover:border-red-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white font-black text-xl shadow-lg shadow-red-600/30 shrink-0 z-10">
                    {s.step}
                  </div>

                  <div className="flex-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-red-600">
                      Phase 0{i + 1}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{s.title}</h3>
                    <p className="mt-2 text-xs font-medium text-slate-600 leading-relaxed max-w-2xl">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}