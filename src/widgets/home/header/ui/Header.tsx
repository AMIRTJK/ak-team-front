"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/shared/lib/i18n";
import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeSwitcher, type Theme } from "@/features/theme-switcher";

const NAV_ITEMS = [
  { key: "services", id: "services" },
  { key: "projects", id: "projects" },
  { key: "team", id: "team" },
  { key: "reviews", id: "reviews" },
  { key: "faq", id: "faq" },
  { key: "contact", id: "contact" },
];

interface HeaderProps {
  activeTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}

export const Header = ({ activeTheme, onChangeTheme }: HeaderProps) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setActiveSection("home");
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-4 md:top-6 left-0 w-full z-[100] flex justify-center pointer-events-none">
      <div
        className={`fixed inset-0 w-screen h-[100dvh] bg-[#0A0A0A]/95 backdrop-blur-2xl transition-opacity duration-300 md:hidden flex flex-col items-center justify-center pointer-events-auto ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 mt-6 w-full max-w-[280px]">
          <button
            onClick={scrollToTop}
            className={`text-2xl font-bold transition-colors ${
              activeSection === "home"
                ? "text-white"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {t("nav.home")}
          </button>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={(e) => handleScroll(e as any, item.id)}
              className={`text-2xl font-bold transition-colors ${
                activeSection === item.id
                  ? "text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}

          {/* Switchers section inside mobile menu drawer */}
          <div className="flex flex-col items-center gap-6 mt-8 pt-8 border-t border-white/10 w-full">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Language</span>
              <LanguageSwitcher />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Theme</span>
              <ThemeSwitcher
                activeTheme={activeTheme}
                onChangeTheme={onChangeTheme}
              />
            </div>
          </div>
        </div>
      </div>

      <nav className="pointer-events-auto relative z-50 flex items-center justify-between gap-4 rounded-full bg-black/40 px-4 py-2 backdrop-blur-xl transition-all lg:gap-3 lg:px-3 lg:py-1.5 2xl:gap-4 2xl:px-4 2xl:py-2 border border-white/10 w-[92%] md:w-auto md:max-w-fit shadow-2xl">
        <Link
          href="/"
          onClick={scrollToTop}
          className="relative z-[60] flex items-center gap-3 group shrink-0"
        >
          <div className="relative flex h-8 w-auto items-center justify-center">
            <Image
              src="/logo.png"
              alt="A&K Logo"
              width={80}
              height={32}
              className="h-full w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        <div className="relative z-10 hidden items-center gap-2 border-l border-white/15 pl-4 md:flex">
          <NavLink
            label={t("nav.home")}
            id="home"
            isActive={activeSection === "home"}
            onClick={scrollToTop}
          />
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              label={t(`nav.${item.key}`)}
              id={item.id}
              isActive={activeSection === item.id}
              onClick={(e) => handleScroll(e, item.id)}
            />
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-[60] flex h-10 w-10 items-center justify-center text-white md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="relative flex h-5 w-6 flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? "translate-y-2.5 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-all ${isMenuOpen ? "-translate-y-2 translate-x-0 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>
    </header>
  );
};

const NavLink = ({
  label,
  id,
  isActive,
  onClick,
}: {
  label: string;
  id: string;
  isActive: boolean;
  onClick: (e: any) => void;
}) => (
  <Link
    href={id === "home" ? "/" : `/#${id}`}
    onClick={onClick}
    className="group relative px-2 lg:px-2 2xl:px-3"
  >
    <span
      className={`relative z-10 flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-300 lg:h-9 lg:px-3 lg:text-[13px] 2xl:h-10 2xl:px-4 2xl:text-sm tracking-wide ${
        isActive ? "text-black" : "text-zinc-400 group-hover:text-white"
      }`}
    >
      {label}
    </span>

    <span
      aria-hidden="true"
      className={`absolute top-1/2 left-1/2 z-0 h-10 w-full -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 lg:h-9 2xl:h-10 ${
        isActive
          ? "bg-white shadow-md"
          : "bg-transparent group-hover:bg-white/10"
      }`}
    ></span>
  </Link>
);

