import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Heart,
  Sparkles,
} from "lucide-react";

const PizzalootStory = () => {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= TOP LABEL ================= */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-500">
            <Sparkles size={14} />
            The Pizzaloot Story
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ================= IMAGE SIDE ================= */}
          <div className="relative">

            {/* Background shape */}
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-orange-100" />

            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-red-100" />

            {/* Main image */}
            <div className="relative z-10 overflow-hidden rounded-[2rem] bg-gray-100 shadow-2xl">

              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/pizzaloot-story.jpg"
                  alt="Fresh Pizzaloot pizza"
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>

            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 left-4 z-20 rounded-2xl bg-white p-4 shadow-xl sm:left-8 sm:p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                  <Heart
                    size={20}
                    className="fill-red-500 text-red-500"
                  />
                </div>

                <div>
                  <p className="text-lg font-extrabold text-gray-900">
                    Made With Love
                  </p>

                  <p className="text-xs text-gray-500">
                    From our kitchen to you
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* ================= CONTENT SIDE ================= */}
          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              More Than Just Pizza
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl">
              Good food brings
              <span className="text-red-500"> people together.</span>
            </h2>

            <div className="mt-6 space-y-5 text-base leading-7 text-gray-600">
              <p>
                Pizzaloot started with one simple idea — make great pizza
                easy to enjoy. No complicated choices, no waiting forever,
                just delicious food made for sharing.
              </p>

              <p>
                We prepare every pizza with carefully selected ingredients,
                generous toppings and a whole lot of attention. Whether
                you're ordering for yourself, your family or a group of
                friends, there's always something worth sharing.
              </p>

              <p>
                From our kitchen to your doorstep, we're focused on one
                thing: making every order feel like a little celebration.
              </p>
            </div>

            {/* ================= VALUES ================= */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Check
                    size={15}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Fresh Ingredients
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Quality ingredients in every bite.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Check
                    size={15}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Made To Order
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Prepared fresh when you order.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Check
                    size={15}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Quick Delivery
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Hot food delivered to your door.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Check
                    size={15}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Easy Ordering
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Your favorite pizza in a few clicks.
                  </p>
                </div>
              </div>

            </div>

            {/* ================= CTA ================= */}
            <div className="mt-9">

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-950 px-7 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-red-500"
              >
                Discover Our Story

                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>
        </div>

        {/* ================= BOTTOM STATS ================= */}
        <div className="mt-20 grid grid-cols-2 overflow-hidden rounded-3xl bg-[#FFF8F1] sm:grid-cols-4">

          <div className="border-b border-gray-200 p-6 text-center sm:border-b-0 sm:border-r">
            <p className="text-3xl font-black text-red-500">
              15+
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-500">
              Pizza Varieties
            </p>
          </div>

          <div className="border-b border-gray-200 p-6 text-center sm:border-b-0 sm:border-r">
            <p className="text-3xl font-black text-red-500">
              25K+
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-500">
              Happy Customers
            </p>
          </div>

          <div className="border-r border-gray-200 p-6 text-center">
            <p className="text-3xl font-black text-red-500">
              25
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-500">
              Min Delivery
            </p>
          </div>

          <div className="p-6 text-center">
            <p className="text-3xl font-black text-red-500">
              4.8
            </p>

            <p className="mt-1 text-xs font-semibold text-gray-500">
              Customer Rating
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PizzalootStory;