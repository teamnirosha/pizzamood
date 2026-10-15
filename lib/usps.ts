export type UspIconName =
  | "Rocket"
  | "HeartHandshake"
  | "UtensilsCrossed"
  | "Megaphone"
  | "Truck"
  | "ShieldCheck"
  | "TrendingUp";

export type Usp = { id: string; title: string; line: string; icon: UspIconName };

// Owner supplies the facts; the plain-English wording below is a draft for the owner to confirm.
export const USPS: Usp[] = [
  { id: "go-live", title: "Guaranteed 30-day go-live", line: "Your outlet opens within 30 days. Guaranteed.", icon: "Rocket" },
  { id: "hand-holding", title: "Complete hand-holding", line: "We stay with you from day one until opening day, and after.", icon: "HeartHandshake" },
  { id: "menu", title: "A menu that sells to everyone", line: "Pizzas, Momos, Cold Coffee, Shakes, French Fries and Burgers: something for every customer.", icon: "UtensilsCrossed" },
  { id: "marketing", title: "Full digital marketing support", line: "We help promote your outlet online so customers find you.", icon: "Megaphone" },
  { id: "supply", title: "Fresh supplies every day", line: "Fresh raw materials daily. Order through our simple app.", icon: "Truck" },
  { id: "no-hidden-charges", title: "No hidden charges", line: "No surprise costs, not even a visiting fee for site finalization.", icon: "ShieldCheck" },
  { id: "roi", title: "Crystal-clear ROI", line: "We explain your return on investment clearly, in plain numbers.", icon: "TrendingUp" },
];

export const EXCLUSIVITY_LINE = "Only ONE Pizza Mood outlet per area. Once it's taken, it's gone.";
export const SLOGAN = "Open your Pizza Mood in 30 days. Guaranteed.";

export const FRANCHISE_PHONE_DISPLAY = "+91 90969 70369";
export const FRANCHISE_PHONE_TEL = "+919096970369";

export const whatsappLink = (text = "Hi Pizza Mood, I want franchise info.") =>
  `https://wa.me/919096970369?text=${encodeURIComponent(text)}`;
