import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  ChefHat,
  CircleHelp,
  ClipboardCheck,
  Headphones,
  Megaphone,
  Package,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  X,
} from "lucide-react";

const plans = [
  {
    name: "Brand Partner",
    label: "For existing food shops",
    description:
      "A flexible PizzaLoot partnership for shopkeepers who already have a running food business.",
    popular: false,
    price: "Custom",
    priceNote: "Based on your shop and requirements",
    features: [
      "PizzaLoot brand identity",
      "Menu and product guidance",
      "Recipe & preparation guidance",
      "Basic SOP guidance",
      "Staff training",
      "Launch marketing support",
      "Packaging guidance",
      "Ongoing business guidance",
    ],
    cta: "Talk to Our Team",
  },
  {
    name: "PizzaLoot Partner",
    label: "Complete partnership",
    description:
      "Our complete partnership model for businesses looking to build a PizzaLoot-powered food destination.",
    popular: true,
    price: "Custom",
    priceNote: "Tailored to your location and setup",
    features: [
      "Everything in Brand Partner",
      "Complete PizzaLoot brand setup",
      "Detailed operational SOPs",
      "Product & kitchen training",
      "Shop setup guidance",
      "Marketing launch plan",
      "Packaging & presentation system",
      "Ongoing operational support",
      "Business improvement guidance",
    ],
    cta: "Become a Partner",
  },
  {
    name: "Business Upgrade",
    label: "For growing businesses",
    description:
      "Designed for established food entrepreneurs who want to introduce PizzaLoot into a larger operation.",
    popular: false,
    price: "Custom",
    priceNote: "Discuss your business with our team",
    features: [
      "Multi-location discussion",
      "PizzaLoot brand integration",
      "Product system guidance",
      "Team training framework",
      "Operational consultation",
      "Marketing direction",
      "Packaging guidance",
      "Growth planning support",
    ],
    cta: "Discuss Your Business",
  },
];

const included = [
  {
    icon: Palette,
    title: "Brand Identity",
    text: "PizzaLoot branding, visual direction and customer-facing identity.",
  },
  {
    icon: ChefHat,
    title: "Products & Recipes",
    text: "Product standards, recipes and preparation guidance for your team.",
  },
  {
    icon: ClipboardCheck,
    title: "SOPs & Systems",
    text: "Structured processes that help your team operate consistently.",
  },
  {
    icon: Users,
    title: "Staff Training",
    text: "Practical training across products, preparation and operations.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support",
    text: "Launch support and marketing direction for your local market.",
  },
  {
    icon: Package,
    title: "Packaging",
    text: "Guidance for branded packaging and a better takeaway experience.",
  },
];

const process = [
  {
    number: "01",
    icon: Store,
    title: "Tell Us About Your Shop",
    description:
      "Share your location, current business, shop size and what you want to achieve.",
  },
  {
    number: "02",
    icon: Users,
    title: "We Understand Your Business",
    description:
      "Our team discusses your shop, operating model, requirements and partnership fit.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Choose Your Partnership",
    description:
      "We recommend the partnership structure and support package that fits your business.",
  },
  {
    number: "04",
    icon: Palette,
    title: "Build the PizzaLoot Experience",
    description:
      "Branding, products, SOPs, training and setup guidance come together.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch & Grow",
    description:
      "Launch your PizzaLoot destination with marketing and ongoing operational support.",
  },
];

const faqs = [
  {
    question: "Do I need to open a completely new shop?",
    answer:
      "No. PizzaLoot is designed to work with existing shopkeepers and food entrepreneurs. Depending on your business, we can discuss how PizzaLoot can be introduced into your existing location.",
  },
  {
    question: "Does PizzaLoot provide the shop?",
    answer:
      "No. The partner generally provides the shop premises, staff, local operating expenses and day-to-day management. PizzaLoot provides the brand system and agreed business support.",
  },
  {
    question: "Does the partnership include staff training?",
    answer:
      "Yes. Staff training can cover products, preparation standards, kitchen workflows, customer experience and operating practices, depending on the selected partnership.",
  },
  {
    question: "Is the investment the same for every shop?",
    answer:
      "Not necessarily. Requirements can vary depending on the location, existing shop condition, size, equipment, branding requirements and selected partnership structure.",
  },
  {
    question: "Do you guarantee profits?",
    answer:
      "No. PizzaLoot provides a brand, products, systems, training and business support, but business results depend on many factors including location, execution, costs, demand and local market conditions.",
  },
];

