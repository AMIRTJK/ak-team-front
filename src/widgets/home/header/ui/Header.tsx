"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { useLenis } from "lenis/react";
import { useTranslation } from "@/shared/lib/i18n";
import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeSwitcher, type Theme } from "@/features/theme-switcher";

const megrimRegular = localFont({
  src: "../../../../../public/fonts/Megrim-Regular.ttf",
  display: "swap",
});

const NAV_ITEMS = [
  { key: "services", id: "services" },
  { key: "projects", id: "projects" },
  { key: "team", id: "team" },
  { key: "reviews", id: "reviews" },
  { key: "faq", id: "faq" },
  { key: "contact", id: "contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

/**
 * Активный пункт меню по реальной позиции скролла (а не только по клику).
 * Секция считается активной, когда её центр пересекает центр вьюпорта;
 * у самого верха страницы активна «Home».
 */
function useScrollSpy() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] },
    );
    els.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 240) setActive("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

interface HeaderProps {
  activeTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}

export const Header = ({ activeTheme, onChangeTheme }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const lenis = useLenis();
  const activeSection = useScrollSpy();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenis?.start();
    }
  }, [isMenuOpen, lenis]);

  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    // Закрываем меню → ждём кадр, чтобы вернулся скролл body, и плавно едем.
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -90 });
      } else {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
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
              onClick={(e) => handleScroll(e, item.id)}
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

      <nav className="pointer-events-auto relative z-50 flex items-center justify-between w-[92%] md:w-auto md:max-w-fit gap-4 transition-all rounded-full bg-black/40 px-4 py-2 backdrop-blur-xl border border-white/10 shadow-2xl lg:gap-3 lg:px-3 lg:py-1.5 2xl:gap-4 2xl:px-4 2xl:py-2">
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

        {/* Center: Brand name on mobile only */}
        <div className={`md:hidden text-white text-base font-medium tracking-[0.25em] select-none ${megrimRegular.className}`}>
          A&K TEAM
        </div>

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
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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

