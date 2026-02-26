import { LanguageSwitcher } from "@/features/language-switcher/ui/LanguageSwitcher";
import { Header } from "./header/ui/Header";
import { Hero } from "./hero/ui/Hero";
import { About } from "@/features/About";

export const Home = () => {
	return (
		<div className="fullscreen">
			<LanguageSwitcher />
			<Header />
			<Hero />
			<About />
		</div>
	);
};
