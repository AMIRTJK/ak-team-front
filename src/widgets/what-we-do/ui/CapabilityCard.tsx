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
    <div className="group relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8FF12]/50 hover:bg-white/[0.05]">
      <span className="font-mono text-sm text-[#C8FF12]/70">{index}</span>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
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
