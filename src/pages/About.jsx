import { useTranslation } from "react-i18next";
import AboutSection from "./../pages/Home/components/AboutSection";

import PolicySection from "./../pages/Home/components/PolicySection";


export default function About() {
		const { t } = useTranslation();
	return (
		<main className="flex flex-col *:mb-28 py-[200px]">
		
			<PolicySection t={t} />
			<AboutSection t={t} />
		</main>
	);
}
