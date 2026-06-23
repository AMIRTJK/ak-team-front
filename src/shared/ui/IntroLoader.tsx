"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import localFont from "next/font/local";

const megrim = localFont({
  src: "../../../public/fonts/Megrim-Regular.ttf",
  display: "swap",
});

/**
 * Интро-«штора» при загрузке: собирается логотип A&K TEAM + прогресс-линия,
 * затем панель уезжает вверх, открывая Hero. Показывается один раз за сессию,
 * блокирует скролл (через Lenis) на время показа. При prefers-reduced-motion
 * или повторном визите — мгновенно скрывается.
 */
export const IntroLoader = () => {
  const lenis = useLenis();
  // Решение «показывать или сразу скрыть» считаем один раз при инициализации:
  // повторный визит в этой сессии или prefers-reduced-motion → пропускаем.
  // SSR всегда false → штора есть в разметке, рассинхрона гидрации нет
  // (done стартует с false и на сервере, и на клиенте).
  const [skip] = useState(() => {
    if (typeof window === "undefined") return false;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return reduced || sessionStorage.getItem("ak_intro_seen") === "1";
  });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (skip) {
      const id = setTimeout(() => setDone(true), 0);
      return () => clearTimeout(id);
    }

    sessionStorage.setItem("ak_intro_seen", "1");
    window.scrollTo(0, 0);
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const id = setTimeout(() => setDone(true), 1700);
    return () => clearTimeout(id);
  }, [skip, lenis]);

  useEffect(() => {
    if (!done) return;
    lenis?.start();
    document.body.style.overflow = "";
  }, [done, lenis]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0A0A0A]"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: skip ? 0 : 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className={`flex items-baseline ${megrim.className}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-6xl tracking-[0.12em] text-white md:text-8xl">
              A&amp;K
            </span>
            <motion.span
              className="ml-3 text-6xl tracking-[0.12em] text-[#C8FF12] md:text-8xl"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            >
              TEAM
            </motion.span>
          </motion.div>

          <motion.div
            className="mt-8 h-px w-40 origin-left bg-white/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
