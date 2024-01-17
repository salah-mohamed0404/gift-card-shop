import { useTranslation } from "react-i18next";
import AboutSection from "./components/AboutSection";
import CardsSection from "./components/CardsSection";
import HeroSection from "./components/HeroSection";
import PolicySection from "./components/PolicySection";

export default function Home() {
	const { t } = useTranslation();

	return (
		<main className="flex flex-col *:mb-28">
			<HeroSection t={t} />
			<CardsSection t={t} />
			<PolicySection t={t} />
			<AboutSection t={t} />
		</main>
	);
}
