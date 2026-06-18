import { About } from "@/features/About";
import { ScrollIndicator } from "@/shared/ui/ScrollIndicator";
import { WhatWeDo } from "@/widgets/what-we-do";
import { TechShowcase } from "@/widgets/tech-showcase";
import { Home } from "@/widgets/home";

export default function MainPage() {
  return (
    <main className="min-h-screen bg-[#161515] overflow-x-hidden relative font-sans flex flex-col">
      <Home />
      <About />
      <ScrollIndicator />
      <WhatWeDo />
      <TechShowcase />

      <div className="h-10 w-full" />
    </main>
  );
}
