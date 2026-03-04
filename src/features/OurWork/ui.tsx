import { Card } from "./ui/Card";

export const OurWork = () => {
  return (
    <section className="w-full flex flex-col items-center p-15 bg-gradient-to-b from-[#111111] to-[#030303]">
      <div className="w-full flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-[#C8FF12] text-[clamp(64px,14vw,220px)] leading-[0.9]">
          Our work
        </h2>
        <h5 className="mb-12 max-w-3xl text-2xl text-white">
          Our job is simple - to craft digital experiences that take you far
          beyond what you came for.
        </h5>
      </div>
      <div className="w-full flex justify-center gap-3">
        <Card
          color="bg-[#EF3A37]"
          title="awwwards."
          titleDesc="Site of the Day"
          desc="WE WON SITE OF THE DAY ON AWWWARDS WITH AVAX.NETWORK WEBSITE!"
          footerText="2025 Official Certificate."
        />
        <Card
          color="bg-[#6B4D97]"
          title="awwwards."
          titleDesc="Developer Award"
          desc="WE WON SITE OF THE DAY ON AWWWARDS WITH AVAX.NETWORK WEBSITE!"
          footerText="2025 Official Certificate."
        />
      </div>
    </section>
  );
};
