"use client";

import { motion } from "framer-motion";

export type Theme = "stones" | "cyber" | "space";

interface ThemeSwitcherProps {
  activeTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}

export const ThemeSwitcher = ({
  activeTheme,
  onChangeTheme,
}: ThemeSwitcherProps) => {
  const themes: Theme[] = ["stones", "cyber", "space"];

  return (
    // УБРАЛИ: fixed top-16 left-4 md:top-20 md:left-8 z-[70]
    <div className="flex items-center bg-[#1C1A18] rounded-full p-0.5 md:p-1 border border-[#2E2B28] shadow-lg">
      {themes.map((theme) => (
        <button
          key={theme}
          onClick={() => onChangeTheme(theme)}
          className={`relative flex items-center justify-center cursor-pointer px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-300 ${
            activeTheme === theme
              ? "text-[#1A1816]"
              : "text-[#6B655F] hover:text-[#E4D5C7]"
          }`}
        >
          {activeTheme === theme && (
            <motion.div
              layoutId="active-theme-bg"
              className="absolute inset-0 bg-[#E4D5C7] rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <span className="relative z-10 uppercase">{theme}</span>
        </button>
      ))}
    </div>
  );
};
