interface CapabilityCardProps {
  index: string;
  title: string;
  description: string;
  tags: string[];
}

export const CapabilityCard = ({
  index,
  title,
  description,
  tags,
}: CapabilityCardProps) => {
  return (
    <div className="group relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8FF12]/50 hover:bg-white/[0.05] overflow-hidden">
      {/* Decorative background dots pattern */}
      <svg
        className="absolute top-0 left-0 w-32 h-32 text-white/[0.04] group-hover:text-[#C8FF12]/10 transition-colors duration-500 pointer-events-none"
        viewBox="0 0 120 120"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="1.5" />
        <circle cx="40" cy="20" r="1.5" />
        <circle cx="60" cy="20" r="1.5" />
        <circle cx="80" cy="20" r="1.5" />
        <circle cx="100" cy="20" r="1.5" />
        
        <circle cx="20" cy="40" r="1.5" />
        <circle cx="40" cy="40" r="1.5" />
        <circle cx="60" cy="40" r="1.5" />
        <circle cx="80" cy="40" r="1.5" />
        <circle cx="100" cy="40" r="1.5" />
        
        <circle cx="20" cy="60" r="1.5" />
        <circle cx="40" cy="60" r="1.5" />
        <circle cx="60" cy="60" r="1.5" />
        <circle cx="80" cy="60" r="1.5" />
        <circle cx="100" cy="60" r="1.5" />
        
        <circle cx="20" cy="80" r="1.5" />
        <circle cx="40" cy="80" r="1.5" />
        <circle cx="60" cy="80" r="1.5" />
        <circle cx="80" cy="80" r="1.5" />
        <circle cx="100" cy="80" r="1.5" />
        
        <circle cx="20" cy="100" r="1.5" />
        <circle cx="40" cy="100" r="1.5" />
        <circle cx="60" cy="100" r="1.5" />
        <circle cx="80" cy="100" r="1.5" />
        <circle cx="100" cy="100" r="1.5" />
      </svg>
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
