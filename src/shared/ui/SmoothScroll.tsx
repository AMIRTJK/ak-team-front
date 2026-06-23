"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Связка Lenis ↔ GSAP: отключаем собственный RAF Lenis (autoRaf:false) и
 * крутим его из gsap.ticker — так плавный скролл и scrub-анимации идут в одном
 * цикле и не «плывут» друг относительно друга. На каждый скролл дёргаем
 * ScrollTrigger.update(), чтобы триггеры пересчитывались по позиции Lenis.
 */
const LenisGsapBridge = () => {
  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    if (!lenis) return;
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
};

/**
 * Плавный скролл с инерцией на весь сайт.
 * Уважает prefers-reduced-motion: при включённом — колесо мыши работает нативно
 * (без сглаживания), программный scrollTo из навигации остаётся.
 * Элементы с внутренним скроллом (модалки, длинные списки) помечайте
 * атрибутом `data-lenis-prevent`, чтобы Lenis их не перехватывал.
 */
export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  // Читаем настройку один раз при инициализации (не меняется в рантайме),
  // чтобы не дёргать setState в эффекте. На сервере — false (smoothWheel включён),
  // опции Lenis не влияют на SSR-разметку, поэтому рассинхрона гидрации нет.
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: !reduced,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
};
