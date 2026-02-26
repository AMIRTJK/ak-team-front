import { LanguageSwitcher } from "@/features/language-switcher/ui/LanguageSwitcher";
import { Header } from "./header/ui/Header";
import { Hero } from "./hero/ui/Hero";


export const Home = () => {
  return (
    <div className="fullscreen">
      <LanguageSwitcher />
      <Header />
      <Hero />
    </div>
  );
};