export default function PartnershipPlansPage() {
  return (
    <main className="min-h-screen bg-[#fffaf5] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Partnership Plans
            </div>

            <h1 className="text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Choose the PizzaLoot{" "}
              <span className="text-orange-500">partnership</span>
              <br className="hidden sm:block" />
              that fits your business.
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              Whether you already run a food shop or are planning your next
              food business, PizzaLoot gives you a structured way to build
              around an established brand and operating system.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-black text-white shadow-xl shadow-orange-500/20 transition hover:bg-orange-600"
              >
                Find My Plan
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-3">
            {[
              {
                icon: Palette,
                title: "One Brand",
                text: "PizzaLoot identity",
              },
              {
                icon: ChefHat,
                title: "One System",
                text: "Products & SOPs",
              },
              {
                icon: Headphones,
                title: "Ongoing Support",
                text: "Guidance when needed",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
                >
                  <Icon className="mx-auto h-6 w-6 text-orange-500" />
                  <p className="mt-3 font-black">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              Partnership options
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Pick the level of support you need.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Every business is different, so PizzaLoot partnerships can be
              structured around your existing shop, location and requirements.
            </p>
          </div>

          <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex h-full flex-col rounded-[2rem] p-7 sm:p-8 ${
                  plan.popular
                    ? "border-2 border-orange-500 bg-slate-950 text-white shadow-2xl shadow-orange-500/20 lg:-mt-4 lg:mb-4"
                    : "border border-slate-200 bg-[#fffaf5] text-slate-900"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange-500 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      plan.popular
                        ? "bg-orange-500 text-white"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  >
                    <Sparkles className="h-6 w-6" />
                  </div>

                  {plan.popular && (
                    <BadgeCheck className="h-7 w-7 text-orange-400" />
                  )}
                </div>

                <p
                  className={`mt-6 text-xs font-black uppercase tracking-wider ${
                    plan.popular ? "text-orange-400" : "text-orange-500"
                  }`}
                >
                  {plan.label}
                </p>

                <h3 className="mt-2 text-3xl font-black">{plan.name}</h3>

                <p
                  className={`mt-4 min-h-[72px] text-sm leading-6 ${
                    plan.popular ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {plan.description}
                </p>

                <div
                  className={`mt-7 rounded-2xl p-5 ${
                    plan.popular ? "bg-white/10" : "bg-white"
                  }`}
                >
                  <p
                    className={`text-sm font-bold ${
                      plan.popular ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    Partnership investment
                  </p>

                  <p className="mt-1 text-3xl font-black">{plan.price}</p>

                  <p
                    className={`mt-1 text-xs ${
                      plan.popular ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.priceNote}
                  </p>
                </div>

                <div
                  className={`my-7 h-px ${
                    plan.popular ? "bg-white/10" : "bg-slate-200"
                  }`}
                />

                <p className="text-sm font-black uppercase tracking-wider">
                  What's included
                </p>

                <ul className="mt-5 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-sm ${
                        plan.popular ? "text-slate-200" : "text-slate-700"
                      }`}
                    >
                      <Check
                        className={`mt-0.5 h-5 w-5 shrink-0 ${
                          plan.popular
                            ? "text-orange-400"
                            : "text-orange-500"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-black transition ${
                    plan.popular
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-slate-900 text-white hover:bg-orange-500"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-6 text-slate-600">
            <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
            <p>
              <strong className="text-slate-900">Why custom pricing?</strong>{" "}
              Partnership requirements can vary by location, existing shop
              condition, equipment, branding requirements and the selected
              support structure. We discuss your business first and then
              provide the appropriate commercial proposal.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
                Inside the partnership
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                More than just a PizzaLoot sign.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                The partnership is designed around the practical parts of
                running a branded food business.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Build a recognizable customer experience",
                  "Create consistent products and processes",
                  "Train your team around a common system",
                  "Launch with a structured marketing approach",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
                      <Check className="h-4 w-4" />
                    </div>

                    <span className="font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {included.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-xl font-black">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WHO PAYS / WHO PROVIDES */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
              Clear responsibilities
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Two sides. One partnership.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              You operate the business. PizzaLoot provides the brand system and
              agreed support.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Partner */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">
                  <Store className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Partner
                  </p>
                  <h3 className="text-2xl font-black">You provide</h3>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {[
                  "Shop premises",
                  "Initial business investment",
                  "Staff and employees",
                  "Daily shop operations",
                  "Local operating expenses",
                  "Required local licenses and permissions",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/5 p-4"
                  >
                    <Check className="h-5 w-5 shrink-0 text-orange-400" />
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PizzaLoot */}
            <div className="rounded-[2rem] bg-orange-500 p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500">
                  <Sparkles className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-white/70">
                    PizzaLoot
                  </p>
                  <h3 className="text-2xl font-black">We provide</h3>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {[
                  "PizzaLoot brand identity",
                  "Product and recipe system",
                  "SOPs and operating guidance",
                  "Staff training",
                  "Marketing support",
                  "Packaging guidance",
                  "Setup and launch guidance",
                  "Ongoing business support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/10 p-4"
                  >
                    <Check className="h-5 w-5 shrink-0 text-white" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              Getting started
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              From conversation to PizzaLoot.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              We keep the process simple and focused on understanding your
              business first.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-[10%] right-[10%] top-12 hidden h-px bg-orange-200 lg:block" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {process.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.number} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-orange-500 text-white shadow-xl shadow-orange-500/20">
                      <Icon className="h-9 w-9" />
                    </div>

                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                      Step {item.number}
                    </p>

                    <h3 className="mt-2 text-xl font-black">{item.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="rounded-[2.5rem] bg-orange-500 p-7 text-white shadow-2xl shadow-orange-500/20 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500">
                  <BarChart3 className="h-7 w-7" />
                </div>

                <h2 className="mt-6 max-w-3xl text-3xl font-black sm:text-4xl lg:text-5xl">
                  Start with what you already have.
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                  If you already have a shop, PizzaLoot can help you think
                  about how to transform your existing business into a more
                  structured branded food destination.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-black text-orange-600 transition hover:bg-orange-50"
              >
                Discuss My Shop
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              FAQ
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Questions before you partner?
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-[#fffaf5] p-5 open:bg-white open:shadow-sm sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-black marker:hidden">
                  <span>{faq.question}</span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500 transition group-open:rotate-45">
                    <span className="text-xl font-normal">+</span>
                  </span>
                </summary>

                <p className="mt-4 max-w-3xl pr-10 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-500/20">
            <Rocket className="h-8 w-8" />
          </div>

          <h2 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your shop.
            <br />
            <span className="text-orange-400">Our system.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Tell us about your business and let's explore whether a PizzaLoot
            partnership is right for you.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-black text-white transition hover:bg-orange-600"
            >
              Become a PizzaLoot Partner
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/what-we-provide"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              See What We Provide
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange-400" />
              Transparent discussion
            </div>

            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-orange-400" />
              No guaranteed-profit claims
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-orange-400" />
              Business-first approach
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}