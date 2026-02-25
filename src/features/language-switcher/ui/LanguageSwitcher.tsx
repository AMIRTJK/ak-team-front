"use client";

import { useState } from "react";

export const LanguageSwitcher = () => {
  const [active, setActive] = useState<"EN" | "RU">("EN");

  return (
    <div className="fixed top-4 left-4 md:top-6 md:left-8 z-[60] flex items-center bg-[#222222] rounded-full p-1 border border-[#333] shadow-lg">
      <button
        onClick={() => setActive("EN")}
        className={`flex items-center cursor-pointer gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-colors ${
          active === "EN"
            ? "bg-[#EAE4D3] text-black"
            : "text-[#EAE4D3] hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setActive("RU")}
        className={`flex items-center gap-2 cursor-pointer px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-colors ${
          active === "RU"
            ? "bg-[#EAE4D3] text-black"
            : "text-[#EAE4D3] hover:text-white"
        }`}
      >
        РУ
      </button>
    </div>
  );
};
