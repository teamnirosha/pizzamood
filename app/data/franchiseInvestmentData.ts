import { PRICING_HEADLINE } from "@/lib/pricing";

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
  badgeText: "LOW ENTRY BARRIER",
  mainHeadingLine1: PRICING_HEADLINE,
  mainHeadingLine2: "Build Something of Your Own.",
  description: "Join Pizza Mood – a proven QSR franchise model with low setup costs, high demand and strong brand support. Be part of a growing food brand and bring happiness to your city.",
  primaryCtaText: "Get Complete Investment Details →",
  secondaryCtaText: "Watch How It Works",
  secondaryCtaSubtext: "2 min video",
  cardTitle: "Setup Expenses",
  cardSubtitle: "A clear and transparent investment plan",
  totalLabel: "Total Expenses",
  termsText: "T & C Apply",
  cardQuoteText: "Invest in a brand that serves happiness and grows with you.",
};

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
