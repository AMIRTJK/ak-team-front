"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Задержка появления (для каскадов: delay={i * 0.08}) */
  delay?: number;
  /** Смещение по Y до появления, px */
  y?: number;
  /** Анимировать только один раз */
  once?: boolean;
  /** Доля элемента во вьюпорте для старта (0–1) */
  amount?: number;
}

/**
 * Единый reveal-примитив: плавное появление снизу при въезде во вьюпорт.
 * Используем системно вместо разрозненных whileInView по секциям.
 * При prefers-reduced-motion рендерит контент без анимации.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.3,
}: RevealProps) => {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
