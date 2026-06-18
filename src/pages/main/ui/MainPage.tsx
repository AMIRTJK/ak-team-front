import { About } from "@/features/About";
import { ScrollIndicator } from "@/shared/ui/ScrollIndicator";
import { WhatWeDo } from "@/widgets/what-we-do";
import { TechMarquee } from "@/widgets/tech-marquee";
import { WebTypes } from "@/widgets/web-types";
import { Estimator } from "@/widgets/estimator";
import { Work } from "@/widgets/work";
import { Team } from "@/widgets/team";
import { Process } from "@/widgets/process";
import { Faq } from "@/widgets/faq";
import { Contact } from "@/widgets/contact";
import { Footer } from "@/widgets/footer";
import { Home } from "@/widgets/home";

export default function MainPage() {
  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden relative font-sans flex flex-col">
      <Home />
      <About />
      <ScrollIndicator />
      <WhatWeDo />
      <TechMarquee />
      <WebTypes />
      <Estimator />
      <Work />
      <Team />
      <Process />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
