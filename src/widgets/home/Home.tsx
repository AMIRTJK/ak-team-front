"use client";

import { useState } from "react";
import { Header } from "./header/ui/Header";
import { Hero } from "./hero/ui/Hero";
import { About } from "@/features/About";

import { ThemeSwitcher, Theme } from "@/features/theme-switcher";

import { LanguageSwitcher } from "@/features/language-switcher";

export const Home = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>("stones");

  return (
    <div className="fullscreen relative">
      <LanguageSwitcher />
      <Header />

      <Hero theme={activeTheme} />

      <ThemeSwitcher activeTheme={activeTheme} onChangeTheme={setActiveTheme} />
      <About />
    </div>
  );
};
