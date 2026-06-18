import { AuroraBackground } from "@/shared/ui";
import { TextRender } from "./ui/TextRender";

export const About = () => {
  return (
    <section className="relative w-full min-h-screen px-15 overflow-hidden">
      <AuroraBackground className="absolute inset-0 w-full h-full z-0" />

      <div className="relative z-10 pt-[50vh] pb-[50vh]">
        <TextRender />
      </div>
    </section>
  );
};
