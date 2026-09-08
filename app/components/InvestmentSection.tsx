"use client";

import React from "react";
import FranchiseInvestmentSection from "./FranchiseInvestmentSection";

interface InvestmentSectionProps {
  breakdown?: any;
  disclaimer?: any;
}

export default function InvestmentSection({ breakdown, disclaimer }: InvestmentSectionProps = {}) {
  return <FranchiseInvestmentSection />;
}
