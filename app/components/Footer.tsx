import Link from "next/link";
import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">

      {/* ================= NEWSLETTER / CTA ================= */}
      <section className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-3xl bg-red-500 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">

            {/* Content */}
            <div className="max-w-xl">
              <span className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                🍕 Stay in the loop
              </span>

              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                Get delicious deals delivered to your inbox.
              </h2>

              <p className="mt-3 text-sm leading-6 text-red-100 sm:text-base">
                Subscribe for exclusive offers, new menu updates and
                special discounts.
              </p>
            </div>

            {/* Newsletter */}
            <form className="w-full max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border-0 bg-white px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white"
                />

                <button
                  type="submit"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                  Subscribe
                  <ArrowRight size={17} />
                </button>
              </div>

              <p className="mt-2 text-xs text-red-100">
                No spam. Just pizza, offers and good news.
              </p>
            </form>

          </div>
        </div>
      </section>

      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* ================= BRAND ================= */}
          <div className="lg:col-span-4">

            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-2xl">
                🍕
              </div>

              <div className="leading-none">
                <h2 className="text-2xl font-extrabold">
                  Pizza<span className="text-red-500">Lab</span>
                </h2>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">
                  Fresh & Hot
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Freshly baked pizzas, loaded with delicious toppings
              and delivered hot to your doorstep. Made with quality
              ingredients and lots of love.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                {/* <Facebook size={18} /> */}
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                {/* <Instagram size={18} /> */}
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                {/* <Twitter size={18} /> */}
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                {/* <Youtube size={18} /> */}
              </a>

            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="lg:col-span-2">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/menu"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Our Menu
                </Link>
              </li>

              <li>
                <Link
                  href="/offers"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Offers
                </Link>
              </li>

              <li>
                <Link
                  href="/locations"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Locations
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  About Us
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= MENU ================= */}
          <div className="lg:col-span-2">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Our Menu
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/menu/pizza"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Pizza
                </Link>
              </li>

              <li>
                <Link
                  href="/menu/burgers"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Burgers
                </Link>
              </li>

              <li>
                <Link
                  href="/menu/sides"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Sides
                </Link>
              </li>

              <li>
                <Link
                  href="/menu/drinks"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Drinks
                </Link>
              </li>

              <li>
                <Link
                  href="/menu/desserts"
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Desserts
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div className="sm:col-span-2 lg:col-span-4">

            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Get In Touch
            </h3>

            <div className="space-y-4">

              {/* Location */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-red-500">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Visit Us
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Pune, Maharashtra, India
                  </p>
                </div>

              </div>

              {/* Phone */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-red-500">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Call Us
                  </p>

                  <a
                    href="tel:+919999999999"
                    className="mt-1 block text-sm text-gray-400 transition hover:text-red-500"
                  >
                    +91 99999 99999
                  </a>
                </div>

              </div>

              {/* Email */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-red-500">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Email Us
                  </p>

                  <a
                    href="mailto:hello@pizzalab.com"
                    className="mt-1 block text-sm text-gray-400 transition hover:text-red-500"
                  >
                    hello@pizzalab.com
                  </a>
                </div>

              </div>

              {/* Opening Hours */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-red-500">
                  <Clock size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Opening Hours
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Mon - Sun: 11:00 AM - 11:00 PM
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM FOOTER ================= */}
      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <p className="text-center text-xs text-gray-500 md:text-left">
            © {new Date().getFullYear()} PizzaLab. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">

            <Link
              href="/privacy-policy"
              className="text-xs text-gray-500 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-gray-500 transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/refund-policy"
              className="text-xs text-gray-500 transition hover:text-white"
            >
              Refund Policy
            </Link>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;