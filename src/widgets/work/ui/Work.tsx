import { ProjectCard, type ProjectData } from "./ProjectCard";

// TODO: добавить стек, ссылки (демо/GitHub) и скриншоты, когда пришлёт Амир.
// Затем вынести в entities/project при FSD-рефакторе.
const PROJECTS: ProjectData[] = [
  {
    index: "01",
    title: "Electronic Document Management System",
    category: "Enterprise · Web app",
    description:
      "An information system for electronic document management and circulation within an organization.",
  },
  {
    index: "02",
    title: "Job Application & Assessment System",
    category: "Web app",
    description:
      "A system for registering job applications and conducting candidate testing and assessment.",
  },
];

export const Work = () => {
  return (
    <section
      id="projects"
      className="w-full bg-gradient-to-b from-[#050505] to-[#0a0a0a] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[clamp(56px,12vw,180px)] font-semibold leading-[0.9] text-[#C8FF12]">
            Selected work
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            Systems we&rsquo;ve built. Full case studies — with stack, process
            and results — are on the way.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};
