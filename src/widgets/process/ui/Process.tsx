"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/shared/lib/i18n";
import { Reveal } from "@/shared/ui";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [0, 1, 2, 3, 4, 5];

export const Process = () => {
  const { t, language } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      // Зелёная линия-прогресс заполняется по мере прохода таймлайна.
      if (fillRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 55%",
              end: "bottom 70%",
              scrub: 0.5,
            },
          },
        );
      }

      // Каждый шаг «зажигается», когда его центр доходит до 60% вьюпорта.
      const triggers = STEPS.map((_, i) =>
        ScrollTrigger.create({
          trigger: stepRefs.current[i] as Element,
          start: "top 60%",
          onEnter: () => setActive((prev) => Math.max(prev, i)),
          onLeaveBack: () => setActive(i - 1),
        }),
      );

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope: rootRef, dependencies: [language] },
  );

  return (
    <section
      id="process"
      className="w-full bg-gradient-to-b from-[#050505] to-[#0a0a0a] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(44px,10vw,140px)] font-semibold leading-[1.2] text-[#C8FF12]">
            {t("process.title")}
          </h2>
          <p className="mb-16 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            {t("process.subtitle")}
          </p>
        </Reveal>

        <div ref={rootRef} className="relative mx-auto max-w-3xl">
          {/* Базовая (серая) линия */}
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-white/10 md:left-[27px]" />
          {/* Линия-прогресс (зелёная), растёт сверху вниз по скроллу */}
          <div
            ref={fillRef}
            className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-[#C8FF12] md:left-[27px]"
          />

          <ol className="flex flex-col gap-10">
            {STEPS.map((step, i) => {
              const isActive = i <= active;
              return (
                <li
                  key={step}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative flex gap-6"
                >
                  <div
                    className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-semibold transition-all duration-500 md:h-14 md:w-14 md:text-lg ${
                      isActive
                        ? "border-[#C8FF12] bg-[#C8FF12] text-black"
                        : "border-[#C8FF12]/30 bg-[#0a0a0a] text-[#C8FF12]"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div
                    className={`pt-1.5 transition-opacity duration-500 md:pt-3.5 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-white md:text-2xl">
                      {t(`process.steps.${i}.title`)}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-zinc-400">
                      {t(`process.steps.${i}.description`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
