import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  Check,
  ChefHat,
  CircleCheck,
  ClipboardCheck,
  Megaphone,
  Package,
  Palette,
  Rocket,
  Settings,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Wrench,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Palette,
    title: "Brand Identity",
    description:
      "We give your shop a consistent PizzaLoot identity that customers can recognize and remember.",
    items: [
      "PizzaLoot brand identity",
      "Store branding guidance",
      "Visual style and communication",
      "Menu design direction",
      "Brand usage guidelines",
    ],
  },
  {
    number: "02",
    icon: ChefHat,
    title: "Recipes & Products",
    description:
      "Get access to PizzaLoot's product range, recipes and preparation standards designed for consistency.",
    items: [
      "Pizza recipes",
      "Product specifications",
      "Ingredient guidance",
      "Preparation methods",
      "Portioning standards",
    ],
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "SOPs & Operations",
    description:
      "We help create a repeatable operating system so your team knows how the shop should run.",
    items: [
      "Kitchen SOPs",
      "Preparation workflows",
      "Opening & closing routines",
      "Hygiene standards",
      "Operational checklists",
    ],
  },
  {
    number: "04",
    icon: Users,
    title: "Staff Training",
    description:
      "Your team gets practical guidance on products, preparation, customer service and day-to-day operations.",
    items: [
      "Product training",
      "Kitchen training",
      "Preparation standards",
      "Customer service guidance",
      "Team operating practices",
    ],
  },
  {
    number: "05",
    icon: Megaphone,
    title: "Marketing Support",
    description:
      "We help your shop create a stronger local presence before launch and as you continue operating.",
    items: [
      "Launch marketing guidance",
      "Social media direction",
      "Promotional ideas",
      "Local marketing support",
      "Campaign guidance",
    ],
  },
  {
    number: "06",
    icon: Package,
    title: "Packaging Guidance",
    description:
      "Create a more professional customer experience with PizzaLoot-inspired packaging and presentation.",
    items: [
      "Packaging direction",
      "Branding guidance",
      "Product presentation",
      "Takeaway experience",
      "Packaging material guidance",
    ],
  },
  {
    number: "07",
    icon: Store,
    title: "Shop Setup Guidance",
    description:
      "We guide you through the practical requirements for turning your existing shop into a PizzaLoot destination.",
    items: [
      "Layout guidance",
      "Equipment guidance",
      "Kitchen workflow",
      "Branding placement",
      "Launch readiness",
    ],
  },
  {
    number: "08",
    icon: BarChart3,
    title: "Business Guidance",
    description:
      "We help partners understand the important areas of running a branded food business.",
    items: [
      "Menu planning",
      "Pricing guidance",
      "Operational guidance",
      "Customer experience",
      "Business improvement ideas",
    ],
  },
];

const journey = [
  {
    icon: Store,
    title: "Your Existing Shop",
    description:
      "You bring the location, team, investment and local business knowledge.",
  },
  {
    icon: Sparkles,
    title: "PizzaLoot System",
    description:
      "We bring the brand, products, recipes, systems, training and support.",
  },
  {
    icon: Rocket,
    title: "Launch & Operate",
    description:
      "Together, we create a PizzaLoot experience for your local customers.",
  },
];

const partnerResponsibilities = [
  "Shop premises",
  "Staff and daily operations",
  "Local business expenses",
  "Required licenses and permissions",
  "Investment in agreed setup",
  "Day-to-day customer service",
];

const pizzalootResponsibilities = [
  "PizzaLoot brand identity",
  "Recipes and product standards",
  "SOP and operational guidance",
  "Staff training",
  "Marketing support",
  "Packaging and presentation guidance",
  "Launch support",
  "Ongoing business guidance",
];

