import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Handshake,
  MapPin,
  Rocket,
  Store,
  Users,
  Utensils,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Tell Us About Your Shop",
    description:
      "Fill out a simple partnership form and tell us about your shop, location, current business and goals.",
    points: [
      "Tell us about your business",
      "Share your shop location",
      "Choose your partnership goal",
    ],
  },
  {
    number: "02",
    icon: MapPin,
    title: "Our Team Visits You",
    description:
      "Our team connects with you and visits your shop to understand the location, setup and business potential.",
    points: [
      "Shop & location evaluation",
      "Business discussion",
      "Partnership suitability check",
    ],
  },
  {
    number: "03",
    icon: Handshake,
    title: "Become a PizzaLoot Partner",
    description:
      "Once everything is agreed, we complete the partnership process and prepare your shop for the PizzaLoot experience.",
    points: [
      "Partnership documentation",
      "Brand guidelines",
      "Setup planning",
    ],
  },
  {
    number: "04",
    icon: Store,
    title: "Transform Your Shop",
    description:
      "We guide you through PizzaLoot branding, menu presentation, packaging, equipment requirements and shop setup.",
    points: [
      "PizzaLoot branding",
      "Menu & packaging",
      "Shop setup guidance",
    ],
  },
  {
    number: "05",
    icon: Utensils,
    title: "Train Your Team",
    description:
      "Your staff receives guidance on PizzaLoot products, recipes, preparation, hygiene and customer service.",
    points: [
      "Product & recipe training",
      "Kitchen process",
      "Customer service guidance",
    ],
  },
  {
    number: "06",
    icon: Rocket,
    title: "Launch & Grow",
    description:
      "Launch your PizzaLoot business with our support and continue receiving practical guidance as you grow.",
    points: [
      "Launch support",
      "Marketing guidance",
      "Ongoing business support",
    ],
  },
];

