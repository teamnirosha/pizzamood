import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Quote,
  Rocket,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

const stories = [
  {
    number: "01",
    category: "Existing Food Shop",
    title: "From Local Food Shop to a PizzaLoot Destination",
    location: "Partner Location",
    description:
      "A local food entrepreneur wanted to give their existing shop a stronger identity and a more structured food business system.",
    challenge:
      "The shop had an existing customer base but needed stronger branding, product consistency and a more organized operating process.",
    solution:
      "PizzaLoot worked with the partner on branding, product standards, recipes, staff training, SOPs and launch communication.",
    results: [
      "Stronger brand identity",
      "More structured operations",
      "Trained shop team",
      "Consistent product presentation",
    ],
    featured: true,
  },
  {
    number: "02",
    category: "Brand Upgrade",
    title: "A More Consistent Customer Experience",
    location: "Partner Location",
    description:
      "A food business wanted to move away from an inconsistent customer experience and introduce a recognizable branded identity.",
    challenge:
      "Different preparation methods and inconsistent presentation made it difficult to create a common customer experience.",
    solution:
      "PizzaLoot introduced product guidance, preparation standards, branding direction and team training.",
    results: [
      "Standardized preparation",
      "Clearer team processes",
      "Improved presentation",
      "Recognizable brand experience",
    ],
    featured: false,
  },
  {
    number: "03",
    category: "Business Transformation",
    title: "Building a System Around an Existing Shop",
    location: "Partner Location",
    description:
      "Instead of starting a food business from zero, the partner used their existing shop as the foundation for a PizzaLoot partnership.",
    challenge:
      "The business owner wanted a stronger concept without completely rebuilding the business from scratch.",
    solution:
      "PizzaLoot provided brand guidance, product direction, operating support and marketing assistance.",
    results: [
      "Existing shop utilized",
      "Clearer business concept",
      "Structured operating approach",
      "PizzaLoot brand integration",
    ],
    featured: false,
  },
];

const transformation = [
  {
    icon: Store,
    title: "Before PizzaLoot",
    items: [
      "Independent shop identity",
      "Processes built independently",
      "Limited brand recognition",
      "Owner handles many decisions",
    ],
  },
  {
    icon: Sparkles,
    title: "With PizzaLoot",
    items: [
      "Recognizable PizzaLoot identity",
      "Structured product system",
      "Brand and marketing guidance",
      "Defined operating standards",
    ],
  },
];

const metrics = [
  {
    icon: Building2,
    value: "01",
    label: "Shop",
    description: "Starting with one location and one partner.",
  },
  {
    icon: Users,
    value: "01",
    label: "Team",
    description: "Training people around a common system.",
  },
  {
    icon: TrendingUp,
    value: "01",
    label: "System",
    description: "One connected brand and operating approach.",
  },
  {
    icon: Rocket,
    value: "∞",
    label: "Potential",
    description: "Room to learn, improve and build.",
  },
];

const testimonials = [
  {
    quote:
      "PizzaLoot gave us a much clearer way to think about our shop, from the products to the way the team works.",
    name: "Partner Name",
    role: "PizzaLoot Partner",
    location: "Partner Location",
  },
  {
    quote:
      "The biggest difference was having a structured system instead of trying to figure everything out on our own.",
    name: "Partner Name",
    role: "Food Business Owner",
    location: "Partner Location",
  },
  {
    quote:
      "The brand identity helped us create a much more consistent experience for our customers.",
    name: "Partner Name",
    role: "PizzaLoot Partner",
    location: "Partner Location",
  },
];

