"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoIcon } from "@/shared/ui/Icons";

const NAV_LINKS = ["Services", "Projects", "Team", "Blog", "FAQ", "Contact"];

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Блокируем скролл страницы, когда открыто мобильное меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection("home");
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // 1. Контейнер теперь на всю ширину (w-full), центрирует содержимое через flex, z-index повышен до 100
    // pointer-events-none нужен, чтобы клики проходили сквозь пустые области хедера
    <header className="fixed top-16 md:top-6 left-0 w-full z-[100] flex justify-center pointer-events-none">
      {/* 2. Темный фон мобильного меню (Overlay). Вынесен ИЗ <nav>, чтобы растягиваться на 100% экрана */}
      <div
        className={`fixed inset-0 w-screen h-[100dvh] bg-[#11100F] transition-opacity duration-300 md:hidden flex flex-col items-center justify-center pointer-events-auto ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 mt-12">
          <button
            onClick={scrollToTop}
            className={`text-2xl font-bold transition-colors ${
              activeSection === "home"
                ? "text-[#E4D4C0]"
                : "text-[#E4D4C0]/50 hover:text-[#E4D4C0]"
            }`}
          >
            Home
          </button>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={(e) => handleScroll(e as any, link.toLowerCase())}
              className={`text-2xl font-bold transition-colors ${
                activeSection === link.toLowerCase()
                  ? "text-[#E4D4C0]"
                  : "text-[#E4D4C0]/50 hover:text-[#E4D4C0]"
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Само меню (плашка). relative и z-50 оставляют его поверх темного фона */}
      <nav className="pointer-events-auto relative z-50 flex items-center justify-between gap-4 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition-all lg:gap-3 lg:px-3 lg:py-1.5 2xl:gap-4 2xl:px-4 2xl:py-2 border border-white/10 w-[95%] max-w-fit">
        {/* Logo Area */}
        <Link
          href="/"
          onClick={scrollToTop}
          className="relative z-[60] flex items-center gap-3 pr-3 lg:pr-2 2xl:pr-3"
        >
          <LogoIcon />
          <span className="text-[#E4D4C0] font-black text-xl tracking-widest mt-0.5">
            GRAFFICO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="relative z-10 hidden items-center gap-1 border-l-2 border-[#E4D4C0]/30 pl-8 md:flex lg:pl-6 2xl:pl-8">
          <NavLink
            label="Home"
            isActive={activeSection === "home"}
            onClick={scrollToTop}
          />
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link}
              label={link}
              isActive={activeSection === link.toLowerCase()}
              onClick={(e) => handleScroll(e, link.toLowerCase())}
            />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-[60] flex h-10 w-10 items-center justify-center text-[#E4D4C0] md:hidden"
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

// Вспомогательный компонент для ссылок (Desktop)
const NavLink = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: (e: any) => void;
}) => (
  <Link
    href={label === "Home" ? "/" : `/#${label.toLowerCase()}`}
    onClick={onClick}
    className="group relative px-3 lg:px-2 2xl:px-3"
  >
    <span
      className={`relative z-10 flex h-12 items-center rounded-full px-4 text-sm font-bold transition-colors lg:h-10 lg:px-3 lg:text-xs 2xl:h-12 2xl:px-4 2xl:text-sm ${
        isActive ? "text-[#1A1918]" : "text-[#E4D4C0]"
      }`}
    >
      {label}
    </span>
    <span
      aria-hidden="true"
      className={`absolute top-1/2 left-1/2 z-0 h-10 w-full max-w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 lg:h-8 2xl:h-10 ${
        isActive ? "bg-[#E4D4C0]" : "bg-transparent group-hover:bg-[#E4D4C0]/20"
      }`}
    ></span>
  </Link>
);
