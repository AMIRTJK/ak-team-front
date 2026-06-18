"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "CI/CD",
  "Three.js",
  "GSAP",
  "Tailwind",
  "REST APIs",
  "Local LLM",
  "RAG",
];

const Track = () => (
  <div className="flex shrink-0 items-center">
    {ITEMS.map((item) => (
      <span
        key={item}
        className="flex items-center whitespace-nowrap text-2xl font-semibold uppercase tracking-tight text-white/55 md:text-4xl"
      >
        {item}
        <span className="px-6 text-[#C8FF12] md:px-8">/</span>
      </span>
    ))}
  </div>
);

/**
 * Горизонтальный tech-тикер, который едет от скролла страницы.
 * Замена pinned-3D: другой по характеру скролл-элемент, лёгкий, без перекрытий.
 */
export const TechMarquee = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="w-full overflow-hidden border-y border-white/5 bg-[#0a0a0a] py-8 md:py-10"
    >
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        <Track />
        <Track />
      </motion.div>
    </section>
  );
};
