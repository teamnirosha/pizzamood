"use client";

import React, { useState } from "react";

export default function WhatsAppBubble() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "919096970369";
  const defaultMessage = encodeURIComponent(
    "Hi Pizza Mood Team, I am interested in opening a Pizza Mood Franchise. Please share the details."
  );

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 pointer-events-auto select-none">
      
      {/* Tooltip Label (Desktop / Hover) */}
      <div
        className={`hidden sm:flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 shadow-lg border border-emerald-100 text-xs font-bold text-slate-800 transition-all duration-300 backdrop-blur-sm ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Chat on WhatsApp</span>
      </div>

      {/* WhatsApp Floating Green Circle Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20ba56] text-white shadow-[0_8px_24px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Chat on WhatsApp with Pizza Mood"
      >
        {/* Subtle Ambient Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping"></span>

        {/* Crisp Official WhatsApp Icon */}
        <svg
          className="relative h-8 w-8 text-white transition-transform duration-200 group-hover:scale-105"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.766.804 5.344 2.193 7.518L2.732 29.4a1 1 0 001.268 1.268l5.882-1.461A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 01-5.834-1.6l-.418-.248-4.329 1.076 1.076-4.329-.248-.418A11.455 11.455 0 014.5 16C4.5 9.659 9.659 4.5 16 4.5S27.5 9.659 27.5 16 22.341 27.5 16 27.5zm6.545-8.487c-.358-.179-2.12-1.046-2.449-1.165-.328-.12-.567-.179-.806.179-.239.358-.925 1.165-1.134 1.404-.209.239-.418.269-.776.09-.358-.179-1.513-.558-2.882-1.778-1.065-.95-1.784-2.124-1.993-2.483-.209-.358-.022-.552.157-.73.161-.161.358-.418.537-.627.179-.209.239-.358.358-.597.12-.239.06-.448-.03-.627-.09-.179-.806-1.942-1.105-2.659-.291-.699-.588-.604-.806-.615l-.687-.013c-.239 0-.627.09-.955.448-.328.358-1.254 1.225-1.254 2.987s1.284 3.465 1.463 3.704c.179.239 2.527 3.859 6.122 5.412.855.369 1.523.59 2.044.755.859.273 1.641.234 2.259.142.689-.103 2.12-.866 2.419-1.703.299-.836.299-1.553.209-1.703-.089-.15-.328-.239-.686-.418z" />
        </svg>

        {/* Small Active Badge Dot */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 border-2 border-white"></span>
      </a>
    </div>
  );
}
