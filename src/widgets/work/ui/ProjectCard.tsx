export interface ProjectData {
  index: string;
  title: string;
  description: string;
  category?: string;
  stack?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const ProjectCard = ({
  index,
  title,
  description,
  category,
  stack,
  demoUrl,
  githubUrl,
}: ProjectData) => {
  return (
    <div className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8FF12]/40">
      {/* Плейсхолдер-обложка, пока нет скриншота */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
        <span className="text-7xl font-bold text-white/10">{index}</span>
      </div>

      {category && (
        <span className="text-xs font-medium uppercase tracking-wider text-[#C8FF12]/70">
          {category}
        </span>
      )}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>

      {stack && stack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {(demoUrl || githubUrl) && (
        <div className="mt-auto flex gap-4 pt-2 text-sm">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8FF12] transition-colors hover:text-white"
            >
              Live demo ↗
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 transition-colors hover:text-white"
            >
              GitHub ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
};
