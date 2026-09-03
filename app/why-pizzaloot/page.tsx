import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  Check,
  ChevronRight,
  Headphones,
  Megaphone,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";

const benefits = [
  {
    icon: Store,
    title: "Your Shop, Our Brand",
    description:
      "Keep your local business while giving it the PizzaLoot identity, presentation and customer experience.",
  },
  {
    icon: Utensils,
    title: "Ready-to-Use Products",
    description:
      "Get structured product and recipe guidance so you don't have to build your complete menu from zero.",
  },
  {
    icon: Users,
    title: "Staff Training",
    description:
      "Help your team understand products, preparation, hygiene, service and PizzaLoot standards.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support",
    description:
      "Get promotional ideas, launch support and brand marketing guidance to attract more customers.",
  },
  {
    icon: PackageCheck,
    title: "Professional Branding",
    description:
      "Create a consistent PizzaLoot experience across your shop, menu, packaging and customer touchpoints.",
  },
  {
    icon: Headphones,
    title: "Ongoing Guidance",
    description:
      "You're not left alone after launch. PizzaLoot is built around continuous practical business support.",
  },
];

const comparisonItems = [
  "Brand identity",
  "Structured menu",
  "Recipe guidance",
  "Staff training",
  "Shop branding support",
  "Marketing support",
  "Operational guidance",
  "Ongoing brand support",
];

const ecosystemItems = [
  {
    icon: Target,
    number: "01",
    title: "Brand",
    text: "Build your local business under a recognizable PizzaLoot identity.",
  },
  {
    icon: Utensils,
    number: "02",
    title: "Products",
    text: "Follow structured recipes and product standards for consistency.",
  },
  {
    icon: Users,
    number: "03",
    title: "People",
    text: "Train your team to deliver the PizzaLoot experience.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Growth",
    text: "Use marketing and business guidance to keep improving.",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Built Around Your Business",
    text: "We understand that every shop has its own location, customers and operating style. Our support is designed around your business.",
  },
  {
    icon: Sparkles,
    title: "A Stronger Customer Experience",
    text: "Consistent branding, products, packaging and service can help create a more professional customer experience.",
  },
  {
    icon: BarChart3,
    title: "Focus on What Matters",
    text: "Instead of spending all your time figuring out branding, recipes and marketing, you can focus more on running and growing your shop.",
  },
];

