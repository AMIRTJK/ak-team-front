interface CapabilityCardProps {
  index: string;
  title: string;
  description: string;
  tags: string[];
}

const CapabilityBackground = ({ index }: { index: string }) => {
  if (index === "01") {
    // Concentric circles (Web Development)
    return (
      <svg
        className="absolute -top-10 -left-10 w-44 h-44 text-white/[0.03] group-hover:text-[#C8FF12]/10 transition-colors duration-500 pointer-events-none"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <circle cx="30" cy="30" r="15" />
        <circle cx="30" cy="30" r="30" />
        <circle cx="30" cy="30" r="45" />
        <circle cx="30" cy="30" r="60" />
        <circle cx="30" cy="30" r="75" />
        <circle cx="30" cy="30" r="90" />
      </svg>
    );
  }
  if (index === "02") {
    // Overlapping rotated rounded rects (Frontend / UI design)
    return (
      <svg
        className="absolute -top-10 -left-10 w-36 h-36 text-white/[0.03] group-hover:text-[#C8FF12]/10 transition-colors duration-500 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <rect x="20" y="20" width="45" height="45" rx="8" transform="rotate(15, 42.5, 42.5)" />
        <rect x="20" y="20" width="45" height="45" rx="8" transform="rotate(30, 42.5, 42.5)" />
        <rect x="20" y="20" width="45" height="45" rx="8" transform="rotate(45, 42.5, 42.5)" />
        <rect x="20" y="20" width="45" height="45" rx="8" transform="rotate(60, 42.5, 42.5)" />
      </svg>
    );
  }
  if (index === "03") {
    // Interconnected nodes (Backend / APIs / Data structures)
    return (
      <svg
        className="absolute -top-6 -left-6 w-36 h-36 text-white/[0.03] group-hover:text-[#C8FF12]/10 transition-colors duration-500 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <circle cx="25" cy="25" r="3.5" fill="currentColor" />
        <circle cx="65" cy="25" r="3.5" fill="currentColor" />
        <circle cx="45" cy="65" r="3.5" fill="currentColor" />
        <circle cx="85" cy="55" r="3.5" fill="currentColor" />
        
        <line x1="25" y1="25" x2="65" y2="25" />
        <line x1="25" y1="25" x2="45" y2="65" />
        <line x1="65" y1="25" x2="45" y2="65" />
        <line x1="65" y1="25" x2="85" y2="55" />
        <line x1="45" y1="65" x2="85" y2="55" />
      </svg>
    );
  }
  if (index === "04") {
    // Hexagonal expansion layout (DevOps / Docker / CI/CD)
    return (
      <svg
        className="absolute -top-12 -left-12 w-44 h-44 text-white/[0.03] group-hover:text-[#C8FF12]/10 transition-colors duration-500 pointer-events-none"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden="true"
      >
        <polygon points="35,15 70,15 87,45 70,75 35,75 18,45" />
        <polygon points="35,15 70,15 87,45 70,75 35,75 18,45" transform="scale(1.25) translate(-8, -8)" />
        <polygon points="35,15 70,15 87,45 70,75 35,75 18,45" transform="scale(1.5) translate(-14, -14)" />
      </svg>
    );
  }
  // index === "05" or default
  // Neural net rays & concentric dashed rings (AI solutions)
  return (
    <svg
      className="absolute -top-10 -left-10 w-40 h-40 text-white/[0.03] group-hover:text-[#C8FF12]/10 transition-colors duration-500 pointer-events-none"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
    >
      <line x1="20" y1="20" x2="95" y2="95" />
      <line x1="20" y1="20" x2="85" y2="20" />
      <line x1="20" y1="20" x2="20" y2="85" />
      <line x1="20" y1="20" x2="65" y2="40" />
      <line x1="20" y1="20" x2="40" y2="65" />
      <circle cx="20" cy="20" r="18" strokeDasharray="3 3" />
      <circle cx="20" cy="20" r="32" strokeDasharray="3 3" />
      <circle cx="20" cy="20" r="46" strokeDasharray="3 3" />
      <circle cx="20" cy="20" r="60" strokeDasharray="3 3" />
    </svg>
  );
};

export const CapabilityCard = ({
  index,
  title,
  description,
  tags,
}: CapabilityCardProps) => {
  return (
    <div className="group relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8FF12]/50 hover:bg-white/[0.05] overflow-hidden">
      <CapabilityBackground index={index} />
      <span className="font-mono text-sm text-[#C8FF12]/70 relative z-10">{index}</span>
      <h3 className="text-2xl font-semibold text-white relative z-10">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400 relative z-10">{description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2 relative z-10">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
