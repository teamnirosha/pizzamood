"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Flame,
  Leaf,
  Search,
  Star,
} from "lucide-react";

type Category =
  | "All"
  | "Pizzas"
  | "Combos"
  | "Sides"
  | "Drinks"
  | "Desserts";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  veg: boolean;
  bestseller?: boolean;
  spicy?: boolean;
};

const categories: Category[] = [
  "All",
  "Pizzas",
  "Combos",
  "Sides",
  "Drinks",
  "Desserts",
];

const products: Product[] = [
  {
    id: 1,
    name: "Tandoori Paneer",
    description:
      "Smoky tandoori paneer with onion, capsicum and signature sauce.",
    price: 299,
    category: "Pizzas",
    image: "/images/menu/tandoori-paneer.jpg",
    rating: 4.8,
    veg: true,
    bestseller: true,
  },
  {
    id: 2,
    name: "Cheese Burst",
    description:
      "Extra mozzarella with creamy cheese sauce and a delicious cheese-filled crust.",
    price: 349,
    category: "Pizzas",
    image: "/images/menu/cheese-burst.jpg",
    rating: 4.9,
    veg: true,
    bestseller: true,
  },
  {
    id: 3,
    name: "Peri Peri Pizza",
    description:
      "A spicy combination of peri peri sauce, onion, capsicum and jalapeño.",
    price: 319,
    category: "Pizzas",
    image: "/images/menu/peri-peri.jpg",
    rating: 4.7,
    veg: true,
    spicy: true,
  },
  {
    id: 4,
    name: "Farmhouse",
    description:
      "Fresh vegetables, mushrooms, corn, onion and capsicum loaded with cheese.",
    price: 329,
    category: "Pizzas",
    image: "/images/menu/farmhouse.jpg",
    rating: 4.6,
    veg: true,
  },
  {
    id: 5,
    name: "Corn & Cheese",
    description:
      "Sweet corn, mozzarella and creamy cheese sauce.",
    price: 269,
    category: "Pizzas",
    image: "/images/menu/corn-cheese.jpg",
    rating: 4.5,
    veg: true,
  },
  {
    id: 6,
    name: "Chilli Paneer",
    description:
      "Spicy paneer, green chilli, onion and our signature chilli sauce.",
    price: 319,
    category: "Pizzas",
    image: "/images/menu/chilli-paneer.jpg",
    rating: 4.7,
    veg: true,
    spicy: true,
  },
  {
    id: 7,
    name: "Pizza Party Combo",
    description:
      "Perfect for office parties, birthdays and small gatherings.",
    price: 699,
    category: "Combos",
    image: "/images/menu/pizza-combo.jpg",
    rating: 4.9,
    veg: true,
    bestseller: true,
  },
  {
    id: 8,
    name: "Family Feast",
    description:
      "A complete family meal with pizzas, sides and refreshing drinks.",
    price: 999,
    category: "Combos",
    image: "/images/menu/family-combo.jpg",
    rating: 4.8,
    veg: true,
  },
  {
    id: 9,
    name: "Garlic Bread",
    description:
      "Freshly baked garlic bread with herbs and buttery seasoning.",
    price: 149,
    category: "Sides",
    image: "/images/menu/garlic-bread.jpg",
    rating: 4.6,
    veg: true,
  },
  {
    id: 10,
    name: "Loaded Cheese Fries",
    description:
      "Crispy fries topped with creamy cheese and herbs.",
    price: 179,
    category: "Sides",
    image: "/images/menu/cheese-fries.jpg",
    rating: 4.5,
    veg: true,
  },
  {
    id: 11,
    name: "Cold Drink",
    description:
      "Chilled refreshing drink to complete your meal.",
    price: 69,
    category: "Drinks",
    image: "/images/menu/drink.jpg",
    rating: 4.4,
    veg: true,
  },
  {
    id: 12,
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a rich molten chocolate centre.",
    price: 159,
    category: "Desserts",
    image: "/images/menu/lava-cake.jpg",
    rating: 4.8,
    veg: true,
    bestseller: true,
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const [search, setSearch] = useState("");

  const [vegOnly, setVegOnly] = useState(false);

  const [sort, setSort] = useState("popular");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch =
        activeCategory === "All" ||
        product.category === activeCategory;

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const vegMatch =
        !vegOnly || product.veg;

      return (
        categoryMatch &&
        searchMatch &&
        vegMatch
      );
    });

    if (sort === "low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "high") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [
    activeCategory,
    search,
    vegOnly,
    sort,
  ]);

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#241a16]">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden bg-[#241a16] text-white">

        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold">
              <Flame className="h-4 w-4 text-orange-400" />
              Fresh • Delicious • Made For Sharing
            </div>

            <h1 className="text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
              Explore our
              <span className="block text-orange-400">
                pizza collection.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
              From everyday favourites to party-ready combos,
              discover pizzas and food made for every occasion.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/bulk-order"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
              >
                Plan a Bulk Order
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="#menu"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-bold transition hover:bg-white/10"
              >
                Browse Menu
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================
          MENU FILTER
      ================================================== */}

      <section
        id="menu"
        className="sticky top-0 z-30 border-b border-orange-100 bg-[#fffaf3]/95 backdrop-blur"
      >

        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-md">

              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search pizzas, combos, sides..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-full border border-gray-200 bg-white py-3.5 pl-12 pr-5 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />

            </div>

            <div className="flex gap-2">

              {/* VEG */}

              <button
                onClick={() =>
                  setVegOnly(!vegOnly)
                }
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-bold transition ${
                  vegOnly
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                <Leaf className="h-4 w-4" />
                Veg
              </button>

              {/* SORT */}

              <div className="relative">

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                  className="appearance-none rounded-full border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm font-semibold outline-none"
                >
                  <option value="popular">
                    Popular
                  </option>

                  <option value="rating">
                    Top Rated
                  </option>

                  <option value="low">
                    Price: Low
                  </option>

                  <option value="high">
                    Price: High
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />

              </div>

            </div>

          </div>

          {/* CATEGORIES */}

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {category}
              </button>

            ))}

          </div>

        </div>

      </section>

      {/* ==================================================
          PRODUCTS
      ================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">

        <div className="mb-8 flex items-end justify-between">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Our Menu
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              {activeCategory === "All"
                ? "Something for everyone"
                : activeCategory}
            </h2>

          </div>

          <span className="hidden text-sm text-gray-500 sm:block">
            {filteredProducts.length} items
          </span>

        </div>

        {filteredProducts.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        ) : (

          <div className="rounded-3xl bg-white px-5 py-20 text-center">

            <h3 className="text-2xl font-black">
              No products found
            </h3>

            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>

          </div>

        )}

      </section>

      {/* ==================================================
          BULK ORDER SECTION
      ================================================== */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-orange-500 text-white sm:rounded-[3rem]">

          <div className="grid items-center lg:grid-cols-2">

            <div className="px-6 py-12 sm:px-10 lg:px-16 lg:py-16">

              <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
                🍕 Bulk Orders
              </div>

              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                Feeding a crowd?
                <span className="block">
                  We've got you covered.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
                Planning an office lunch, birthday party,
                college event or corporate gathering?
                Tell us what you need and we'll help create
                the right food package for your group.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  href="/bulk-order"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-orange-600 transition hover:bg-orange-50"
                >
                  Request Bulk Order
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 font-bold transition hover:bg-white/10"
                >
                  WhatsApp Us
                </a>

              </div>

            </div>

            <div className="flex min-h-[350px] items-center justify-center bg-orange-600 p-10">

              <div className="text-center">

                <div className="text-8xl">
                  🍕
                </div>

                <p className="mt-6 text-2xl font-black">
                  Big event.
                </p>

                <p className="text-2xl font-black text-orange-100">
                  Bigger pizza.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================
          FINAL CTA
      ================================================== */}

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">

        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#241a16] px-6 py-14 text-center text-white sm:rounded-[3rem] sm:px-10 sm:py-20">

          <h2 className="text-4xl font-black sm:text-5xl">
            Need pizza for a crowd?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Share your event details, expected quantity and
            delivery location. Our team will help you plan
            the perfect order.
          </p>

          <Link
            href="/bulk-order"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-bold transition hover:bg-orange-600"
          >
            Get a Bulk Order Quote
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

      </section>

    </main>
  );
}

/* ======================================================
   PRODUCT CARD
====================================================== */

function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}

      <div className="relative aspect-[4/3] overflow-hidden bg-orange-100">

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* BESTSELLER */}

        {product.bestseller && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#241a16] px-3 py-1.5 text-xs font-bold text-white">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            Bestseller
          </span>
        )}

        {/* VEG */}

        {product.veg && (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
            <span className="flex h-4 w-4 items-center justify-center rounded-sm border-2 border-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
            </span>
          </span>
        )}

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <h3 className="text-xl font-black">
            {product.name}
          </h3>

          <div className="flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
            <Star className="h-3 w-3 fill-current" />
            {product.rating}
          </div>

        </div>

        <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-400">
              Starting from
            </p>

            <p className="text-xl font-black">
              ₹{product.price}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Bulk Order
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

      </div>

    </article>
  );
}