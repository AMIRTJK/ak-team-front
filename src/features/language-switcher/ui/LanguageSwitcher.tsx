"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const LanguageSwitcher = () => {
  const [active, setActive] = useState<"RU" | "TJ">("RU");

  return (
    // УБРАЛИ: fixed top-4 left-4 md:top-6 md:left-8 z-[70]
    <div className="flex items-center bg-[#1C1A18] rounded-full p-0.5 md:p-1 border border-[#2E2B28] shadow-lg">
      <button
        onClick={() => setActive("RU")}
        className={`relative flex items-center justify-center cursor-pointer gap-1.5 px-3 py-1.5 md:gap-2.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest transition-colors duration-300 ${
          active === "RU"
            ? "text-[#1A1816]"
            : "text-[#6B655F] hover:text-[#E4D5C7]"
        }`}
      >
        {active === "RU" && (
          <motion.div
            layoutId="active-lang-bg"
            className="absolute inset-0 bg-[#E4D5C7] rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        <img
          src="https://flagcdn.com/w20/ru.png"
          alt="Russian Flag"
          className="relative z-10 w-4 h-[11px] md:w-5 md:h-[14px] object-cover rounded-[2px]"
        />
        <span className="relative z-10">RU</span>
      </button>

      <button
        onClick={() => setActive("TJ")}
        className={`relative flex items-center justify-center cursor-pointer gap-1.5 px-3 py-1.5 md:gap-2.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest transition-colors duration-300 ${
          active === "TJ"
            ? "text-[#1A1816]"
            : "text-[#6B655F] hover:text-[#E4D5C7]"
        }`}
      >
        {active === "TJ" && (
          <motion.div
            layoutId="active-lang-bg"
            className="absolute inset-0 bg-[#E4D5C7] rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <img
          src="https://flagcdn.com/w20/tj.png"
          alt="Tajikistan Flag"
          className="relative z-10 w-4 h-[11px] md:w-5 md:h-[14px] object-cover rounded-[2px]"
        />
        <span className="relative z-10">TJ</span>
      </button>
    </div>
  );
};
