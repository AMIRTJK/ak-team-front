import { ScrollIcon } from "@/shared/ui/Icons";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center pt-16 md:pt-0">
      {/* Center Giant Text */}
      {/* Увеличили пропорции для мобильных (18vw) и оставили 14vw для десктопа */}
      <h1 className="text-[#EAE4D3] text-[18vw] md:text-[14vw] font-black tracking-tighter leading-none select-none flex items-center">
        GR
        <div className="relative inline-flex items-center justify-center">
          A{/* Треугольник тоже адаптивный */}
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[2.5vw] border-r-[2.5vw] border-t-[3.5vw] md:border-l-[1.5vw] md:border-r-[1.5vw] md:border-t-[2.5vw] border-transparent border-t-[#D2A838]"></div>
        </div>
        FFICO
      </h1>

      {/* Bottom Area */}
      {/* На мобильных: flex-col, на планшетах и выше: flex-row */}
      <div className="absolute bottom-6 md:bottom-10 left-0 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0">
        {/* Left: Web Studio Info */}
        <div className="max-w-full md:max-w-sm lg:max-w-md w-full">
          <p className="text-[#D24A43] text-[10px] md:text-xs font-bold tracking-[0.2em] mb-2 md:mb-4 uppercase">
            Web Studio
          </p>
          <h2 className="text-[#EAE4D3] text-3xl md:text-4xl lg:text-5xl font-serif italic font-bold leading-tight mb-3 md:mb-4">
            We craft digital <br className="hidden md:block" /> experiences
          </h2>
          <p className="text-[#888888] text-xs md:text-sm max-w-[90%] md:max-w-full">
            We engineer the success of your vision through technology and
            innovation.
          </p>
          <div className="w-full h-[1px] bg-transparent mt-5 md:mt-6 border-dashed border-b border-[#444]"></div>
        </div>

        {/* Center: Scroll Indicator */}
        {/* Скрываем на мобильных для экономии места, так как скролл интуитивен */}
        <div className="hidden md:flex flex-col items-center gap-4 absolute left-1/2 -translate-x-1/2">
          <span className="text-[#EAE4D3] text-[10px] font-bold tracking-widest uppercase">
            Scroll to discover
          </span>
          <ScrollIcon />
        </div>

        {/* Right: Stats */}
        <div className="flex gap-8 md:gap-12 text-left md:text-right w-full md:w-auto pt-2 md:pt-0">
          <div>
            <p className="text-[#D24A43] text-3xl md:text-4xl font-serif italic font-black mb-1">
              15+
            </p>
            <p className="text-[#EAE4D3] text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
              Industries
            </p>
          </div>
          <div>
            <p className="text-[#D24A43] text-3xl md:text-4xl font-serif italic font-black mb-1">
              5+
            </p>
            <p className="text-[#EAE4D3] text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
              Years
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
