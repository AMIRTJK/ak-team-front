"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "@/shared/lib/i18n";
import { Reveal } from "@/shared/ui";

const ITEMS = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useTranslation();

  return (
    <section
      id="faq"
      className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-3xl">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(48px,11vw,160px)] font-semibold leading-[1.2] text-[#C8FF12]">
            {t("faq.title")}
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            {t("faq.subtitle")}
          </p>
        </Reveal>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            const questionText = t(`faq.items.${i}.q`);
            const answerText = t(`faq.items.${i}.a`);
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-white">
                    {questionText}
                  </span>
                  <span
                    className={`shrink-0 text-2xl leading-none text-[#C8FF12] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 leading-relaxed text-zinc-400">
                        {answerText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

