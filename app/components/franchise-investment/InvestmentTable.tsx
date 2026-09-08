"use client";

import React from "react";
import { Coins, Handshake, CookingPot, Armchair, PartyPopper } from "lucide-react";
import {
  investmentItemsData,
  calculatedTotalInvestment,
  franchiseInvestmentConfig,
  InvestmentItemData,
} from "@/app/data/franchiseInvestmentData";
import { InvestmentRow } from "./InvestmentRow";
import { AnimatedCounter } from "./AnimatedCounter";

interface InvestmentTableProps {
  counterStarted: boolean;
}

const iconMap = {
  Handshake: Handshake,
  Utensils: CookingPot,
  Sofa: Armchair,
  PartyPopper: PartyPopper,
};

export const InvestmentTable: React.FC<InvestmentTableProps> = ({ counterStarted }) => {
  return (
    <div className="w-full rounded-2xl border border-amber-200/60 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
      {/* ================================================== */}
      {/* DESKTOP TABLE VIEW (sm:block) */}
      {/* ================================================== */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed min-w-[500px]">
          {/* Table Column Header */}
          <thead>
            <tr className="bg-[#FFF8D6] dark:bg-amber-950/40 text-[#101A35] dark:text-amber-300 font-extrabold text-xs tracking-wider border-b border-amber-200/80">
              <th scope="col" className="w-[35%] py-3.5 px-4 font-extrabold uppercase">
                List
              </th>
              <th scope="col" className="w-[25%] py-3.5 px-4 font-extrabold uppercase border-l border-amber-200/60">
                Amount
              </th>
              <th scope="col" className="w-[40%] py-3.5 px-4 font-extrabold uppercase border-l border-amber-200/60">
                Notes
              </th>
            </tr>
          </thead>

          {/* Table Body Rows */}
          <tbody className="divide-y divide-sky-100/70 dark:divide-slate-800">
            {investmentItemsData.map((item, idx) => (
              <InvestmentRow key={item.id} data={item} index={idx} />
            ))}
          </tbody>

          {/* Table Footer - TOTAL EXPENSES ROW */}
          <tfoot>
            <tr className="bg-[#FFD21C] text-[#101A35] font-black text-sm sm:text-base border-t-2 border-amber-300 shadow-sm">
              <td className="w-[35%] py-4 px-4 align-middle">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center flex-shrink-0">
                    <Coins className="w-4 h-4 text-slate-950" />
                  </div>
                  <span className="font-black text-xs sm:text-sm uppercase tracking-wide">
                    {franchiseInvestmentConfig.totalLabel}
                  </span>
                </div>
              </td>

              <td className="w-[25%] py-4 px-4 align-middle border-l border-black/10">
                <AnimatedCounter
                  targetAmount={calculatedTotalInvestment}
                  prefix="₹ "
                  shouldStart={counterStarted}
                  className="text-base sm:text-lg font-black tracking-tight text-slate-950 block whitespace-nowrap"
                />
              </td>

              <td className="w-[40%] py-4 px-4 align-middle border-l border-black/10">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-950/10 text-slate-900 text-xs font-extrabold">
                  {franchiseInvestmentConfig.termsText}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ================================================== */}
      {/* MOBILE STACKED CARD VIEW (< sm) */}
      {/* ================================================== */}
      <div className="block sm:hidden divide-y divide-sky-100 dark:divide-slate-800">
        {/* Mobile Header Banner */}
        <div className="bg-[#FFF8D6] dark:bg-amber-950/40 p-3 flex items-center justify-between border-b border-amber-200">
          <span className="font-black text-xs uppercase tracking-wider text-[#101A35]">
            Setup Expenses Breakdown
          </span>
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">
            Itemized Details
          </span>
        </div>

        {/* Mobile Rows */}
        {investmentItemsData.map((item: InvestmentItemData, idx: number) => {
          const IconComponent = iconMap[item.iconName] || Handshake;
          return (
            <div key={item.id} className="p-3.5 space-y-2 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#E6F4FE] text-[#079FE8] flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#101A35] dark:text-white leading-tight">
                    {item.name}
                  </span>
                </div>
                <span className="font-extrabold text-xs text-[#079FE8] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100 flex-shrink-0">
                  {item.formattedAmount}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 pl-10 leading-relaxed font-medium">
                {item.notes}
              </p>
            </div>
          );
        })}

        {/* Mobile Total Expenses Bar */}
        <div className="bg-[#FFD21C] p-4 text-[#101A35] space-y-2 border-t-2 border-amber-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center">
                <Coins className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-black text-xs uppercase tracking-wider">
                {franchiseInvestmentConfig.totalLabel}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-950/10 text-[10px] font-extrabold text-slate-900">
              {franchiseInvestmentConfig.termsText}
            </span>
          </div>

          <div className="text-right">
            <AnimatedCounter
              targetAmount={calculatedTotalInvestment}
              prefix="₹ "
              shouldStart={counterStarted}
              className="text-xl font-black text-slate-950 tracking-tight"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