export default function WhyPizzaLootPage() {
  return (
    <main className="overflow-hidden bg-[#fffaf5]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative">
        {/* Decorative background */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-yellow-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm">
                <Sparkles className="h-4 w-4 fill-orange-500" />
                Why Choose PizzaLoot?
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Don't build your
                <br />
                food business
                <br />
                <span className="text-orange-500">from zero.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                PizzaLoot gives shopkeepers the brand, product guidance,
                training, marketing and business support they need to create
                a stronger food business.
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
                  href="#benefits"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
                >
                  Explore Benefits
                </Link>
              </div>

              {/* Small trust row */}
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-orange-500" />
                  Brand Support
                </div>

                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-orange-500" />
                  Training
                </div>

                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-orange-500" />
                  Marketing
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="relative rounded-[2.5rem] bg-slate-900 p-5 shadow-2xl">
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-7 sm:p-9">
                  {/* Decorative circles */}
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
                  <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-black/10" />

                  <div className="relative">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-100">
                      PizzaLoot Advantage
                    </p>

                    <h2 className="mt-3 max-w-sm text-3xl font-black leading-tight text-white sm:text-4xl">
                      More than a name.
                      <br />
                      It's a support system.
                    </h2>

                    {/* Central pizza card */}
                    <div className="mx-auto mt-10 flex h-52 w-52 items-center justify-center rounded-full bg-[#ffd76a] shadow-2xl ring-8 ring-white/20 sm:h-60 sm:w-60">
                      <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[#f4bf62] shadow-inner sm:h-52 sm:w-52">
                        <div className="absolute inset-3 rounded-full bg-[#ffd969]" />

                        {/* Pepperoni */}
                        <span className="absolute left-[25%] top-[27%] h-9 w-9 rounded-full bg-red-500" />
                        <span className="absolute right-[22%] top-[30%] h-10 w-10 rounded-full bg-red-500" />
                        <span className="absolute left-[33%] bottom-[23%] h-10 w-10 rounded-full bg-red-500" />
                        <span className="absolute right-[28%] bottom-[25%] h-8 w-8 rounded-full bg-red-500" />

                        {/* Green toppings */}
                        <span className="absolute left-[47%] top-[18%] h-6 w-2 rotate-45 rounded-full bg-green-600" />
                        <span className="absolute left-[19%] top-[52%] h-6 w-2 -rotate-45 rounded-full bg-green-600" />
                        <span className="absolute right-[17%] top-[53%] h-6 w-2 rotate-45 rounded-full bg-green-600" />
                      </div>
                    </div>

                    {/* Bottom message */}
                    <div className="mt-9 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl">
                          🍕
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-orange-100">
                            THE PIZZALLOOT PROMISE
                          </p>
                          <p className="mt-1 font-black text-white">
                            Your shop. Our support. One brand.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-slate-900">
                      One Partner
                    </p>
                    <p className="text-xs text-slate-500">
                      Multiple areas of support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / BIG STATEMENT
      ========================================================= */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
            The PizzaLoot Difference
          </span>

          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            You don't have to figure out
            <br className="hidden sm:block" />
            <span className="text-orange-500">everything yourself.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            Building a successful food business involves much more than
            selling food. PizzaLoot brings multiple pieces together so you
            can focus on operating your shop and serving your customers.
          </p>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}
      <section id="benefits" className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              Why PizzaLoot
            </span>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Everything is connected.
              <br />
              <span className="text-orange-500">That's the advantage.</span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              From the way your shop looks to the way your products are
              prepared, PizzaLoot helps bring consistency to the customer
              experience.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-orange-100 p-3.5">
                      <Icon className="h-6 w-6 text-orange-500" />
                    </div>

                    <span className="text-sm font-black text-slate-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-black text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {benefit.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-orange-500">
                    Learn more
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          BEFORE VS PIZZALOOT
      ========================================================= */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
                The Difference
              </span>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Stop doing
                <br />
                <span className="text-orange-400">everything alone.</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                An independent shop owner often has to manage branding,
                products, marketing and training separately. PizzaLoot brings
                those areas together under one partnership.
              </p>

              <Link
                href="/how-it-works"
                className="group mt-8 inline-flex items-center gap-3 font-bold text-orange-400 transition hover:text-orange-300"
              >
                See How It Works
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Comparison */}
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <div className="grid grid-cols-2 border-b border-white/10">
                <div className="p-5 sm:p-6">
                  <p className="text-sm font-black text-slate-400">
                    WITHOUT A SYSTEM
                  </p>
                  <p className="mt-1 text-lg font-black text-white">
                    Build Everything
                  </p>
                </div>

                <div className="border-l border-white/10 bg-orange-500/10 p-5 sm:p-6">
                  <p className="text-sm font-black text-orange-400">
                    WITH PIZZALOOT
                  </p>
                  <p className="mt-1 text-lg font-black text-white">
                    Get Support
                  </p>
                </div>
              </div>

              {comparisonItems.map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-2 border-b border-white/10 last:border-b-0"
                >
                  <div className="flex items-center gap-3 p-4 sm:p-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    </div>

                    <span className="text-sm text-slate-400">{item}</span>
                  </div>

                  <div className="flex items-center gap-3 border-l border-white/10 bg-orange-500/5 p-4 sm:p-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/15">
                      <Check className="h-4 w-4 text-orange-400" />
                    </div>

                    <span className="text-sm font-semibold text-slate-200">
                      Supported
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ECOSYSTEM
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              The PizzaLoot Ecosystem
            </span>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Four pieces.
              <br />
              <span className="text-orange-500">One stronger business.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystemItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="relative rounded-[2rem] border border-slate-200 bg-[#fffaf5] p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900">
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    <span className="text-sm font-black text-orange-500">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-black text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          THREE REASONS
      ========================================================= */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
                Built For Shopkeepers
              </span>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                A partner,
                <br />
                <span className="text-orange-500">not just a logo.</span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                PizzaLoot is designed to give local entrepreneurs practical
                support while keeping them at the center of their own
                business.
              </p>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-orange-200 bg-white p-4 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xl">
                  🍕
                </div>

                <div>
                  <p className="text-sm font-black text-slate-900">
                    Your Business
                  </p>
                  <p className="text-xs text-slate-500">
                    Powered by PizzaLoot support
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;

                return (
                  <div
                    key={reason.title}
                    className="flex gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100">
                      <Icon className="h-6 w-6 text-orange-500" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-orange-500">
                          0{index + 1}
                        </span>

                        <h3 className="text-xl font-black text-slate-900">
                          {reason.title}
                        </h3>
                      </div>

                      <p className="mt-3 leading-7 text-slate-600">
                        {reason.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PARTNER PROFILE
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="overflow-hidden rounded-[2.5rem] bg-orange-500 shadow-2xl shadow-orange-500/20">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-16">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-100">
                  Is PizzaLoot Right For You?
                </span>

                <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  You might be our next partner.
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-orange-100">
                  PizzaLoot is a good fit for shopkeepers and entrepreneurs
                  who are ready to follow a structured system and build a
                  consistent customer experience.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "You already have a food shop",
                    "You want to strengthen your brand",
                    "You are willing to follow PizzaLoot standards",
                    "You want guidance instead of doing everything alone",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
                        <Check className="h-3.5 w-3.5 text-orange-500" />
                      </div>

                      <span className="font-semibold text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="group mt-9 inline-flex items-center gap-3 rounded-full bg-slate-900 px-7 py-4 font-bold text-white transition hover:bg-slate-800"
                >
                  Talk to Our Team
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Visual side */}
              <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-slate-900 p-8">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-2xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/10 blur-2xl" />

                <div className="relative w-full max-w-sm">
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-2xl">
                        🏪
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-400">
                          YOUR SHOP
                        </p>
                        <p className="text-xl font-black text-white">
                          + PizzaLoot
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {[
                        "Brand Identity",
                        "Menu & Products",
                        "Team Training",
                        "Marketing",
                        "Business Support",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15">
                            <Check className="h-4 w-4 text-orange-400" />
                          </div>

                          <span className="text-sm font-semibold text-slate-200">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl bg-orange-500 p-4 text-center">
                      <p className="text-sm font-black text-white">
                        Ready to Grow 🚀
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-7 py-16 text-center shadow-2xl sm:px-12 lg:px-20">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow-lg shadow-orange-500/20">
                🍕
              </div>

              <p className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-orange-400">
                Your Next Step
              </p>

              <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                Your shop has potential.
                <br />
                <span className="text-orange-400">
                  Let's build it together.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-400">
                Tell us about your shop, and our team will explain how a
                PizzaLoot partnership can work for your business.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
                >
                  Become a PizzaLoot Partner
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