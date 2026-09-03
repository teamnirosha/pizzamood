import Link from "next/link";
import {
  ArrowRight,
//   Facebook,
//   Instagram,
//   Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Why PizzaLoot", href: "/why-pizzaloot" },
  { name: "What We Provide", href: "/what-we-provide" },
];

const businessLinks = [
  { name: "Partnership Plans", href: "/partnership-plans" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white shadow-lg shadow-orange-500/20">
                P
              </div>

              <div>
                <span className="block text-2xl font-black tracking-tight">
                  Pizza<span className="text-orange-500">Loot</span>
                </span>

                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Pizza Partnership
                </span>
              </div>
            </Link>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              Your shop. Our brand. More growth. PizzaLoot helps shopkeepers
              and food entrepreneurs build a pizza business with a strong
              brand identity, proven systems, recipes, training, marketing
              support, and ongoing business guidance.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                {/* <Facebook className="h-4 w-4" /> */}
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                {/* <Instagram className="h-4 w-4" /> */}
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                {/* <Linkedin className="h-4 w-4" /> */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-slate-400 transition hover:text-orange-400"
                  >
                    <ArrowRight className="mr-2 h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Business
            </h3>

            <ul className="mt-6 space-y-3">
              {businessLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-slate-400 transition hover:text-orange-400"
                  >
                    <ArrowRight className="mr-2 h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Get In Touch
            </h3>

            <div className="mt-6 space-y-5">
              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="group flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-300 transition group-hover:text-orange-400">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@pizzaloot.com"
                className="group flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-slate-300 transition group-hover:text-orange-400">
                    hello@pizzaloot.com
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-300">
                    Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 overflow-hidden rounded-[2rem] bg-orange-500 p-7 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-black text-white sm:text-2xl">
                Ready to build with PizzaLoot?
              </p>

              <p className="mt-1 text-sm text-orange-50">
                Start your partnership journey with us.
              </p>
            </div>

            <Link
              href="/contact#enquiry"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-orange-600 transition hover:bg-orange-50 sm:w-auto"
            >
              Become a Partner
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-slate-500 sm:text-left">
            © {new Date().getFullYear()} PizzaLoot. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5 sm:justify-end">
            <Link
              href="/privacy-policy"
              className="text-slate-500 transition hover:text-orange-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 transition hover:text-orange-400"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}