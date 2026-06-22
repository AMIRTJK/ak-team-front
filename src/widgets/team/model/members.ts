export interface Hotspot {
  id: string;
  label: string;
  position: { top: string; left: string };
  items: string[];
}

export interface TeamMemberData {
  name: string;
  role: string;
  location: string;
  bio: string;
  initials: string;
  accent: string;
  stack: string[];
  links: { github?: string; telegram?: string; linkedin?: string };
  hotspots: Hotspot[];
  /** URL GLB-аватара (MetaPerson/Mixamo) в /public. Пусто → placeholder-манекен. */
  model?: string;
}

// Позиции хотспотов вокруг фигуры (в % контейнера).
const POS = {
  skills: { top: "15%", left: "10%" },
  stack: { top: "24%", left: "88%" },
  projects: { top: "72%", left: "85%" },
  experience: { top: "62%", left: "8%" },
};

// TODO: дополнить hotspots реальными данными (опыт, достижения) по мере получения от команды.
export const MEMBERS: TeamMemberData[] = [
  {
    name: "Amir Sharipov",
    role: "Frontend Developer",
    location: "Dushanbe, Tajikistan",
    bio: "I build web applications with React and TypeScript.",
    initials: "A",
    accent: "#D24A43",
    model: "/models/amir.fbx",
    stack: ["React", "TypeScript", "Next.js"],
    links: {
      github: "https://github.com/AMIRTJK",
      telegram: "https://t.me/+992985719996",
    },
    hotspots: [
      {
        id: "skills",
        label: "Skills",
        position: POS.skills,
        items: [
          "Frontend development",
          "React & TypeScript",
          "Responsive UI",
          "Web applications",
        ],
      },
      {
        id: "stack",
        label: "Stack",
        position: POS.stack,
        items: ["React", "TypeScript", "Next.js"],
      },
      {
        id: "projects",
        label: "Projects",
        position: POS.projects,
        items: [
          "Electronic Document Management System",
          "Job Application & Assessment System",
        ],
      },
      {
        id: "experience",
        label: "Experience",
        position: POS.experience,
        items: [
          "Enterprise web applications",
          "Document management systems",
          "Hiring & assessment platforms",
          "React & TypeScript SPAs",
        ],
      },
    ],
  },
  {
    name: "Komil Muminov",
    role: "Frontend Developer",
    location: "Dushanbe, Tajikistan",
    bio: "I build web applications with React and TypeScript.",
    initials: "K",
    accent: "#C8FF12",
    model: "/models/komil.fbx",
    stack: ["React", "TypeScript", "Next.js"],
    links: {
      github: "https://github.com/Komil-Muminov",
      telegram: "https://t.me/komilff7",
    },
    hotspots: [
      {
        id: "skills",
        label: "Skills",
        position: POS.skills,
        items: [
          "Frontend development",
          "React & TypeScript",
          "Responsive UI",
          "Web applications",
        ],
      },
      {
        id: "stack",
        label: "Stack",
        position: POS.stack,
        items: ["React", "TypeScript", "Next.js"],
      },
      {
        id: "projects",
        label: "Projects",
        position: POS.projects,
        items: [
          "Electronic Document Management System",
          "Job Application & Assessment System",
        ],
      },
      {
        id: "experience",
        label: "Experience",
        position: POS.experience,
        items: [
          "Enterprise web applications",
          "Document management systems",
          "Hiring & assessment platforms",
          "React & TypeScript SPAs",
        ],
      },
    ],
  },
];
