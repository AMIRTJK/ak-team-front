import { About } from "@/features/About";
import { OurWork } from "@/features/OurWork/ui";
import { ScrollIndicator } from "@/shared/ui/ScrollIndicator";
import { GamepadShowcase } from "@/widgets/gamepad-showcase";
import { Home } from "@/widgets/home";

export default function MainPage() {
  return (
    <main className="min-h-screen bg-[#161515] overflow-x-hidden relative font-sans flex flex-col gap-20">
      <Home />
      <About />
      <ScrollIndicator />
      <OurWork />

      {/* Изолируем GSAP от флексбокса с помощью обычного div */}
      <div className="block w-full">
        <GamepadShowcase />
      </div>

      {/* Опционально: небольшой невидимый блок в самом конце гарантирует, 
          что браузер точно отдаст весь скролл-контейнер до последнего пикселя */}
      <div className="h-10 w-full" />
    </main>
  );
}
