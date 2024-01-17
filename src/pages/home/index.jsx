import CardsSection from "./components/CardsSection";
import HeroSection from "./components/HeroSection";
import PolicySection from "./components/PolicySection";

export default function Home() {
	return (
		<main className="flex flex-col gap-28">
			<HeroSection />
			<CardsSection />
			<PolicySection />
		</main>
	);
}