const supportItems = [
  {
    icon: Store,
    title: "Brand Identity",
    description:
      "PizzaLoot branding, visual guidelines and shop presentation support.",
  },
  {
    icon: Utensils,
    title: "Products & Recipes",
    description:
      "Standardized product guidance to help deliver a consistent PizzaLoot experience.",
  },
  {
    icon: Users,
    title: "Team Training",
    description:
      "Practical training and operating guidance for your staff.",
  },
  {
    icon: Rocket,
    title: "Marketing Support",
    description:
      "Launch and promotional guidance to help attract customers.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="overflow-hidden bg-[#fffaf5]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative">
        {/* Background decoration */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-yellow-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Hero content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Simple. Structured. Supported.
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                How
                <span className="text-orange-500"> PizzaLoot </span>
                Works
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                You bring the shop. We bring the PizzaLoot brand, products,
                training and business support. Together, we build a stronger
                food business.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-7 py-4 font-bold text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  Become a PizzaLoot Partner
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#process"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
                >
                  Explore The Process
                </Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="relative rounded-[2.5rem] bg-slate-900 p-5 shadow-2xl">
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-8 sm:p-10">
                  {/* Flow */}
                  <div className="relative">
                    <div className="mb-8">
                      <p className="text-sm font-semibold text-orange-100">
                        THE PIZZALLOOT JOURNEY
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-white">
                        From Shop
                        <br />
                        to PizzaLoot
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {[
                        ["01", "Your Shop"],
                        ["02", "PizzaLoot Brand"],
                        ["03", "Training & Setup"],
                        ["04", "Launch & Grow"],
                      ].map(([number, title], index) => (
                        <div
                          key={number}
                          className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-orange-500">
                            {number}
                          </div>

                          <div className="flex-1">
                            <p className="font-bold text-white">{title}</p>
                            <p className="text-xs text-orange-100">
                              {index === 0
                                ? "You bring the business"
                                : index === 1
                                  ? "We bring the brand"
                                  : index === 2
                                    ? "We help you prepare"
                                    : "Together we grow"}
                            </p>
                          </div>

                          {index < 3 && (
                            <ArrowRight className="h-4 w-4 text-white/50" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 rounded-2xl bg-white p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                          🍕
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-400">
                            THE GOAL
                          </p>
                          <p className="font-black text-slate-900">
                            Build. Launch. Grow.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-slate-900">
                      Full Support
                    </p>
                    <p className="text-xs text-slate-500">
                      From setup to growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              One Simple Idea
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              You focus on your shop.
              <br />
              <span className="text-orange-500">
                We help you build the brand.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              PizzaLoot is designed for shopkeepers and food entrepreneurs
              who want the support of a structured food brand without having
              to figure everything out alone.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {[
              {
                number: "01",
                title: "You Bring",
                text: "Shop, team, investment and local business knowledge.",
              },
              {
                number: "02",
                title: "We Bring",
                text: "Brand, products, training, systems and marketing support.",
              },
              {
                number: "03",
                title: "Together",
                text: "We create a consistent PizzaLoot customer experience.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-3xl border border-slate-200 bg-[#fffaf5] p-7"
              >
                <span className="text-sm font-black text-orange-500">
                  {item.number}
                </span>

                <h3 className="mt-4 text-xl font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================= */}
      <section id="process" className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              The Process
            </span>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              From first conversation
              <br />
              to your PizzaLoot launch.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We keep the process simple, practical and focused on helping
              your shop become ready for the PizzaLoot experience.
            </p>
          </div>

          <div className="relative mt-16">
            {/* Desktop connecting line */}
            <div className="absolute left-[42px] top-10 hidden h-[calc(100%-80px)] w-px bg-orange-200 lg:block" />

            <div className="space-y-7">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="group relative grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8 lg:grid-cols-[100px_1fr_1fr] lg:items-center"
                  >
                    {/* Number */}
                    <div className="relative z-10 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white shadow-lg shadow-orange-500/20">
                      {step.number}
                    </div>

                    {/* Title */}
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <Icon className="h-5 w-5 text-orange-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Step {step.number}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-3 max-w-xl leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </div>

                    {/* Points */}
                    <div className="space-y-3 lg:pl-8">
                      {step.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                        >
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE PROVIDE
      ========================================================= */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
                What You Get
              </span>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                More than
                <br />
                just a name.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                PizzaLoot is designed as a complete brand-support system.
                Our goal is to help you operate with more structure,
                consistency and confidence.
              </p>

              <Link
                href="/what-we-provide"
                className="group mt-8 inline-flex items-center gap-3 font-bold text-orange-400 transition hover:text-orange-300"
              >
                Explore What We Provide
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15">
                      <Icon className="h-6 w-6 text-orange-400" />
                    </div>

                    <h3 className="mt-5 text-xl font-black text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PARTNER RESPONSIBILITIES
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              Clear Responsibilities
            </span>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              You bring the business.
              <br />
              <span className="text-orange-500">We support the brand.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Partner */}
            <div className="rounded-[2rem] border border-slate-200 bg-[#fffaf5] p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xl">
                  🏪
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Responsibility
                  </p>
                  <h3 className="text-2xl font-black text-slate-900">
                    The Partner
                  </h3>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  "Shop / business location",
                  "Local staff and daily operations",
                  "Required business investment",
                  "Local operating expenses",
                  "Customer service and shop management",
                  "Following PizzaLoot standards",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PizzaLoot */}
            <div className="rounded-[2rem] bg-orange-500 p-8 shadow-xl shadow-orange-500/20 sm:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl">
                  🍕
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-100">
                    Our Responsibility
                  </p>
                  <h3 className="text-2xl font-black text-white">
                    PizzaLoot
                  </h3>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  "PizzaLoot brand identity",
                  "Product and recipe guidance",
                  "Training and SOP support",
                  "Branding and shop setup guidance",
                  "Marketing and launch support",
                  "Ongoing business guidance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                    <span className="font-medium text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-7 py-14 text-center shadow-2xl sm:px-12 lg:px-20">
            {/* Decorations */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/10 blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow-lg">
                🍕
              </div>

              <h2 className="mx-auto mt-7 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Ready to turn your shop into a PizzaLoot business?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                Tell us about your shop and our team will guide you through
                the PizzaLoot partnership process.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
                >
                  Start Your Partnership
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/partnership-plans"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition hover:bg-white/10"
                >
                  View Partnership Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}