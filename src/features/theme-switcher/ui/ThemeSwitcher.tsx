"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/shared/lib/i18n";

export type Theme = "stones" | "cyber" | "space";

interface ThemeSwitcherProps {
  activeTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}

export const ThemeSwitcher = ({
  activeTheme,
  onChangeTheme,
}: ThemeSwitcherProps) => {
  const { t } = useTranslation();
  const themes: Theme[] = ["stones", "cyber", "space"];

  return (
    <div className="flex items-center bg-black/40 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-2xl">
      {themes.map((theme) => (
        <button
          key={theme}
          onClick={() => onChangeTheme(theme)}
          className={`relative flex items-center justify-center cursor-pointer px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-semibold tracking-widest transition-colors duration-300 ${
            activeTheme === theme
              ? "text-black" 
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {activeTheme === theme && (
            <motion.div
              layoutId="active-theme-bg"
              className="absolute inset-0 bg-white shadow-md rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <span className="relative z-10 uppercase">{t(`theme.${theme}`)}</span>
        </button>
      ))}
    </div>
  );
};
