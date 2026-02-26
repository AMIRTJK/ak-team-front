import { About } from "@/features/About";
import { OurWork } from "@/features/OurWork/ui";
import { ScrollIndicator } from "@/shared/ui/ScrollIndicator";
import { Home } from "@/widgets/home";

export default function MainPage() {
	return (
		<main className="min-h-screen bg-[#161515] overflow-x-hidden relative font-sans flex flex-col gap-20">
			<Home />
			<About />
			<ScrollIndicator />
			<OurWork />
		</main>
	);
}
