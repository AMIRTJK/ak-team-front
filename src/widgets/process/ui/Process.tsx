"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    title: "Brief & discovery",
    description:
      "We dig into your goal, users and constraints before writing a single line of code.",
  },
  {
    title: "Design & prototype",
    description:
      "Wireframes and clickable UI, so the result is agreed before development starts — no surprises.",
  },
  {
    title: "Development",
    description:
      "We build in short iterations with working demos you can follow at every step.",
  },
  {
    title: "QA & polish",
    description:
      "Testing, performance and accessibility checks before anything goes live.",
  },
  {
    title: "Launch",
    description:
      "We deploy, configure the server and hand over a working, documented product.",
  },
  {
    title: "Support & growth",
    description:
      "We stay on to maintain, monitor and evolve what we built as your needs change.",
  },
];

export const Process = () => {
  return (
    <section
      id="process"
      className="w-full bg-gradient-to-b from-[#050505] to-[#0a0a0a] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[clamp(44px,10vw,140px)] font-semibold leading-[0.9] text-[#C8FF12]">
            How we work
          </h2>
          <p className="mb-16 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            A clear path from idea to a running product — you always know what
            happens next.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-white/10 md:left-[27px]" />
          <ol className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                className="relative flex gap-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C8FF12]/30 bg-[#0a0a0a] font-semibold text-[#C8FF12] md:h-14 md:w-14 md:text-lg">
                  {i + 1}
                </div>
                <div className="pt-1.5 md:pt-3.5">
                  <h3 className="text-xl font-semibold text-white md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
