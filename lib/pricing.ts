export type ModelId = "kiosk" | "cafe";

export type PricingItem = {
  id: string;
  name: string;
  amount: number;
  formattedAmount: string;
  notes: string;
  iconName: "Handshake" | "Utensils" | "Sofa" | "PartyPopper";
};

const inr = (n: number) => `₹ ${n.toLocaleString("en-IN")}`;
const lakh = (n: number) => `₹${n / 100000} Lakh`;

// amounts: [franchise fee, kitchen setup, interiors/CCTV/billing, opening ceremony]
const build = (id: ModelId, label: string, amounts: number[]) => {
  const [fee, kitchen, interiors, opening] = amounts;
  const items: PricingItem[] = [
    { id: `${id}-1`, name: "Franchise Fees", amount: fee, formattedAmount: inr(fee), notes: "18% GST Applicable on Franchise Fees", iconName: "Handshake" },
    { id: `${id}-2`, name: "Kitchen Setup & Equipment", amount: kitchen, formattedAmount: inr(kitchen), notes: "Includes commercial pizza oven, refrigeration & prep stations", iconName: "Utensils" },
    { id: `${id}-3`, name: "Interiors, CCTV & Billing set", amount: interiors, formattedAmount: inr(interiors), notes: "Standardized front desk counter, illuminated LED signage & cloud POS setup", iconName: "Sofa" },
    { id: `${id}-4`, name: "1st day opening ceremony", amount: opening, formattedAmount: inr(opening), notes: "Including decorations & whole management by Pizza Mood", iconName: "PartyPopper" },
  ];
  const total = items.reduce((s, i) => s + i.amount, 0);
  return { id, label, total, lakh: lakh(total), formattedTotal: inr(total), items };
};

export type PricingModel = ReturnType<typeof build>;

// Kiosk line items are proposed (scaled from the Cafe table); owner to confirm.
export const MODEL_BY_ID: Record<ModelId, PricingModel> = {
  kiosk: build("kiosk", "Kiosk", [250000, 200000, 200000, 50000]),
  cafe: build("cafe", "Cafe", [400000, 300000, 400000, 100000]),
};
export const MODELS: PricingModel[] = [MODEL_BY_ID.kiosk, MODEL_BY_ID.cafe];

export const PRICING_HEADLINE = MODELS.map((m) => `${m.label} ${m.lakh}`).join(" · ");
export const PRICING_COMPACT = MODELS.map((m) => `${m.label} ₹${m.total / 100000}L`).join(" · ");

export const BUDGET_OPTIONS = ["Kiosk – ₹7 Lakh", "Cafe – ₹12 Lakh", "Need guidance"] as const;
export type BudgetOption = (typeof BUDGET_OPTIONS)[number];
export const DEFAULT_BUDGET: BudgetOption = "Need guidance";
