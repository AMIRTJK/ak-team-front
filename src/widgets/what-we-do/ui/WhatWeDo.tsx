"use client";

import { useTranslation } from "@/shared/lib/i18n";
import { CapabilityCard } from "./CapabilityCard";

// TODO: вынести в entities/service, когда появится полноценный каталог и конструктор
const CAPABILITIES = [
  { index: "01" },
  { index: "02" },
  { index: "03" },
  { index: "04" },
  { index: "05" },
];

export const WhatWeDo = () => {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="flex w-full flex-col items-center bg-gradient-to-b from-[#050505] to-[#0a0a0a] px-6 py-24 md:px-15"
    >
      <div className="w-full max-w-7xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(40px,8.5vw,130px)] font-semibold leading-[1.2] text-[#C8FF12]">
            {t("what_we_do.title")}
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            {t("what_we_do.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <CapabilityCard
              key={capability.index}
              index={capability.index}
              title={t(`what_we_do.capabilities.${capability.index}.title`)}
              description={t(`what_we_do.capabilities.${capability.index}.description`)}
              tags={t(`what_we_do.capabilities.${capability.index}.tags`) || []}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

