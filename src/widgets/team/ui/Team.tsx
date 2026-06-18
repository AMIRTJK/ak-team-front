import { TeamMember, type TeamMemberData } from "./TeamMember";

// TODO: вынести в entities/team-member при FSD-рефакторе
const MEMBERS: TeamMemberData[] = [
  {
    name: "Amir Sharipov",
    role: "Frontend Developer",
    location: "Dushanbe, Tajikistan",
    bio: "I build web applications with React and TypeScript.",
    initials: "A",
    stack: ["React", "TypeScript", "Next.js"],
    links: {
      github: "https://github.com/AMIRTJK",
      telegram: "https://t.me/+992985719996",
    },
  },
  {
    name: "Komil Muminov",
    role: "Frontend Developer",
    location: "Dushanbe, Tajikistan",
    bio: "I build web applications with React and TypeScript.",
    initials: "K",
    stack: ["React", "TypeScript", "Next.js"],
    links: {
      github: "https://github.com/Komil-Muminov",
      telegram: "https://t.me/komilff7",
    },
  },
];

export const Team = () => {
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {MEMBERS.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};
