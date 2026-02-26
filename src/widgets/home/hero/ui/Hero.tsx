import { ScrollIcon } from "@/shared/ui/Icons";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between pt-28 pb-8 md:pt-32 md:pb-10">
      <div className="flex-1 flex items-center justify-center w-full">
        <h1 className="text-[#EAE4D3] text-[24vw] md:text-[12vw] font-black tracking-tighter leading-[0.85] md:leading-none select-none flex flex-col md:flex-row items-center md:gap-4 text-center">
          <span>A&K</span>
          <span>TEAM</span>
        </h1>
      </div>

      <div className="relative w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-0 h-auto">
        <div className="max-w-full md:max-w-sm lg:max-w-md w-full relative z-10">
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

        <div className="flex flex-col items-center gap-3 w-full justify-center md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 relative z-10">
          <span className="text-[#EAE4D3] text-[10px] font-bold tracking-widest uppercase">
            Scroll to discover
          </span>
          <ScrollIcon />
        </div>
      </div>
    </section>
  );
};
