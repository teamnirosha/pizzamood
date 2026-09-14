export interface InvestmentItemData {
  id: string;
  name: string;
  amount: number;
  formattedAmount: string;
  notes: string;
  iconName: 'Handshake' | 'Utensils' | 'Sofa' | 'PartyPopper';
}

export interface BenefitItemData {
  id: string;
  title: string;
  description: string;
  iconName: 'Store' | 'TrendingUp' | 'Users';
}

export interface TrustItemData {
  id: string;
  title: string;
  description: string;
  iconName: 'TrendingUp' | 'ShieldCheck' | 'Users' | 'Star';
}

export interface FranchiseInvestmentConfig {
  badgeText: string;
  mainHeadingLine1: string;
  mainHeadingLine2: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryCtaSubtext: string;
  cardTitle: string;
  cardSubtitle: string;
  totalLabel: string;
  termsText: string;
  cardQuoteText: string;
}

export const franchiseInvestmentConfig: FranchiseInvestmentConfig = {
  badgeText: "FLEXIBLE STORE FORMATS",
  mainHeadingLine1: "Start From ₹7 Lakh.",
  mainHeadingLine2: "Build Something of Your Own.",
  description: "Choose between our compact ₹7 Lakh Kiosk format (no interior setup costs) or our turnkey ₹12 Lakh Full Cafe format (all inclusive with complete interiors & grand launch).",
  primaryCtaText: "Get Complete Investment Details →",
  secondaryCtaText: "What Franchise Owners Say",
  secondaryCtaSubtext: "Hear partner stories",
  cardTitle: "Setup Expenses",
  cardSubtitle: "Transparent investment breakdown by store format",
  totalLabel: "Total Expenses",
  termsText: "T & C Apply",
  cardQuoteText: "Invest in a brand that serves happiness and grows with you.",
};

// Kiosk / Takeaway Format (₹7 Lakh) - Does NOT include interior setup
export const kioskInvestmentItemsData: InvestmentItemData[] = [
  {
    id: "kiosk-1",
    name: "Franchise Fees",
    amount: 400000,
    formattedAmount: "₹ 4,00,000",
    notes: "18% GST Applicable on Franchise Fees",
    iconName: "Handshake",
  },
  {
    id: "kiosk-2",
    name: "Kitchen Setup & Equipment",
    amount: 300000,
    formattedAmount: "₹ 3,00,000",
    notes: "Includes commercial pizza oven, refrigeration & prep stations",
    iconName: "Utensils",
  },
];

// Full Cafe / Dine-in Format (₹12 Lakh) - Includes interior setup & opening ceremony
export const cafeInvestmentItemsData: InvestmentItemData[] = [
  {
    id: "cafe-1",
    name: "Franchise Fees",
    amount: 400000,
    formattedAmount: "₹ 4,00,000",
    notes: "18% GST Applicable on Franchise Fees",
    iconName: "Handshake",
  },
  {
    id: "cafe-2",
    name: "Kitchen Setup & Equipment",
    amount: 300000,
    formattedAmount: "₹ 3,00,000",
    notes: "Includes commercial pizza oven, refrigeration & prep stations",
    iconName: "Utensils",
  },
  {
    id: "cafe-3",
    name: "Interiors, CCTV & Billing set",
    amount: 400000,
    formattedAmount: "₹ 4,00,000",
    notes: "Standardized front desk counter, illuminated LED signage & cloud POS setup",
    iconName: "Sofa",
  },
  {
    id: "cafe-4",
    name: "1st day opening ceremony",
    amount: 100000,
    formattedAmount: "₹ 1,00,000",
    notes: "Including decorations & whole management by Pizza Mood",
    iconName: "PartyPopper",
  },
];

// Default fallback export
export const investmentItemsData: InvestmentItemData[] = cafeInvestmentItemsData;

export const calculatedKioskTotal = kioskInvestmentItemsData.reduce(
  (sum, item) => sum + item.amount,
  0
);

export const calculatedCafeTotal = cafeInvestmentItemsData.reduce(
  (sum, item) => sum + item.amount,
  0
);

export const calculatedTotalInvestment = calculatedCafeTotal;

export const benefitItemsData: BenefitItemData[] = [
  {
    id: "benefit-1",
    title: "Compact Store Formats",
    description: "Requires only 120 - 250 sq. ft. commercial space.",
    iconName: "Store",
  },
  {
    id: "benefit-2",
    title: "High Profit Margin Items",
    description: "Enjoy 60% - 70% margins on pizzas, sides & beverages.",
    iconName: "TrendingUp",
  },
  {
    id: "benefit-3",
    title: "Streamlined Staffing",
    description: "Operate efficiently with just 2 - 3 trained team members.",
    iconName: "Users",
  },
];

export const trustItemsData: TrustItemData[] = [
  {
    id: "trust-1",
    title: "Fast Growing QSR Market",
    description: "Be part of a booming food industry",
    iconName: "TrendingUp",
  },
  {
    id: "trust-2",
    title: "Trusted Brand Support",
    description: "From setup to success",
    iconName: "ShieldCheck",
  },
  {
    id: "trust-3",
    title: "Ongoing Training",
    description: "For you and your team",
    iconName: "Users",
  },
  {
    id: "trust-4",
    title: "Attractive ROI",
    description: "Build a profitable future",
    iconName: "Star",
  },
];
