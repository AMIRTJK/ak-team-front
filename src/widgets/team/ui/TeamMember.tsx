import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/shared/ui/Icons";

export interface TeamMemberData {
  name: string;
  role: string;
  location: string;
  bio: string;
  initials: string;
  stack: string[];
  links: { github?: string; telegram?: string; linkedin?: string };
}

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-[#C8FF12]/50 hover:text-white";

export const TeamMember = ({
  name,
  role,
  location,
  bio,
  initials,
  stack,
  links,
}: TeamMemberData) => {
  return (
    <div className="group flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8FF12]/40">
      <div className="flex items-center gap-5">
        {/* Плейсхолдер-аватар с инициалами. Позже — фото или 3D-силуэт (Premium-фаза). */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D24A43] to-[#5b2a86] text-2xl font-bold text-white">
          {initials}
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          <p className="text-[#C8FF12]">{role}</p>
          <p className="text-sm text-zinc-500">{location}</p>
        </div>
      </div>

      <p className="text-zinc-400">{bio}</p>

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

      <div className="mt-auto flex gap-3 pt-2">
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — GitHub`}
            className={iconBtn}
          >
            <GithubIcon />
          </a>
        )}
        {links.telegram && (
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — Telegram`}
            className={iconBtn}
          >
            <TelegramIcon />
          </a>
        )}
        {links.linkedin && (
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — LinkedIn`}
            className={iconBtn}
          >
            <LinkedinIcon />
          </a>
        )}
      </div>
    </div>
  );
};
