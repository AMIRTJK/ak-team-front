"use client";

import { useState } from "react";

export const LanguageSwitcher = () => {
  const [active, setActive] = useState<"EN" | "RU">("EN");

  return (
    <div className="fixed top-6 left-8 z-50 flex items-center bg-[#222222] rounded-full p-1 border border-[#333]">
      <button
        onClick={() => setActive("EN")}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
          active === "EN"
            ? "bg-[#EAE4D3] text-black"
            : "text-[#EAE4D3] hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setActive("RU")}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
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
