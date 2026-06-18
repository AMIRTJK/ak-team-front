"use client";

import { useTranslation } from "@/shared/lib/i18n";
import { motion } from "framer-motion";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center bg-black/40 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-2xl">
      <button
        onClick={() => setLanguage("RU")}
        className={`relative flex items-center justify-center cursor-pointer gap-1.5 px-3 py-1.5 md:gap-2.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-semibold tracking-widest transition-colors duration-300 ${
          language === "RU"
            ? "text-black" 
            : "text-zinc-400 hover:text-white" 
        }`}
      >
        {language === "RU" && (
          <motion.div
            layoutId="active-lang-bg"
            className="absolute inset-0 bg-white shadow-md rounded-full"
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
        onClick={() => setLanguage("EN")}
        className={`relative flex items-center justify-center cursor-pointer gap-1.5 px-3 py-1.5 md:gap-2.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-semibold tracking-widest transition-colors duration-300 ${
          language === "EN" ? "text-black" : "text-zinc-400 hover:text-white"
        }`}
      >
        {language === "EN" && (
          <motion.div
            layoutId="active-lang-bg"
            className="absolute inset-0 bg-white shadow-md rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <img
          src="https://flagcdn.com/w20/gb.png"
          alt="English Flag"
          className="relative z-10 w-4 h-[11px] md:w-5 md:h-[14px] object-cover rounded-[2px]"
        />
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
};

