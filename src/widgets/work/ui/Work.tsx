"use client";

import { useTranslation } from "@/shared/lib/i18n";
import { Reveal } from "@/shared/ui";
import { ProjectCard } from "./ProjectCard";

// TODO: добавить стек, ссылки (демо/GitHub) и скриншоты, когда пришлёт Амир.
// Затем вынести в entities/project при FSD-рефакторе.
const PROJECTS = [{ index: "01" }, { index: "02" }];

export const Work = () => {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="w-full bg-gradient-to-b from-[#050505] to-[#0a0a0a] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-[clamp(56px,12vw,180px)] font-semibold leading-[1.2] text-[#C8FF12]">
            {t("work.title")}
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            {t("work.subtitle")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.index}
              index={project.index}
              title={t(`work.projects.${project.index}.title`)}
              category={t(`work.projects.${project.index}.category`)}
              description={t(`work.projects.${project.index}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