const supportAreas = [
  "Brand identity",
  "Product & recipe guidance",
  "SOPs & operating systems",
  "Staff training",
  "Marketing support",
  "Packaging guidance",
];

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-[#fffaf5] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm">
                <BadgeCheck className="h-4 w-4" />
                PizzaLoot Partner Stories
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                Real shops.
                <br />
                <span className="text-orange-500">Real journeys.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Discover how PizzaLoot helps food entrepreneurs bring together
                a stronger brand, better systems, trained teams and a more
                consistent customer experience.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-black text-white shadow-xl shadow-orange-500/20 transition hover:bg-orange-600"
                >
                  Become a Partner
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
                >
                  See How It Works
                </Link>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative">
              <div className="rounded-[2.5rem] bg-slate-950 p-5 shadow-2xl sm:p-7">
                <div className="rounded-[2rem] bg-orange-500 p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                        Partner Story
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-white">
                        From Shop
                        <br />
                        to Brand
                      </h2>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500">
                      <Store className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    {[
                      "Existing shop",
                      "PizzaLoot system",
                      "Team training",
                      "Brand launch",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-white/15 p-4"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-orange-500">
                          {index + 1}
                        </div>

                        <span className="font-bold text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-xl sm:block lg:-left-8">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-7 w-7 text-orange-500" />

                  <div>
                    <p className="font-black">Built to improve</p>
                    <p className="text-xs text-slate-500">
                      One step at a time
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
                Our approach
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Every partner starts somewhere.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-slate-600">
                PizzaLoot is built around the idea that an existing shop can
                become the foundation for a stronger branded food business.
              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                These stories are about the journey: the problems businesses
                face, the systems we introduce and the improvements partners
                work toward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              Partner stories
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              See what the PizzaLoot journey looks like.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              A good partnership starts with understanding where the business
              is today and building a practical path forward.
            </p>
          </div>

          <div className="mt-14 space-y-8">
            {stories.map((story, index) => (
              <article
                key={story.number}
                className={`overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm ${
                  story.featured ? "lg:shadow-xl lg:shadow-orange-500/5" : ""
                }`}
              >
                <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
                  {/* Story visual */}
                  <div
                    className={`relative flex min-h-[320px] items-center justify-center p-8 ${
                      index % 2 === 0
                        ? "bg-orange-500"
                        : "bg-slate-950"
                    }`}
                  >
                    <div className="absolute left-6 top-6 text-7xl font-black text-white/10">
                      {story.number}
                    </div>

                    <div className="relative text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white text-orange-500 shadow-2xl">
                        {index === 0 ? (
                          <Store className="h-9 w-9" />
                        ) : index === 1 ? (
                          <Sparkles className="h-9 w-9" />
                        ) : (
                          <Rocket className="h-9 w-9" />
                        )}
                      </div>

                      <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-white/70">
                        {story.category}
                      </p>

                      <p className="mt-2 flex items-center justify-center gap-2 font-bold text-white">
                        <MapPin className="h-4 w-4" />
                        {story.location}
                      </p>
                    </div>
                  </div>

                  {/* Story content */}
                  <div className="p-7 sm:p-9 lg:p-11">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-orange-600">
                        {story.category}
                      </span>

                      <span className="text-xs font-bold text-slate-400">
                        Partner Story
                      </span>
                    </div>

                    <h3 className="mt-5 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                      {story.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                      {story.description}
                    </p>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="text-xs font-black uppercase tracking-wider text-orange-500">
                          The challenge
                        </p>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {story.challenge}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-orange-50 p-5">
                        <p className="text-xs font-black uppercase tracking-wider text-orange-500">
                          The approach
                        </p>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {story.solution}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Key improvements
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {story.results.map((result) => (
                          <div
                            key={result}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-500" />
                            <span className="text-sm font-semibold text-slate-700">
                              {result}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="mt-8 inline-flex items-center gap-2 font-black text-orange-600 transition hover:text-orange-700"
                    >
                      Read full story
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-400">
              What we focus on
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Success is more than a sales number.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              We focus on building the foundations that help a food business
              operate more consistently.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-7 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500">
                    <Icon className="h-7 w-7" />
                  </div>

                  <p className="mt-6 text-4xl font-black text-orange-400">
                    {metric.value}
                  </p>

                  <h3 className="mt-1 text-xl font-black">{metric.label}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {metric.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              The transformation
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              From doing everything yourself to having a system.
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
            {transformation.map((column, index) => {
              const Icon = column.icon;

              return (
                <div
                  key={column.title}
                  className={`rounded-[2rem] p-7 sm:p-9 ${
                    index === 0
                      ? "border border-slate-200 bg-[#fffaf5]"
                      : "bg-orange-500 text-white shadow-xl shadow-orange-500/20"
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      index === 0
                        ? "bg-slate-900 text-white"
                        : "bg-white text-orange-500"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-2xl font-black">
                    {column.title}
                  </h3>

                  <div className="mt-7 space-y-4">
                    {column.items.map((item) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 rounded-xl p-4 ${
                          index === 0 ? "bg-white" : "bg-white/10"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-5 w-5 shrink-0 ${
                            index === 0
                              ? "text-orange-500"
                              : "text-white"
                          }`}
                        />

                        <span
                          className={`text-sm font-semibold ${
                            index === 0 ? "text-slate-700" : "text-white"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              Partner voices
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              What partners can say about the journey.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.quote}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
              >
                <Quote className="h-9 w-9 text-orange-500" />

                <p className="mt-6 text-lg font-medium leading-8 text-slate-700">
                  “{testimonial.quote}”
                </p>

                <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-black text-orange-600">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-black">{testimonial.name}</p>

                    <p className="text-sm text-slate-500">
                      {testimonial.role}
                    </p>

                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-400">
            Partner testimonials shown above are placeholder content. Replace
            them with verified customer testimonials before publishing.
          </p>
        </div>
      </section>

      {/* WHAT MADE IT POSSIBLE */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
                Behind every story
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                The system behind the transformation.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Partner stories are built around the same core PizzaLoot
                support system: brand, products, people and business guidance.
              </p>

              <Link
                href="/what-we-provide"
                className="mt-8 inline-flex items-center gap-2 font-black text-orange-600 transition hover:text-orange-700"
              >
                Explore what we provide
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {supportAreas.map((area, index) => (
                <div
                  key={area}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#fffaf5] p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-sm font-black text-white">
                    0{index + 1}
                  </div>

                  <span className="font-bold text-slate-700">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-xl">
            <Rocket className="h-8 w-8" />
          </div>

          <h2 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your story could be next.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            Bring your existing shop, your ambition and your local knowledge.
            PizzaLoot brings the brand, system and support.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-black text-orange-600 shadow-xl transition hover:bg-orange-50"
            >
              Become a PizzaLoot Partner
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

      {/* FOOTER NOTE */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-400">
            <Clock3 className="h-4 w-4" />
            Partner results develop over time
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            PizzaLoot provides branding, products, training, marketing
            guidance and operational support. Business performance depends on
            factors such as location, execution, customer demand, costs and
            local market conditions.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-orange-400 hover:text-orange-300"
          >
            Start your PizzaLoot journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}