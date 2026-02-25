import { ScrollIcon } from "@/shared/ui/Icons";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center">
      {/* Center Giant Text */}
      {/* Примечание: В реальном проекте эту надпись лучше вставить как SVG из Figma для точного совпадения шрифта и желтого треугольника */}
      <h1 className="text-[#EAE4D3] text-[14vw] font-black tracking-tighter leading-none select-none flex items-center">
        GR
        <div className="relative inline-flex items-center justify-center">
          A
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[1.5vw] border-r-[1.5vw] border-t-[2.5vw] border-transparent border-t-[#D2A838]"></div>
        </div>
        FFICO
      </h1>

      {/* Bottom Area */}
      <div className="absolute bottom-10 left-0 w-full px-12 flex justify-between items-end">
        {/* Left: Web Studio Info */}
        <div className="max-w-md">
          <p className="text-[#D24A43] text-xs font-bold tracking-[0.2em] mb-4 uppercase">
            Web Studio
          </p>
          <h2 className="text-[#EAE4D3] text-5xl font-serif italic font-bold leading-tight mb-4">
            We craft digital <br /> experiences
          </h2>
          <p className="text-[#888888] text-sm">
            We engineer the success of your vision through technology and
            innovation.
          </p>
          <div className="w-full h-[1px] bg-[#333] mt-6 border-dashed border-b border-[#444]"></div>
        </div>

        {/* Center: Scroll Indicator */}
        <div className="flex flex-col items-center gap-4 absolute left-1/2 -translate-x-1/2">
          <span className="text-[#EAE4D3] text-[10px] font-bold tracking-widest uppercase">
            Scroll to discover
          </span>
          <ScrollIcon />
        </div>

        {/* Right: Stats */}
        <div className="flex gap-12 text-right">
          <div>
            <p className="text-[#D24A43] text-4xl font-serif italic font-black mb-1">
              15+
            </p>
            <p className="text-[#EAE4D3] text-[10px] font-bold tracking-widest uppercase">
              Industries
            </p>
          </div>
          <div>
            <p className="text-[#D24A43] text-4xl font-serif italic font-black mb-1">
              5+
            </p>
            <p className="text-[#EAE4D3] text-[10px] font-bold tracking-widest uppercase">
              Years
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
