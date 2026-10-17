import type { OutletLocation } from "@/types";
import type { Locale } from "@/lib/i18n";

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

const MENU_MR: Record<MenuCategoryId, { label: string; name: string; description: string; badge: string }> = {
  pizza: { label: "पिझ्झा", name: "चीज बर्स्ट पिझ्झा", description: "100% मोझरेला आणि वितळणाऱ्या चीज-बर्स्ट क्रस्टसह हाताने बनवलेला पिझ्झा.", badge: "बेस्टसेलर" },
  burgers: { label: "बर्गर", name: "लोडेड बर्गर", description: "ताज्या भाज्या आणि खास सॉससह रसाळ डबल-पॅटी बर्गर.", badge: "सर्वांचा आवडता" },
  momos: { label: "मोमोज", name: "स्टीम्ड आणि तंदुरी मोमोज", description: "मऊ स्टीम्ड मोमोज आणि स्मोकी तंदुरी मोमोज, तिखट चटणीसह.", badge: "स्ट्रीट क्लासिक" },
  "cold-coffee": { label: "कोल्ड कॉफी", name: "कोल्ड कॉफी", description: "घट्ट, क्रीमी थंड कॉफी.", badge: "कॅफे फेव्हरेट" },
  shakes: { label: "शेक्स", name: "थिक शेक्स", description: "ओरिओ आणि चॉकलेट थिक शेक्स, थंडगार सर्व्ह केले जातात.", badge: "नक्की ट्राय करा" },
  fries: { label: "फ्राईज", name: "क्रिस्पी फ्राईज", description: "पेरी-पेरी मसाल्यात घोळलेले सोनेरी फ्राईज.", badge: "स्नॅक हिट" },
};

// Category with label/name/description/badge in the given language (English default).
export const localizedCategory = (c: (typeof MENU_CATEGORIES)[number], lang: Locale = "en") =>
  lang === "mr" ? { ...c, ...MENU_MR[c.id] } : c;

export function menuItems(loc: Pick<OutletLocation, "menuCategories">, lang: Locale = "en") {
  return MENU_CATEGORIES.filter((c) => loc.menuCategories.includes(c.id)).map((c) => localizedCategory(c, lang));
}

// "Pizza, Burgers and Momos" for copy and FAQs
export function menuPhrase(loc: Pick<OutletLocation, "menuCategories">, lang: Locale = "en") {
  const mr = lang === "mr";
  const labels = menuItems(loc, lang).map((c) => (mr ? c.label : c.label.toLowerCase()));
  const and = mr ? " आणि " : " and ";
  return labels.length > 1 ? `${labels.slice(0, -1).join(", ")}${and}${labels.at(-1)}` : labels[0] || (mr ? "पिझ्झा" : "pizza");
}
