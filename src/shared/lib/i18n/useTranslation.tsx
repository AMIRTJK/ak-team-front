"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

export type Language = "RU" | "EN";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("RU");

  useEffect(() => {
    const saved = localStorage.getItem("ak_team_lang") as Language;
    if (saved === "RU" || saved === "EN") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ak_team_lang", lang);
  };

  useEffect(() => {
    // Dynamic page title update
    if (typeof document !== "undefined") {
      document.title =
        language === "RU"
          ? "A&K Team — Разработка веб-приложений, инфраструктуры и ИИ-решений"
          : "A&K Team — Web, Infrastructure & AI Engineering";
    }
  }, [language]);

  const t = (key: string): any => {
    const keys = key.split(".");
    let current: any = translations[language];
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to English dictionary if not found in current language
        let fallback: any = translations["EN"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            fallback = key;
            break;
          }
        }
        return typeof fallback === "string" || Array.isArray(fallback) ? fallback : key;
      }
    }
    return typeof current === "string" || Array.isArray(current) ? current : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
export { translations };
