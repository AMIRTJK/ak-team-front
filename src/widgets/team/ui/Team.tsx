"use client";

import { useEffect, useState } from "react";
import { MEMBERS } from "../model/members";
import { TeamMember } from "./TeamMember";
import { Team3D } from "./Team3D";

export const Team = () => {
  // 3D-портрет только на десктопе и при разрешённой анимации.
  // Иначе — статичные карточки (фолбэк).
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnhanced(wide.matches && !reduce.matches);
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return (
    <section
      id="team"
      className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[clamp(56px,12vw,180px)] font-semibold leading-[0.9] text-[#C8FF12]">
            Team
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            Two engineers, one standard — the people who actually build your
            product.
          </p>
        </div>

        {enhanced ? (
          <Team3D />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {MEMBERS.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
