"use client";

import { useState } from "react";
import { Header } from "./header/ui/Header";
import { Hero } from "./hero/ui/Hero";

import { ThemeSwitcher, Theme } from "@/features/theme-switcher";
import { LanguageSwitcher } from "@/features/language-switcher";

export const Home = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>("stones");

  return (
    <div className="fullscreen relative ">
      <Header activeTheme={activeTheme} onChangeTheme={setActiveTheme} />
      <Hero theme={activeTheme} />

      {/* ЛЕВЫЙ ВЕРХНИЙ УГОЛ: Переключатель языков (скрыт на мобильных) */}
      <div className="hidden md:block fixed top-4 left-4 md:top-6 md:left-8 z-[70]">
        <LanguageSwitcher />
      </div>

      {/* ПРАВЫЙ ВЕРХНИЙ УГОЛ: Переключатель тем (скрыт на мобильных) */}
      <div className="hidden md:block fixed top-4 right-4 md:top-6 md:right-8 z-[70]">
        <ThemeSwitcher
          activeTheme={activeTheme}
          onChangeTheme={setActiveTheme}
        />
      </div>
    </div>
  );
};
