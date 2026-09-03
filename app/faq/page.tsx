import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileText,
  Handshake,
  MapPin,
  MessageCircle,
  Package,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

const categories = [
  {
    icon: Handshake,
    title: "Partnership",
    description: "How the PizzaLoot partnership works.",
  },
  {
    icon: Store,
    title: "Shop & Setup",
    description: "Questions about your shop and launch.",
  },
  {
    icon: ChefHatIcon,
    title: "Products",
    description: "Recipes, products and operations.",
  },
  {
    icon: Users,
    title: "Training",
    description: "Staff training and support.",
  },
];

const faqs = [
  {
    category: "Partnership",
    question: "What is a PizzaLoot partnership?",
    answer:
      "PizzaLoot is a brand and business-support partnership for food entrepreneurs and existing shopkeepers. You bring the shop, investment, staff and day-to-day operations. PizzaLoot provides the agreed brand identity, product and recipe guidance, SOPs, training, marketing support, packaging guidance and business support.",
  },
  {
    category: "Partnership",
    question: "Do I need to start a completely new business?",
    answer:
      "Not necessarily. PizzaLoot is designed especially for existing food businesses that want to introduce a stronger brand and structured operating system. We can review your existing shop and discuss whether it is suitable for a PizzaLoot partnership.",
  },
  {
    category: "Partnership",
    question: "Who can become a PizzaLoot partner?",
    answer:
      "Existing pizza shops, cafés, takeaway businesses, food entrepreneurs and shopkeepers can explore a PizzaLoot partnership. The final suitability depends on factors such as location, shop condition, business model, operating capacity and partnership requirements.",
  },
  {
    category: "Partnership",
    question: "Does PizzaLoot own my shop?",
    answer:
      "No. The partner generally owns or operates the physical business and is responsible for the shop, employees and day-to-day operations. The exact rights and responsibilities will be defined in the applicable partnership agreement.",
  },
  {
    category: "Partnership",
    question: "Is PizzaLoot a franchise?",
    answer:
      "PizzaLoot may use a franchise, brand-licensing or another structured partnership model depending on the final commercial and legal structure. The exact legal relationship will be documented in the agreement provided to each partner.",
  },

  {
    category: "Investment",
    question: "How much does a PizzaLoot partnership cost?",
    answer:
      "The investment can vary depending on the location, existing shop condition, size, equipment, branding requirements and selected partnership plan. Rather than quoting the same number for every business, PizzaLoot discusses your shop first and then provides the applicable commercial proposal.",
  },
  {
    category: "Investment",
    question: "Is there a franchise or partnership fee?",
    answer:
      "Depending on the final partnership structure, there may be a one-time partnership, brand or setup fee. All applicable fees and payment terms should be clearly explained before you sign an agreement.",
  },
  {
    category: "Investment",
    question: "Are there ongoing royalties or monthly fees?",
    answer:
      "This depends on the partnership structure selected. Any royalty, recurring support fee, marketing contribution or other ongoing charge should be clearly stated in your commercial proposal and agreement.",
  },
  {
    category: "Investment",
    question: "Does PizzaLoot guarantee profit or sales?",
    answer:
      "No. PizzaLoot does not guarantee profits, sales or a particular return on investment. We provide the brand, products, systems, training and business support, while actual performance depends on location, execution, customer demand, costs and local market conditions.",
  },

  {
    category: "Shop & Setup",
    question: "Who provides the shop?",
    answer:
      "The partner provides the shop premises. PizzaLoot can provide guidance on layout, branding, kitchen workflow, equipment and launch readiness as part of the agreed partnership support.",
  },
  {
    category: "Shop & Setup",
    question: "Can I use my existing shop?",
    answer:
      "Yes, this is one of the main ideas behind PizzaLoot. If you already operate a suitable food shop, our team can evaluate the location and discuss how the PizzaLoot brand and operating system could be introduced.",
  },
  {
    category: "Shop & Setup",
    question: "Does PizzaLoot provide kitchen equipment?",
    answer:
      "Equipment requirements depend on your existing setup and the agreed PizzaLoot concept. PizzaLoot can provide equipment and workflow guidance, while the partner is generally responsible for purchasing or arranging the required equipment unless your agreement states otherwise.",
  },
  {
    category: "Shop & Setup",
    question: "Who pays for shop renovation and branding?",
    answer:
      "The partner is generally responsible for agreed shop setup, renovation and local implementation costs. PizzaLoot provides the applicable branding direction and setup guidance. The exact cost allocation should be confirmed in your commercial proposal.",
  },
  {
    category: "Shop & Setup",
    question: "Can PizzaLoot help me select a location?",
    answer:
      "We can discuss location suitability and business considerations with you. However, local demand, rent, competition, accessibility and other commercial factors should be carefully evaluated before committing to a location.",
  },

  {
    category: "Products",
    question: "Does PizzaLoot provide recipes?",
    answer:
      "Yes. Depending on the selected partnership, PizzaLoot can provide recipes, preparation methods, product specifications, portioning guidance and other product standards needed for consistent preparation.",
  },
  {
    category: "Products",
    question: "Will PizzaLoot provide ingredients?",
    answer:
      "Ingredient sourcing depends on the final partnership model. PizzaLoot can provide ingredient specifications and sourcing guidance, while certain products or approved supplies may be handled according to the applicable partner agreement.",
  },
  {
    category: "Products",
    question: "Can I add my own products to the menu?",
    answer:
      "Potentially. Because PizzaLoot is a branded concept, product additions may need to follow brand and quality standards. Any changes to the core PizzaLoot menu should be discussed with the PizzaLoot team before implementation.",
  },
  {
    category: "Products",
    question: "How does PizzaLoot maintain product consistency?",
    answer:
      "Consistency is supported through recipes, preparation methods, portioning guidance, SOPs, staff training and operational standards. Partners are expected to follow the applicable PizzaLoot standards agreed as part of the partnership.",
  },

  {
    category: "Training",
    question: "Does PizzaLoot train my staff?",
    answer:
      "Yes. Staff training can cover product preparation, kitchen processes, recipes, portioning, customer service and operating standards. The exact training scope depends on the partnership plan.",
  },
  {
    category: "Training",
    question: "Who manages my employees?",
    answer:
      "The partner is responsible for hiring, managing and paying their employees unless the partnership agreement specifically states otherwise. PizzaLoot provides training and operational guidance rather than taking over your daily staffing responsibilities.",
  },
  {
    category: "Training",
    question: "Will PizzaLoot provide SOPs?",
    answer:
      "Yes. Applicable PizzaLoot partnerships can include SOPs and operational checklists covering areas such as preparation, hygiene, opening and closing routines, product handling and customer experience.",
  },

  {
    category: "Marketing",
    question: "Does PizzaLoot provide marketing?",
    answer:
      "PizzaLoot can provide marketing guidance and launch support, which may include social media direction, promotional ideas, local marketing guidance and brand communication. The exact scope depends on your partnership plan.",
  },
  {
    category: "Marketing",
    question: "Who pays for local advertising?",
    answer:
      "Local advertising costs may generally be the responsibility of the partner unless otherwise agreed. PizzaLoot can provide campaign direction, creative guidance or other marketing support according to the applicable partnership.",
  },
  {
    category: "Marketing",
    question: "Can I run my own social media page?",
    answer:
      "Your local shop may operate its own social media presence, but PizzaLoot brand guidelines should be followed so that customer-facing communication remains consistent with the brand.",
  },

  {
    category: "Support",
    question: "What happens after the shop launches?",
    answer:
      "PizzaLoot's relationship does not have to end at launch. Depending on your partnership plan, ongoing support can include operational guidance, product guidance, marketing support, training assistance and business improvement discussions.",
  },
  {
    category: "Support",
    question: "Can I contact PizzaLoot when I have a business problem?",
    answer:
      "Yes. Partners can use the agreed PizzaLoot support channels for operational and business-related guidance. The availability and scope of support will depend on your partnership agreement.",
  },
  {
    category: "Support",
    question: "Can PizzaLoot help if my business is not performing well?",
    answer:
      "PizzaLoot can help review operational areas such as products, customer experience, marketing, processes and execution. However, no business-support system can guarantee a particular financial outcome.",
  },

  {
    category: "Legal & Compliance",
    question: "Who is responsible for licenses and legal permissions?",
    answer:
      "The partner is generally responsible for obtaining and maintaining the licenses, registrations and permissions required to legally operate their local business. Requirements vary by location and business activity, so partners should obtain appropriate professional and regulatory advice.",
  },
  {
    category: "Legal & Compliance",
    question: "Do I need food business registration or licensing?",
    answer:
      "Food businesses in India may be subject to applicable food-safety registrations or licenses and other local requirements. Your exact requirements depend on your business and location. PizzaLoot can provide business guidance, but legal and regulatory compliance remains the partner's responsibility unless specifically agreed otherwise.",
  },
  {
    category: "Legal & Compliance",
    question: "Will I receive a written agreement?",
    answer:
      "Yes. The commercial relationship should be documented in an appropriate written agreement covering matters such as brand use, fees, responsibilities, support, operating standards, term, termination and other applicable conditions.",
  },
];

function ChefHatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 13h12" />
      <path d="M6 13a4 4 0 0 1 1-7.87A5 5 0 0 1 16.5 6 4 4 0 0 1 18 13" />
      <path d="M6 13v5h12v-5" />
      <path d="M9 18v2" />
      <path d="M15 18v2" />
    </svg>
  );
}

const categoryColors: Record<string, string> = {
  Partnership: "bg-orange-50 text-orange-600",
  Investment: "bg-yellow-50 text-yellow-700",
  "Shop & Setup": "bg-blue-50 text-blue-600",
  Products: "bg-green-50 text-green-600",
  Training: "bg-purple-50 text-purple-600",
  Marketing: "bg-pink-50 text-pink-600",
  Support: "bg-indigo-50 text-indigo-600",
  "Legal & Compliance": "bg-slate-100 text-slate-700",
};

export default function FAQPage() {
  const groupedFaqs = faqs.reduce<Record<string, typeof faqs>>(
    (groups, faq) => {
      if (!groups[faq.category]) {
        groups[faq.category] = [];
      }

      groups[faq.category].push(faq);

      return groups;
    },
    {},
  );

  return (
    <main className="min-h-screen bg-[#fffaf5] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm">
              <CircleHelp className="h-4 w-4" />
              Frequently Asked Questions
            </div>

            <h1 className="text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Questions?
              <br />
              <span className="text-orange-500">We've got answers.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              Everything you need to know about becoming a PizzaLoot partner,
              setting up your shop, training your team and operating under the
              PizzaLoot brand.
            </p>
          </div>

          {/* SEARCH VISUAL */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <Search className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">
                  Looking for something?
                </p>
                <p className="mt-1 truncate text-sm text-slate-500">
                  Browse our most common partner questions below
                </p>
              </div>

              <BadgeCheck className="hidden h-6 w-6 text-orange-500 sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <a
                  key={category.title}
                  href={`#${category.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`}
                  className="group rounded-2xl border border-slate-200 bg-[#fffaf5] p-5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-black">{category.title}</h2>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="space-y-16">
            {Object.entries(groupedFaqs).map(([category, items]) => (
              <div
                key={category}
                id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="scroll-mt-24"
              >
                <div className="mb-7 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                    {category === "Partnership" && (
                      <Handshake className="h-6 w-6" />
                    )}

                    {category === "Investment" && (
                      <BarChart3Icon className="h-6 w-6" />
                    )}

                    {category === "Shop & Setup" && (
                      <Store className="h-6 w-6" />
                    )}

                    {category === "Products" && (
                      <Package className="h-6 w-6" />
                    )}

                    {category === "Training" && (
                      <Users className="h-6 w-6" />
                    )}

                    {category === "Marketing" && (
                      <Sparkles className="h-6 w-6" />
                    )}

                    {category === "Support" && (
                      <MessageCircle className="h-6 w-6" />
                    )}

                    {category === "Legal & Compliance" && (
                      <FileText className="h-6 w-6" />
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                      FAQ
                    </p>

                    <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                      {category}
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {items.map((faq) => (
                    <details
                      key={faq.question}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition open:border-orange-200 open:shadow-md"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 font-black sm:p-6">
                        <span className="text-base leading-6 sm:text-lg">
                          {faq.question}
                        </span>

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition duration-200 group-open:rotate-180 group-open:bg-orange-500 group-open:text-white">
                          <ChevronDown className="h-5 w-5" />
                        </span>
                      </summary>

                      <div className="px-5 pb-6 sm:px-6">
                        <div className="h-px bg-slate-100" />

                        <div className="pt-5">
                          <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ANSWERS */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
                At a glance
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                The simple version.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                If you remember only a few things about PizzaLoot, remember
                these.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Store,
                  title: "You provide the shop",
                  text: "You bring the premises, team and daily operations.",
                },
                {
                  icon: Sparkles,
                  title: "We provide the brand",
                  text: "PizzaLoot brings the identity and operating system.",
                },
                {
                  icon: ChefHatIcon,
                  title: "We train your team",
                  text: "Products, preparation and operating standards.",
                },
                {
                  icon: Rocket,
                  title: "We support the journey",
                  text: "Launch, marketing and ongoing business guidance.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
                  >
                    <Icon className="h-7 w-7 text-orange-400" />

                    <h3 className="mt-5 font-black">{item.title}</h3>

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

      {/* RESPONSIBILITY */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              Clear partnership
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Everyone knows their role.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              A successful partnership starts with clear expectations on both
              sides.
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
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Partner
                  </p>
                  <h3 className="text-2xl font-black">You handle</h3>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Shop premises",
                  "Staff and employees",
                  "Day-to-day operations",
                  "Local operating expenses",
                  "Required licenses and permissions",
                  "Customer service",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-slate-900" />
                    <span className="text-sm font-semibold text-slate-700">
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
                  <p className="text-xs font-black uppercase tracking-wider text-white/70">
                    PizzaLoot
                  </p>
                  <h3 className="text-2xl font-black">We handle</h3>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Brand identity",
                  "Recipes and product guidance",
                  "SOPs and operating guidance",
                  "Staff training",
                  "Marketing support",
                  "Packaging guidance",
                  "Launch support",
                  "Ongoing business guidance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/10 p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />
                    <span className="text-sm font-semibold text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-orange-500 p-8 text-center text-white shadow-2xl shadow-orange-500/20 sm:p-12 lg:p-16">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-xl">
                <MessageCircle className="h-8 w-8" />
              </div>

              <h2 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">
                Still have questions?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">
                Every shop is different. Tell us about your business and our
                team can discuss the PizzaLoot partnership with you.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-black text-orange-600 transition hover:bg-orange-50"
                >
                  Talk to PizzaLoot
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
          </div>
        </div>
      </section>

      {/* TRUST / LEGAL NOTE */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-6">
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange-400" />
              Transparent partnership
            </div>

            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-400" />
              Written agreement
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-orange-400" />
              Clear responsibilities
            </div>

            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-orange-400" />
              Business-first approach
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-3xl text-xs leading-5 text-slate-500">
            Information on this page is intended as general information about
            the PizzaLoot partnership model. Final fees, responsibilities,
            support, territory, brand rights, operating requirements and other
            terms will be specified in the applicable commercial proposal and
            written agreement.
          </p>
        </div>
      </section>
    </main>
  );
}

function BarChart3Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16v-5" />
      <path d="M12 16V7" />
      <path d="M17 16V4" />
    </svg>
  );
}