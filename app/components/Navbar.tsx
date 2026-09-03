"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    },
  {
    name: "Story",
    href: "/story",
  },
  {
    name: "Menu",
    href: "/menu",
  },
  {
    name: "Locations",
    href: "/location",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-2xl shadow-sm">
            🍕
          </div>

          <div className="leading-none">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Pizza<span className="text-red-500">Loot</span>
            </h1>

            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
              Fresh & Hot
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "text-red-500"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                {item.name}

                {/* Active underline */}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-red-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Location */}
          <Link
            href="/location"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-500"
          >
            <MapPin size={17} />
            <span>Find Us</span>
          </Link>

          {/* Order button */}
          <Link
            href="/menu"
            className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-red-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg"
          >
            Order Now
          </Link>
        </div>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="flex items-center gap-2 lg:hidden">

          {/* Mobile cart */}
          {/* <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700"
          >
            <ShoppingCart size={18} />

            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
              2
            </span>
          </Link> */}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-50"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 lg:hidden ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6">

          {/* Mobile Navigation */}
          <div className="flex flex-col gap-1">

            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    active
                      ? "bg-red-50 text-red-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{item.name}</span>

                  <ChevronDown
                    size={16}
                    className="-rotate-90"
                  />
                </Link>
              );
            })}

            {/* Find Us */}
            <Link
              href="/locations"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <MapPin size={18} />
              Find Us
            </Link>
          </div>

          {/* Mobile Order Button */}
          <Link
            href="/menu"
            onClick={closeMenu}
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-red-500 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-red-500/20 transition hover:bg-red-600"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;