export interface WebTypeData {
  index: string;
  title: string;
  description: string;
}

export const TypeCard = ({ index, title, description }: WebTypeData) => (
  <div className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C8FF12]/40">
    <span className="font-mono text-xs text-[#C8FF12]/70">{index}</span>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
  </div>
);
