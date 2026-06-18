import { CapabilityCard } from "./CapabilityCard";

// TODO: вынести в entities/service, когда появится полноценный каталог и конструктор
const CAPABILITIES = [
  {
    index: "01",
    title: "Web Development",
    description:
      "Landing pages, corporate sites, e-commerce, portals and custom web apps — architected to grow with your business.",
    tags: ["Next.js", "CMS", "E-commerce"],
  },
  {
    index: "02",
    title: "Frontend",
    description:
      "Pixel-accurate, accessible interfaces with fluid motion and real performance budgets, not just pretty screens.",
    tags: ["React", "TypeScript", "Motion"],
  },
  {
    index: "03",
    title: "Backend",
    description:
      "REST & GraphQL APIs, microservices, third-party integrations and databases that stay fast under real load.",
    tags: ["Node.js", "PostgreSQL", "APIs"],
  },
  {
    index: "04",
    title: "DevOps",
    description:
      "Docker, CI/CD pipelines, server provisioning, monitoring and calm, repeatable deployments.",
    tags: ["Docker", "CI/CD", "Monitoring"],
  },
  {
    index: "05",
    title: "AI Solutions",
    description:
      "Local LLMs, corporate AI assistants, RAG systems and automation that quietly removes manual work.",
    tags: ["Local LLM", "RAG", "Automation"],
  },
];

export const WhatWeDo = () => {
  return (
    <section
      id="services"
      className="flex w-full flex-col items-center bg-gradient-to-b from-[#161515] via-[#111111] to-[#030303] px-6 py-24 md:px-15"
    >
      <div className="w-full max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[clamp(56px,12vw,180px)] font-semibold leading-[0.9] text-[#C8FF12]">
            What we do
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            Five disciplines, one team. We take a product from the first sketch
            to a running server — and keep it there.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <CapabilityCard key={capability.index} {...capability} />
          ))}
        </div>
      </div>
    </section>
  );
};
