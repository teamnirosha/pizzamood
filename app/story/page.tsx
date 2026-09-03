import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  Heart,
  MapPin,
  Pizza,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Pizza,
    title: "Fresh Ingredients",
    description:
      "We believe great pizza starts with fresh, quality ingredients selected with care.",
  },
  {
    icon: Heart,
    title: "Made With Love",
    description:
      "Every pizza is prepared with attention to detail because your meal should feel special.",
  },
  {
    icon: Clock3,
    title: "Fast & Fresh",
    description:
      "From our kitchen to your doorstep, we focus on keeping every order fresh and timely.",
  },
  {
    icon: Users,
    title: "Made For Everyone",
    description:
      "Whether you're eating solo, with friends, or with family, there's always something to share.",
  },
];

const milestones = [
  {
    year: "01",
    title: "The Idea",
    description:
      "Pizzaloot started with one simple thought — pizza should be delicious, accessible and fun.",
  },
  {
    year: "02",
    title: "The First Kitchen",
    description:
      "We began creating pizzas with a focus on flavour, freshness and consistency.",
  },
  {
    year: "03",
    title: "Growing Together",
    description:
      "As more people discovered Pizzaloot, our little idea started becoming a growing pizza community.",
  },
  {
    year: "04",
    title: "What's Next",
    description:
      "We're continuing to improve our menu, ordering experience and delivery for every pizza lover.",
  },
];

export default function PizzalootStoryPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#241a16]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-orange-100">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24">
          {/* LEFT */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              The Pizzaloot Story
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              More Than
              <span className="block text-orange-500">Just Pizza.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 sm:text-xl">
              We started with a simple idea: make pizza that brings people
              together, creates little moments of happiness and keeps you
              coming back for one more slice.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
              >
                Explore Our Menu
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-4 font-bold transition hover:border-orange-300 hover:bg-orange-50"
              >
                Back Home
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full border-[12px] border-orange-200/50 sm:h-32 sm:w-32" />

            <div className="relative overflow-hidden rounded-[2rem] bg-orange-100 p-3 shadow-2xl shadow-orange-900/10 sm:rounded-[3rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem]">
                <Image
                  src="/images/pizzaloot-story.jpg"
                  alt="Fresh Pizzaloot pizza"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* FLOATING CARD */}
            <div className="absolute -bottom-5 -left-2 rounded-2xl bg-white p-4 shadow-xl sm:-left-8 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <Heart className="h-5 w-5 fill-orange-500" />
                </div>

                <div>
                  <p className="text-sm font-bold">Made With Love</p>
                  <p className="text-xs text-gray-500">
                    From our kitchen to you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Our Beginning
            </p>

            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Good food has a way of bringing people closer.
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-gray-600">
            <p>
              Pizzaloot was born from a love for pizza and the belief that
              ordering food should feel exciting, simple and satisfying.
            </p>

            <p>
              We wanted to create a place where you could grab a quick slice
              after work, share a meal with friends or enjoy a family pizza
              night without overthinking it.
            </p>

            <p>
              That's why everything we do revolves around three things:
              <span className="font-bold text-gray-900">
                {" "}
                great taste, fresh food and happy customers.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#241a16] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              What We Believe
            </p>

            <h2 className="text-4xl font-black sm:text-5xl">
              The little things make a big difference.
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/60">
              From choosing ingredients to packing your order, we pay attention
              to the details that turn a good pizza into a great experience.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{value.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STORY / TIMELINE */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            Our Journey
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-5xl">
            From an idea to your favourite slice.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Every pizza has a story. Here's a little look at ours.
          </p>
        </div>

        <div className="relative mt-16">
          {/* DESKTOP LINE */}
          <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-orange-200 lg:block" />

          <div className="space-y-10 lg:space-y-0">
            {milestones.map((item, index) => (
              <div
                key={item.year}
                className={`relative lg:flex lg:min-h-[210px] ${
                  index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
                }`}
              >
                <div className="w-full lg:w-[45%]">
                  <div className="rounded-3xl border border-orange-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 font-black text-orange-500">
                        {item.year}
                      </span>

                      <h3 className="text-xl font-black">{item.title}</h3>
                    </div>

                    <p className="mt-5 leading-7 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* CENTER DOT */}
                <div className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#fffaf3] bg-orange-500 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-orange-500 px-6 py-12 text-white sm:rounded-[3rem] sm:px-10 lg:px-16 lg:py-16">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-4xl font-black">15+</p>
              <p className="mt-2 text-sm text-white/80">Pizza Varieties</p>
            </div>

            <div>
              <p className="text-4xl font-black">25K+</p>
              <p className="mt-2 text-sm text-white/80">Happy Customers</p>
            </div>

            <div>
              <p className="text-4xl font-black">25 Min</p>
              <p className="mt-2 text-sm text-white/80">Average Delivery</p>
            </div>

            <div>
              <p className="text-4xl font-black">4.8/5</p>
              <p className="mt-2 text-sm text-white/80">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PIZZALOOT */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Why Pizzaloot?
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Your cravings deserve better pizza.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              We keep things simple. Good ingredients, exciting flavours,
              reliable service and an ordering experience that doesn't get in
              your way.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Freshly prepared when you order",
                "Flavours for every kind of pizza lover",
                "Easy online ordering",
                "Quick and reliable delivery",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    <Check className="h-4 w-4" />
                  </span>

                  <span className="font-semibold text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-[#fff4e8] p-6 sm:p-10">
              <div className="rounded-[1.5rem] bg-white p-7 shadow-xl sm:p-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                    <MapPin className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Serving</p>
                    <p className="font-black">Pizza Lovers in Pune</p>
                  </div>
                </div>

                <div className="my-8 h-px bg-gray-100" />

                <p className="text-3xl font-black leading-tight">
                  Wherever you are,
                  <span className="text-orange-500"> let's make it pizza.</span>
                </p>

                <Link
                  href="/locations"
                  className="mt-8 inline-flex items-center gap-2 font-bold text-orange-500 hover:text-orange-600"
                >
                  Find Your Nearest Store
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#241a16] px-6 py-14 text-center text-white sm:rounded-[3rem] sm:px-12 sm:py-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
            <Pizza className="h-8 w-8" />
          </div>

          <h2 className="mt-7 text-4xl font-black sm:text-5xl lg:text-6xl">
            Ready for your next slice?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/60">
            Your cravings brought you here. Let us take it from here.
          </p>

          <Link
            href="/menu"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            Order Your Pizza
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}