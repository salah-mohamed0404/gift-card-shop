import { useTranslation } from "react-i18next";

export default function useLangSwitch() {
	const {
		i18n: { language, changeLanguage },
	} = useTranslation();

	const toggleLanguage = () => {
		changeLanguage(language === "en" ? "ar" : "en");
	};

	return { toggleLanguage, language };
}
