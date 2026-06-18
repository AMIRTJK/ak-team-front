"use client";

import { useTranslation } from "@/shared/lib/i18n";
import { TypeCard, type WebTypeData } from "./TypeCard";

// TODO: вынести в entities/service и связать с конструктором услуг (v2)
const TYPES = [
  { index: "01" },
  { index: "02" },
  { index: "03" },
  { index: "04" },
  { index: "05" },
  { index: "06" },
  { index: "07" },
  { index: "08" },
];

export const WebTypes = () => {
  const { t } = useTranslation();

  return (
    <section
      id="build"
      className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(48px,11vw,160px)] font-semibold leading-[1.2] text-[#C8FF12]">
            {t("web_types.title")}
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            {t("web_types.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TYPES.map((type) => (
            <TypeCard
              key={type.index}
              index={type.index}
              title={t(`web_types.types.${type.index}.title`)}
              description={t(`web_types.types.${type.index}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

