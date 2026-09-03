"use client";

import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-[#fffaf5]">
      {/* Background decoration */}
      <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
              <Sparkles className="h-4 w-4 fill-orange-500" />
              Grow Your Pizza Business With Us
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Your Shop.
              <br />
              <span className="text-orange-500">Our Brand.</span>
              <br />
              More Growth.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Turn your existing food shop into a powerful PizzaLoot
              destination. We provide the brand, recipes, training, marketing
              and business guidance — you run the shop.
            </p>

            {/* Benefits */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "PizzaLoot Brand & Identity",
                "Proven Recipes & SOPs",
                "Staff Training & Guidance",
                "Marketing & Launch Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-500" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#franchise"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-7 py-4 font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Become a PizzaLoot Partner
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                  <Play className="ml-0.5 h-4 w-4 fill-orange-500 text-orange-500" />
                </span>
                How PizzaLoot Works
              </button>
            </div>

            {/* Mini stats */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-slate-200 pt-7">
              <div>
                <p className="text-3xl font-black text-slate-900">01</p>
                <p className="mt-1 text-sm text-slate-500">Simple Partnership</p>
              </div>

              <div>
                <p className="text-3xl font-black text-slate-900">360°</p>
                <p className="mt-1 text-sm text-slate-500">Business Support</p>
              </div>

              <div>
                <p className="text-3xl font-black text-slate-900">100%</p>
                <p className="mt-1 text-sm text-slate-500">Brand Guidance</p>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mx-auto w-full max-w-[560px]">
            {/* Main card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-5 shadow-2xl shadow-orange-900/10">
              {/* Pizza visual */}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-400 via-orange-500 to-red-500">
                {/* decorative circles */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
                <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/10" />

                {/* Pizza */}
                <div className="relative flex h-72 w-72 rotate-[-12deg] items-center justify-center rounded-full bg-[#f5c16c] shadow-[0_25px_50px_rgba(0,0,0,0.25)] ring-[14px] ring-[#d99a42] sm:h-80 sm:w-80">
                  {/* cheese */}
                  <div className="absolute inset-4 rounded-full bg-[#ffd76a]" />

                  {/* pepperoni */}
                  <div className="absolute left-[24%] top-[24%] h-12 w-12 rounded-full bg-red-500 shadow-inner" />
                  <div className="absolute right-[23%] top-[30%] h-14 w-14 rounded-full bg-red-500 shadow-inner" />
                  <div className="absolute left-[35%] bottom-[24%] h-13 w-13 rounded-full bg-red-500 shadow-inner" />
                  <div className="absolute right-[28%] bottom-[22%] h-11 w-11 rounded-full bg-red-500 shadow-inner" />

                  {/* vegetables */}
                  <div className="absolute left-[47%] top-[18%] h-7 w-3 rotate-45 rounded-full bg-green-600" />
                  <div className="absolute left-[19%] top-[50%] h-7 w-3 -rotate-45 rounded-full bg-green-600" />
                  <div className="absolute right-[18%] top-[54%] h-7 w-3 rotate-45 rounded-full bg-green-600" />

                  {/* center cheese highlight */}
                  <div className="absolute left-[42%] top-[42%] h-10 w-10 rounded-full bg-yellow-300/70 blur-sm" />
                </div>

                {/* Floating label */}
                <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/95 px-5 py-4 shadow-xl backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                    PizzaLoot
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    Your Brand. Your Business.
                  </p>
                </div>
              </div>

              {/* Bottom info */}
              <div className="flex items-center justify-between px-3 pb-2 pt-5">
                <div>
                  <p className="text-sm text-slate-400">Partner with</p>
                  <p className="text-2xl font-black text-white">PizzaLoot</p>
                </div>

                <div className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white">
                  Let's Grow 🚀
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -left-6 top-16 hidden rounded-2xl border border-white bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Full Support
                  </p>
                  <p className="text-xs text-slate-500">
                    From setup to growth
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-orange-500 px-5 py-4 text-white shadow-xl shadow-orange-500/30">
              <p className="text-xs font-medium text-orange-100">
                Ready to grow?
              </p>
              <p className="text-lg font-black">Join PizzaLoot</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// import Link from "next/link";
// import {
//   ArrowRight,
//   Clock3,
//   MapPin,
//   Star,
//   Leaf,
// } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="relative overflow-hidden bg-[#FFF8F1]">

//       {/* Decorative background circles */}
//       <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

//       <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-red-200/30 blur-3xl" />

//       <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

//         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

//           {/* ================================================= */}
//           {/* LEFT CONTENT */}
//           {/* ================================================= */}

//           <div className="max-w-2xl">

//             {/* Location badge */}
//             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 shadow-sm">
//               <MapPin
//                 size={15}
//                 className="text-red-500"
//               />

//               <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
//                 Hot & Fresh • Pune
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">

//               Your Pizza.
//               <br />

//               <span className="text-red-500">
//                 Your Cravings.
//               </span>

//               <br />

//               Your Way.
//             </h1>

//             {/* Description */}
//             <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
//               From classic favorites to loaded creations,
//               pick your toppings, choose your size, and enjoy
//               a hot pizza delivered right when you want it.
//             </p>

//             {/* Buttons */}
//             <div className="mt-8 flex flex-col gap-3 sm:flex-row">

//               <Link
//                 href="/menu"
//                 className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-xl"
//               >
//                 Build Your Pizza

//                 <ArrowRight
//                   size={18}
//                   className="transition-transform duration-200 group-hover:translate-x-1"
//                 />
//               </Link>

//               <Link
//                 href="/menu"
//                 className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-gray-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
//               >
//                 Browse Menu
//               </Link>

//             </div>

//             {/* Trust information */}
//             <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4">

//               {/* Rating */}
//               <div className="flex items-center gap-2">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100">
//                   <Star
//                     size={17}
//                     className="fill-yellow-500 text-yellow-500"
//                   />
//                 </div>

//                 <div>
//                   <p className="text-sm font-bold text-gray-900">
//                     4.8/5
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     Customer Rating
//                   </p>
//                 </div>

//               </div>

//               {/* Delivery */}
//               <div className="flex items-center gap-2">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
//                   <Clock3
//                     size={17}
//                     className="text-red-500"
//                   />
//                 </div>

//                 <div>
//                   <p className="text-sm font-bold text-gray-900">
//                     25 Min
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     Fast Delivery
//                   </p>
//                 </div>

//               </div>

//               {/* Fresh */}
//               <div className="flex items-center gap-2">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
//                   <Leaf
//                     size={17}
//                     className="text-green-600"
//                   />
//                 </div>

//                 <div>
//                   <p className="text-sm font-bold text-gray-900">
//                     Fresh Daily
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     Quality Ingredients
//                   </p>
//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* ================================================= */}
//           {/* RIGHT VISUAL */}
//           {/* ================================================= */}

//           <div className="relative mx-auto w-full max-w-xl">

//             {/* Main image container */}
//             <div className="relative">

//               {/* Large circle background */}
//               <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10" />

//               {/* Pizza image */}
//               <div className="relative z-10 mx-auto aspect-square w-[85%] overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-red-900/10">

//                 <img
//                   src="/images/hero-pizza.jpg"
//                   alt="Freshly baked pizza"
//                   className="h-full w-full object-cover"
//                 />

//               </div>

//               {/* Delivery badge */}
//               <div className="absolute -left-2 top-10 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl sm:-left-4">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
//                     <Clock3
//                       size={19}
//                       className="text-red-500"
//                     />
//                   </div>

//                   <div>
//                     <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                       Average
//                     </p>

//                     <p className="text-sm font-extrabold text-gray-900">
//                       25 Min Delivery
//                     </p>
//                   </div>

//                 </div>

//               </div>

//               {/* Rating badge */}
//               <div className="absolute -bottom-4 -right-2 z-20 rounded-2xl bg-gray-950 px-5 py-4 shadow-xl sm:-right-4">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
//                     <Star
//                       size={19}
//                       className="fill-gray-950 text-gray-950"
//                     />
//                   </div>

//                   <div>
//                     <p className="text-sm font-extrabold text-white">
//                       4.8 Rating
//                     </p>

//                     <p className="text-[10px] text-gray-400">
//                       Loved by customers
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>
//       </div>

//       {/* Bottom curved divider */}
//       <div className="absolute bottom-0 left-0 h-8 w-full rounded-t-[50%] bg-white" />

//     </section>
//   );
// };

// export default HeroSection;