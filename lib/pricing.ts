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

type ItemDef = [name: string, amount: number, notes: string, iconName: PricingItem["iconName"]];

const FEE: ItemDef = ["Franchise Fees", 400000, "18% GST Applicable on Franchise Fees", "Handshake"];
const KITCHEN: ItemDef = ["Kitchen Setup & Equipment", 300000, "Includes commercial pizza oven, refrigeration & prep stations", "Utensils"];
const INTERIORS: ItemDef = ["Interiors, CCTV & Billing set", 300000, "Standardized front desk counter, illuminated LED signage & cloud POS setup", "Sofa"];
const OPENING: ItemDef = ["1st day opening ceremony", 100000, "Including decorations & whole management by Pizza Mood", "PartyPopper"];

const build = (id: ModelId, label: string, defs: ItemDef[]) => {
  const items: PricingItem[] = defs.map(([name, amount, notes, iconName], i) => ({
    id: `${id}-${i + 1}`,
    name,
    amount,
    formattedAmount: inr(amount),
    notes,
    iconName,
  }));
  const total = items.reduce((s, i) => s + i.amount, 0);
  return { id, label, total, lakh: lakh(total), formattedTotal: inr(total), items };
};

export type PricingModel = ReturnType<typeof build>;

// Kiosk has no interiors or opening ceremony; Cafe includes both.
export const MODEL_BY_ID: Record<ModelId, PricingModel> = {
  kiosk: build("kiosk", "Kiosk", [FEE, KITCHEN]),
  cafe: build("cafe", "Cafe", [FEE, KITCHEN, INTERIORS, OPENING]),
};
export const MODELS: PricingModel[] = [MODEL_BY_ID.kiosk, MODEL_BY_ID.cafe];

export const PRICING_HEADLINE = MODELS.map((m) => `${m.label} ${m.lakh}`).join(" · ");
export const PRICING_COMPACT = MODELS.map((m) => `${m.label} ₹${m.total / 100000}L`).join(" · ");

export const BUDGET_OPTIONS = ["Kiosk – ₹7 Lakh", "Cafe – ₹11 Lakh", "Need guidance"] as const;
export type BudgetOption = (typeof BUDGET_OPTIONS)[number];
export const DEFAULT_BUDGET: BudgetOption = "Need guidance";

// Maps the store format picked in the enquiry form to the budget string stored on the lead.
export const budgetForStore = (storeType?: string): BudgetOption =>
  storeType === "Kiosk" ? BUDGET_OPTIONS[0] : storeType === "Cafe" ? BUDGET_OPTIONS[1] : DEFAULT_BUDGET;
