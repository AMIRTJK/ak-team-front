"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS = [
  {
    q: "How much will my project cost?",
    a: "It depends on scope. Use the estimator above for an instant ballpark, then we confirm a firm range after a short call about the details.",
  },
  {
    q: "How long does it take?",
    a: "From about a week for a landing page to a few months for a complex system. The estimator gives a per-project timeline based on what you select.",
  },
  {
    q: "Do you work with clients outside Tajikistan?",
    a: "Yes. We work remotely with clients anywhere — in Russian, Tajik and English.",
  },
  {
    q: "Can you take over an existing project?",
    a: "Yes. We start with an audit of the current code, then fix, refactor or extend it from there.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes — we offer 3, 6 and 12-month support plans, including monitoring, updates and small improvements.",
  },
  {
    q: "Which technologies do you use?",
    a: "Mainly React, Next.js and TypeScript on the frontend; Node.js and PostgreSQL on the backend; Docker and CI/CD for delivery; and local LLMs for AI features.",
  },
  {
    q: "How do we start?",
    a: "Send a short brief through the form or Telegram. We reply with a few questions, an estimate and a clear plan.",
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[clamp(48px,11vw,160px)] font-semibold leading-[0.9] text-[#C8FF12]">
            FAQ
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            Quick answers to what clients usually ask first.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-medium text-white">
                    {item.q}
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
                        {item.a}
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
