"use client";

import React from "react";
import { Handshake, CookingPot, Armchair, PartyPopper } from "lucide-react";
import { InvestmentItemData } from "@/app/data/franchiseInvestmentData";

interface InvestmentRowProps {
  data: InvestmentItemData;
  index: number;
}

const iconMap = {
  Handshake: Handshake,
  Utensils: CookingPot,
  Sofa: Armchair,
  PartyPopper: PartyPopper,
};

export const InvestmentRow: React.FC<InvestmentRowProps> = ({ data, index }) => {
  const IconComponent = iconMap[data.iconName] || Handshake;
  const isEven = index % 2 === 0;

  return (
    <tr
      className={`investment-row group transition-all duration-200 hover:bg-[#EBF7FF] dark:hover:bg-slate-800/60 ${
        isEven ? "bg-white dark:bg-slate-900" : "bg-[#FAFDFZ] dark:bg-slate-900/40"
      }`}
    >
      {/* COLUMN 1: LIST (35%) */}
      <td className="w-[35%] py-4 px-3 sm:px-5 align-middle border-b border-sky-100/70 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E6F4FE] dark:bg-sky-950/70 text-[#079FE8] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#079FE8] group-hover:text-white transition-all duration-200 shadow-2xs">
            <IconComponent className="w-5 h-5 transition-transform duration-200" />
          </div>
          <span className="font-bold text-xs sm:text-sm text-[#101A35] dark:text-white group-hover:text-[#079FE8] transition-colors leading-snug">
            {data.name}
          </span>
        </div>
      </td>

      {/* COLUMN 2: AMOUNT (22%) */}
      <td className="w-[22%] py-4 px-3 sm:px-4 align-middle border-b border-sky-100/70 dark:border-slate-800 border-l border-sky-50 dark:border-slate-800/50">
        <span className="font-extrabold text-sm sm:text-base text-[#101A35] dark:text-sky-400 tracking-tight whitespace-nowrap block group-hover:text-[#079FE8] transition-colors">
          {data.formattedAmount}
        </span>
      </td>

      {/* COLUMN 3: NOTES (43%) */}
      <td className="w-[43%] py-4 px-3 sm:px-5 align-middle border-b border-sky-100/70 dark:border-slate-800 border-l border-sky-50 dark:border-slate-800/50">
        <span className="text-xs sm:text-[13px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed block">
          {data.notes}
        </span>
      </td>
    </tr>
  );
};
