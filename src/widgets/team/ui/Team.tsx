"use client";

import { MEMBERS } from "../model/members";
import { TeamMemberMobile } from "./TeamMemberMobile";
import { Team3D } from "./Team3D";
import { useTranslation } from "@/shared/lib/i18n";
import { Reveal } from "@/shared/ui";

export const Team = () => {
  const { t } = useTranslation();

  return (
    <section
      id="team"
      className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(56px,12vw,180px)] font-semibold leading-[1.2] text-[#C8FF12]">
            {t("team.title")}
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            {t("team.subtitle")}
          </p>
        </Reveal>

        {/* Desktop 3D layout */}
        <div className="hidden lg:block">
          <Team3D />
        </div>

        {/* Mobile: лёгкая интерактивная версия (tilt + вкладки) */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {MEMBERS.map((member) => (
              <TeamMemberMobile key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

