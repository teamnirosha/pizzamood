"use client";

import React from "react";
import { Coins, Handshake, CookingPot, Armchair, PartyPopper, Store, Sparkles, CheckCircle2 } from "lucide-react";
import {
  kioskInvestmentItemsData,
  cafeInvestmentItemsData,
  calculatedKioskTotal,
  calculatedCafeTotal,
  InvestmentItemData,
} from "@/app/data/franchiseInvestmentData";
import { MODEL_BY_ID } from "@/lib/pricing";
import { fill, lakhOf } from "@/app/data/i18nHelpers";
import { useLocale } from "../LocaleProvider";
import { InvestmentRow } from "./InvestmentRow";
import { AnimatedCounter } from "./AnimatedCounter";

interface InvestmentTableProps {
  counterStarted: boolean;
  activeModel?: "kiosk" | "cafe";
  onModelChange?: (model: "kiosk" | "cafe") => void;
}

const iconMap = {
  Handshake: Handshake,
  Utensils: CookingPot,
  Sofa: Armchair,
  PartyPopper: PartyPopper,
};

export const InvestmentTable: React.FC<InvestmentTableProps> = ({
  counterStarted,
  activeModel = "kiosk",
  onModelChange,
}) => {
  const t = useLocale().t.pages;
  const c = t.invest;
  const lk = (id: "kiosk" | "cafe") => lakhOf(t, MODEL_BY_ID[id].total);
  const isKiosk = activeModel === "kiosk";
  const itemsToDisplay = isKiosk ? kioskInvestmentItemsData : cafeInvestmentItemsData;
  const currentTotal = isKiosk ? calculatedKioskTotal : calculatedCafeTotal;

  return (
    <div className="w-full space-y-4">
      {/* FORMAT SWITCHER TABS AT TOP OF TABLE */}
      {onModelChange && (
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-sky-100 dark:border-slate-700">
          <button
            type="button"
            onClick={() => onModelChange("kiosk")}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isKiosk
                ? "bg-[#FFD21C] text-[#101A35] shadow-md border border-amber-300 scale-[1.02]"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/60 dark:hover:bg-slate-700/50"
            }`}
          >
            <Store className="w-4 h-4 text-slate-900 shrink-0" />
            <div className="flex flex-col items-start leading-tight">
              <span>{c.kioskModel}</span>
              <span className="text-[10px] opacity-80 font-bold">{fill(c.kioskTag, { lakh: lk("kiosk") })}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onModelChange("cafe")}
            className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              !isKiosk
                ? "bg-[#079FE8] text-white shadow-md border border-sky-400 scale-[1.02]"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-white/60 dark:hover:bg-slate-700/50"
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
            <div className="flex flex-col items-start leading-tight text-left">
              <span>{c.cafeModel}</span>
              <span className="text-[10px] opacity-90 font-bold">{fill(c.cafeTag, { lakh: lk("cafe") })}</span>
            </div>
          </button>
        </div>
      )}

      {/* TABLE CONTAINER */}
      <div className="w-full rounded-2xl border border-amber-200/60 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
        {/* DESKTOP TABLE VIEW (sm:block) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[500px]">
            {/* Table Column Header */}
            <thead>
              <tr className="bg-[#FFF8D6] dark:bg-amber-950/40 text-[#101A35] dark:text-amber-300 font-extrabold text-xs tracking-wider border-b border-amber-200/80">
                <th scope="col" className="w-[35%] py-3.5 px-4 font-extrabold uppercase">
                  {c.colList}
                </th>
                <th scope="col" className="w-[25%] py-3.5 px-4 font-extrabold uppercase border-l border-amber-200/60">
                  {c.colAmount}
                </th>
                <th scope="col" className="w-[40%] py-3.5 px-4 font-extrabold uppercase border-l border-amber-200/60">
                  {c.colNotes}
                </th>
              </tr>
            </thead>

            {/* Table Body Rows */}
            <tbody className="divide-y divide-sky-100/70 dark:divide-slate-800">
              {itemsToDisplay.map((item, idx) => (
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
                      {isKiosk ? c.totalKiosk : c.total}
                    </span>
                  </div>
                </td>

                <td className="w-[25%] py-4 px-4 align-middle border-l border-black/10">
                  <AnimatedCounter
                    targetAmount={currentTotal}
                    prefix="₹ "
                    shouldStart={counterStarted}
                    className="text-base sm:text-lg font-black tracking-tight text-slate-950 block whitespace-nowrap"
                  />
                </td>

                <td className="w-[40%] py-4 px-4 align-middle border-l border-black/10">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-950/10 text-slate-900 text-xs font-extrabold">
                    {isKiosk ? c.interiorsNotIncluded : c.terms}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* MOBILE STACKED CARD VIEW (< sm) */}
        <div className="block sm:hidden divide-y divide-sky-100 dark:divide-slate-800">
          {/* Mobile Header Banner */}
          <div className="bg-[#FFF8D6] dark:bg-amber-950/40 p-3 flex items-center justify-between border-b border-amber-200">
            <span className="font-black text-xs uppercase tracking-wider text-[#101A35]">
              {fill(isKiosk ? c.mobileKioskHead : c.mobileCafeHead, { lakh: lk(activeModel) })}
            </span>
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">
              {isKiosk ? c.takeaway : c.dineIn}
            </span>
          </div>

          {/* Mobile Rows */}
          {itemsToDisplay.map((item: InvestmentItemData) => {
            const IconComponent = iconMap[item.iconName] || Handshake;
            return (
              <div key={item.id} className="p-3.5 space-y-2 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#E6F4FE] text-[#079FE8] flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-[#101A35] dark:text-white leading-tight">
                      {c.items[item.iconName].name}
                    </span>
                  </div>
                  <span className="font-extrabold text-xs text-[#079FE8] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100 flex-shrink-0">
                    {item.formattedAmount}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 pl-10 leading-relaxed font-medium">
                  {c.items[item.iconName].notes}
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
                  {isKiosk ? c.totalKioskMobile : c.total}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-950/10 text-[10px] font-extrabold text-slate-900">
                {isKiosk ? c.interiorsExcluded : c.terms}
              </span>
            </div>

            <div className="text-right">
              <AnimatedCounter
                targetAmount={currentTotal}
                prefix="₹ "
                shouldStart={counterStarted}
                className="text-xl font-black text-slate-950 tracking-tight"
              />
            </div>
          </div>
        </div>
      </div>

      {/* HELPFUL FORMAT NOTE BOX */}
      <div className={`p-3 sm:p-4 rounded-xl border text-xs font-semibold leading-relaxed flex items-start gap-2.5 transition-all ${
        isKiosk
          ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200"
          : "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 text-sky-950 dark:text-sky-200"
      }`}>
        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-sky-600 dark:text-sky-400" />
        <div>
          {isKiosk ? (
            <span>
              <strong>{fill(c.kioskNote[0], { lakh: lk("kiosk") })}</strong>{c.kioskNote[1]}<strong>{fill(c.kioskNote[2], { n: MODEL_BY_ID.cafe.items[2].amount / 100000 })}</strong>{c.kioskNote[3]}
            </span>
          ) : (
            <span>
              <strong>{fill(c.cafeNote[0], { lakh: lk("cafe") })}</strong>{c.cafeNote[1]}<strong>{c.cafeNote[2]}</strong>{c.cafeNote[3]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
