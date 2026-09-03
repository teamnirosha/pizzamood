import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Star,
  Leaf,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F1]">

      {/* Decorative background circles */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-red-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="max-w-2xl">

            {/* Location badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 shadow-sm">
              <MapPin
                size={15}
                className="text-red-500"
              />

              <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Hot & Fresh • Pune
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">

              Your Pizza.
              <br />

              <span className="text-red-500">
                Your Cravings.
              </span>

              <br />

              Your Way.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              From classic favorites to loaded creations,
              pick your toppings, choose your size, and enjoy
              a hot pizza delivered right when you want it.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-xl"
              >
                Build Your Pizza

                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-gray-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                Browse Menu
              </Link>

            </div>

            {/* Trust information */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4">

              {/* Rating */}
              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100">
                  <Star
                    size={17}
                    className="fill-yellow-500 text-yellow-500"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    4.8/5
                  </p>

                  <p className="text-xs text-gray-500">
                    Customer Rating
                  </p>
                </div>

              </div>

              {/* Delivery */}
              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                  <Clock3
                    size={17}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    25 Min
                  </p>

                  <p className="text-xs text-gray-500">
                    Fast Delivery
                  </p>
                </div>

              </div>

              {/* Fresh */}
              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                  <Leaf
                    size={17}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Fresh Daily
                  </p>

                  <p className="text-xs text-gray-500">
                    Quality Ingredients
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT VISUAL */}
          {/* ================================================= */}

          <div className="relative mx-auto w-full max-w-xl">

            {/* Main image container */}
            <div className="relative">

              {/* Large circle background */}
              <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10" />

              {/* Pizza image */}
              <div className="relative z-10 mx-auto aspect-square w-[85%] overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-red-900/10">

                <img
                  src="/images/hero-pizza.jpg"
                  alt="Freshly baked pizza"
                  className="h-full w-full object-cover"
                />

              </div>

              {/* Delivery badge */}
              <div className="absolute -left-2 top-10 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                    <Clock3
                      size={19}
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Average
                    </p>

                    <p className="text-sm font-extrabold text-gray-900">
                      25 Min Delivery
                    </p>
                  </div>

                </div>

              </div>

              {/* Rating badge */}
              <div className="absolute -bottom-4 -right-2 z-20 rounded-2xl bg-gray-950 px-5 py-4 shadow-xl sm:-right-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
                    <Star
                      size={19}
                      className="fill-gray-950 text-gray-950"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-white">
                      4.8 Rating
                    </p>

                    <p className="text-[10px] text-gray-400">
                      Loved by customers
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom curved divider */}
      <div className="absolute bottom-0 left-0 h-8 w-full rounded-t-[50%] bg-white" />

    </section>
  );
};

export default HeroSection;