import type { OutletLocation } from "@/types";

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

export const MENU_CATEGORIES = [
  { id: "pizza", label: "Pizza", name: "Cheese Burst Pizza", description: "Hand-tossed pizza with 100% mozzarella and a molten cheese-burst crust.", badge: "Bestseller", image: img("1513104890138-7c749659a591") },
  { id: "burgers", label: "Burgers", name: "Loaded Burgers", description: "Juicy double-patty burgers with fresh veggies and house sauces.", badge: "Crowd Favourite", image: img("1568901346375-23c9450c58cd") },
  { id: "momos", label: "Momos", name: "Steamed & Tandoori Momos", description: "Soft steamed momos and smoky tandoori momos with spicy chutney.", badge: "Street Classic", image: img("1625220194771-7ebdea0b70b9") },
  { id: "cold-coffee", label: "Cold Coffee", name: "Cold Coffee", description: "Thick, creamy iced cold coffee.", badge: "Cafe Favourite", image: img("1461023058943-07fcbe16d735") },
  { id: "shakes", label: "Shakes", name: "Thick Shakes", description: "Oreo and chocolate thick shakes, served chilled.", badge: "Must Try", image: img("1572490122747-3968b75cc699") },
  { id: "fries", label: "Fries", name: "Crispy Fries", description: "Golden fries tossed in peri-peri masala.", badge: "Snack Hit", image: img("1573080496219-bb080dd4f877") },
] as const;

export type MenuCategoryId = (typeof MENU_CATEGORIES)[number]["id"];
export type StoreModel = "kiosk" | "cafe";

export function menuItems(loc: Pick<OutletLocation, "menuCategories">) {
  return MENU_CATEGORIES.filter((c) => loc.menuCategories.includes(c.id));
}

// "Pizza, Burgers and Momos" for copy and FAQs
export function menuPhrase(loc: Pick<OutletLocation, "menuCategories">) {
  const labels = menuItems(loc).map((c) => c.label.toLowerCase());
  return labels.length > 1 ? `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)}` : labels[0] || "pizza";
}