export default function WhatWeProvidePage() {
  return (
    <main className="min-h-screen bg-[#fffaf5] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-yellow-200/40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Everything you need to build the brand
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                We bring the{" "}
                <span className="text-orange-500">system.</span>
                <br />
                You run the shop.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                PizzaLoot gives you the brand, products, recipes, training,
                marketing guidance and operational support needed to turn your
                shop into a PizzaLoot destination.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                >
                  Become a PizzaLoot Partner
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
                >
                  See How It Works
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-orange-500" />
                  Brand Support
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-orange-500" />
                  Product System
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5 text-orange-500" />
                  Training
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="rounded-[2.5rem] bg-slate-950 p-4 shadow-2xl sm:p-6">
                <div className="rounded-[2rem] bg-orange-500 p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                        PizzaLoot
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                        Your Shop
                      </h2>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-lg">
                      <Store className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      { icon: Palette, text: "Brand" },
                      { icon: ChefHat, text: "Recipes" },
                      { icon: Users, text: "Training" },
                      { icon: Megaphone, text: "Marketing" },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.text}
                          className="rounded-2xl bg-white/15 p-4 backdrop-blur"
                        >
                          <Icon className="h-6 w-6 text-white" />
                          <p className="mt-3 font-bold text-white">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                        <Rocket className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-bold">Ready to launch</p>
                        <p className="text-sm text-slate-500">
                          Built with PizzaLoot support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-white p-4 shadow-xl sm:block lg:-left-8">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="font-bold">One Brand</p>
                    <p className="text-xs text-slate-500">
                      One operating system
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
                What we provide
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                More than a name on your signboard.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-slate-600">
                PizzaLoot is designed to give partner shops a complete brand
                and business-support system. Instead of figuring out
                everything yourself, you get structured guidance across the
                most important parts of the food business.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                You continue to own and operate your shop. PizzaLoot helps you
                build it around a consistent brand, product and operating
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              The PizzaLoot system
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Everything comes together under one brand.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We support the key areas that help your shop deliver a
              consistent PizzaLoot customer experience.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.number}
                  className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-sm font-black text-slate-300">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-black">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <ul className="space-y-3">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
                One connected ecosystem
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Your shop gets more than individual services.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                The real value is how the different pieces work together:
                brand, products, people and growth support.
              </p>

              <Link
                href="/partnership-plans"
                className="mt-8 inline-flex items-center gap-2 font-bold text-orange-400 transition hover:text-orange-300"
              >
                Explore Partnership Plans
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Palette,
                  title: "Brand",
                  text: "A recognizable identity and consistent customer experience.",
                },
                {
                  icon: ChefHat,
                  title: "Products",
                  text: "Recipes, preparation standards and product guidance.",
                },
                {
                  icon: Users,
                  title: "People",
                  text: "Training and guidance to help your team work consistently.",
                },
                {
                  icon: BarChart3,
                  title: "Growth",
                  text: "Marketing and business guidance to improve your operation.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="mt-5 text-xl font-black">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WHO DOES WHAT */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              A clear partnership
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              You bring the shop. We bring the system.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Both sides have an important role. Keeping responsibilities
              clear helps create a stronger partnership.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Partner */}
            <div className="rounded-[2rem] border border-slate-200 bg-[#fffaf5] p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Store className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    You provide
                  </p>
                  <h3 className="text-2xl font-black">The Shop</h3>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {partnerResponsibilities.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white p-4"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-slate-900" />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PizzaLoot */}
            <div className="rounded-[2rem] bg-orange-500 p-7 text-white shadow-xl shadow-orange-500/20 sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500">
                  <Sparkles className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-white/70">
                    PizzaLoot provides
                  </p>
                  <h3 className="text-2xl font-black">The System</h3>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {pizzalootResponsibilities.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                    <span className="text-sm font-medium text-white/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT JOURNEY */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              From shop to PizzaLoot
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              A simple journey for your team.
            </h2>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-orange-200 lg:block" />

            <div className="grid gap-6 lg:grid-cols-3">
              {journey.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-orange-500 text-white shadow-xl shadow-orange-500/20">
                      <Icon className="h-10 w-10" />
                    </div>

                    <div className="mt-7">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                        Step 0{index + 1}
                      </span>

                      <h3 className="mt-2 text-2xl font-black">
                        {item.title}
                      </h3>

                      <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SUPPORT */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[2rem] bg-slate-950 p-8 text-white lg:col-span-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>

              <h2 className="mt-6 max-w-2xl text-3xl font-black sm:text-4xl">
                Built for real shopkeepers, not just new entrepreneurs.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Already running a pizza shop, café, bakery, takeaway or food
                business? PizzaLoot can help you introduce a stronger brand
                and more structured operating system without expecting you to
                start from zero.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:bg-orange-50"
              >
                Talk to PizzaLoot
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-[#fffaf5] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                <Wrench className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-black">
                Practical support
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Our approach is focused on things your team can actually use
                inside the shop.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Simple processes",
                  "Practical training",
                  "Consistent standards",
                  "Real shop guidance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CircleCheck className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                <BookOpen className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-black">
                Knowledge & SOPs
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Give your team a documented way of working instead of relying
                only on individual experience.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                <Boxes className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-black">
                Product consistency
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Recipes, preparation methods and portioning guidance help
                create a more consistent product experience.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                <ShoppingBag className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-black">
                Better presentation
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Branding, packaging and customer-facing presentation work
                together to create a stronger overall experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-lg">
            <Sparkles className="h-8 w-8" />
          </div>

          <h2 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your shop could be the next PizzaLoot.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            Bring your shop and local business experience. Let PizzaLoot help
            you build the brand, product and operating system around it.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-black text-orange-600 shadow-xl transition hover:bg-orange-50"
            >
              Become a Partner
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/partnership-plans"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 font-bold text-white transition hover:bg-white/20"
            >
              View Partnership Plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}