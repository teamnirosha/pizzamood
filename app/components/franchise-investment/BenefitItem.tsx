"use client";

import React from "react";
import { Store, TrendingUp, Users } from "lucide-react";
import { BenefitItemData } from "@/app/data/franchiseInvestmentData";

interface BenefitItemProps {
  data: BenefitItemData;
}

const iconMap = {
  Store: Store,
  TrendingUp: TrendingUp,
  Users: Users,
};

export const BenefitItem: React.FC<BenefitItemProps> = ({ data }) => {
  const IconComponent = iconMap[data.iconName] || Store;

  return (
    <div className="benefit-block group flex flex-col items-start gap-2.5 p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-sky-100/80 dark:border-slate-800 shadow-xs transition-all duration-300 hover:bg-white hover:border-[#079FE8]/40 hover:shadow-md">
      <div className="w-10 h-10 rounded-xl bg-[#E6F4FE] dark:bg-sky-900/40 text-[#079FE8] flex items-center justify-center flex-shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#079FE8] group-hover:text-white">
        <IconComponent className="w-5 h-5 transition-transform duration-300" />
      </div>
      <div>
        <h4 className="text-xs sm:text-sm font-extrabold text-[#101A35] dark:text-white leading-snug">
          {data.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-medium">
          {data.description}
        </p>
      </div>
    </div>
  );
};
