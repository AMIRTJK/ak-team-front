import { Header } from "@/widgets/header/ui/Header";
import { Hero } from "@/widgets/hero/ui/Hero";
import { LanguageSwitcher } from "@/features/language-switcher/ui/LanguageSwitcher";

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#161515] overflow-x-hidden relative font-sans">
      <LanguageSwitcher />
      <Header />
      <Hero />
    </main>
  );
};
