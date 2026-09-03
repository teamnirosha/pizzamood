"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Factory,
  Leaf,
  MapPin,
  PackageCheck,
  Truck,
  Utensils,
} from "lucide-react";

const supplySteps = [
  {
    number: "01",
    icon: <Leaf className="h-6 w-6" />,
    title: "Ingredient Sourcing",
    description:
      "We source quality ingredients from trusted suppliers to maintain consistency across our menu.",
  },
  {
    number: "02",
    icon: <PackageCheck className="h-6 w-6" />,
    title: "Quality Check",
    description:
      "Ingredients are checked for freshness and quality before they move into our storage process.",
  },
  {
    number: "03",
    icon: <Factory className="h-6 w-6" />,
    title: "Safe Storage",
    description:
      "Ingredients are stored appropriately so they remain fresh and ready for daily preparation.",
  },
  {
    number: "04",
    icon: <Utensils className="h-6 w-6" />,
    title: "Kitchen Preparation",
    description:
      "Our kitchen teams prepare ingredients and pizza components for service throughout the day.",
  },
  {
    number: "05",
    icon: <Clock3 className="h-6 w-6" />,
    title: "Fresh Preparation",
    description:
      "Orders are prepared fresh so customers can enjoy their food at its best.",
  },
  {
    number: "06",
    icon: <Truck className="h-6 w-6" />,
    title: "Delivery & Pickup",
    description:
      "Food reaches customers through delivery or convenient pickup from our outlets.",
  },
];

const values = [
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Fresh Ingredients",
    text: "We focus on freshness throughout our sourcing and preparation process.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Quality First",
    text: "Every stage is important when it comes to delivering consistent food quality.",
  },
  {
    icon: <Clock3 className="h-5 w-5" />,
    title: "Made Fresh",
    text: "We prepare food with freshness and timing in mind.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Local Service",
    text: "Our outlets help us serve customers across different parts of Pune.",
  },
];

export default function SupplyChain() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#241a16]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#241a16] text-white">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold">
              <Leaf className="h-4 w-4 text-orange-400" />
              Our Story & Supply Chain
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              From good
              <span className="block text-orange-400">
                ingredients to great pizza.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              Behind every Pizzaloot meal is a simple journey —
              quality ingredients, careful preparation and a team
              that believes great food should reach you fresh.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          STORY INTRO
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          {/* IMAGE */}

          <div className="relative overflow-hidden rounded-[2rem] bg-orange-100">

            <img
              src="/images/pizzaloot-story.jpg"
              alt="Pizzaloot food preparation"
              className="h-[380px] w-full object-cover sm:h-[480px]"
            />

            <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-xl sm:bottom-7 sm:left-7">
              <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                The Pizzaloot Way
              </p>

              <p className="mt-1 text-lg font-black">
                Fresh. Simple. Delicious.
              </p>
            </div>

          </div>

          {/* CONTENT */}

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Our Story
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Food is more than
              <span className="block text-orange-500">
                what reaches your table.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              At Pizzaloot, we believe the experience starts long
              before the first bite. It starts with choosing the
              right ingredients and building a process that keeps
              quality at every step.
            </p>

            <p className="mt-5 text-base leading-7 text-gray-600">
              From suppliers and storage to kitchen preparation and
              final delivery, every stage plays a role in creating
              food our customers can enjoy.
            </p>

            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Explore Our Menu
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          SUPPLY CHAIN INTRO
      ===================================================== */}

      <section className="border-y border-orange-100 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Our Supply Chain
            </p>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Every bite has a journey.
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Our food moves through a series of carefully managed
              stages before it reaches you. Here's a simple look
              at how that journey works.
            </p>

          </div>

          {/* DESKTOP LINE */}

          <div className="relative mt-16 hidden lg:block">

            <div className="absolute left-0 right-0 top-10 h-px bg-orange-200" />

            <div className="grid grid-cols-6 gap-5">

              {supplySteps.map((step) => (
                <div
                  key={step.number}
                  className="relative text-center"
                >

                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-orange-500 text-white shadow-lg">
                    {step.icon}
                  </div>

                  <p className="mt-5 text-xs font-black tracking-widest text-orange-500">
                    {step.number}
                  </p>

                  <h3 className="mt-2 text-base font-black">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {step.description}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* MOBILE / TABLET */}

          <div className="mt-12 space-y-5 lg:hidden">

            {supplySteps.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 rounded-3xl border border-orange-100 bg-[#fffaf3] p-5"
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white">
                  {step.icon}
                </div>

                <div>

                  <p className="text-xs font-black tracking-widest text-orange-500">
                    {step.number}
                  </p>

                  <h3 className="mt-1 text-lg font-black">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {step.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW WE KEEP QUALITY
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              What Matters
            </p>

            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Quality is a
              <span className="block text-orange-500">
                team effort.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              A good supply chain is not only about moving
              ingredients. It's about keeping quality, freshness
              and consistency in mind at every stage.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                  {value.icon}
                </div>

                <h3 className="mt-5 text-lg font-black">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {value.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          SIMPLE FLOW
      ===================================================== */}

      <section className="bg-[#241a16] text-white">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
                Behind The Scenes
              </p>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                From source
                <span className="block text-orange-400">
                  to slice.
                </span>
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-white/60">
                The goal is simple: build a reliable process that
                helps our teams serve fresh and enjoyable food
                consistently.
              </p>

            </div>

            {/* FLOW */}

            <div className="hidden h-40 w-px bg-white/10 lg:block" />

            <div className="space-y-4">

              <FlowItem
                number="01"
                title="Trusted Suppliers"
                text="Quality ingredients enter our supply network."
              />

              <FlowItem
                number="02"
                title="Pizzaloot Kitchen"
                text="Ingredients are prepared for daily service."
              />

              <FlowItem
                number="03"
                title="Your Local Outlet"
                text="Fresh food is prepared for customers."
              />

              <FlowItem
                number="04"
                title="You"
                text="A fresh Pizzaloot meal reaches your table."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-orange-500 px-6 py-12 text-center text-white sm:px-10 lg:rounded-[3rem] lg:py-16">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
            The Pizzaloot Journey
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black sm:text-4xl lg:text-5xl">
            Good ingredients.
            Good people.
            Great pizza.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/80">
            See what we're making and discover something delicious
            for your next meal.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
            >
              Explore Menu
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

/* =====================================================
   FLOW ITEM
===================================================== */

function FlowItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-black">
        {number}
      </div>

      <div>

        <h3 className="font-black">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-white/50">
          {text}
        </p>

      </div>

    </div>
  );
}

