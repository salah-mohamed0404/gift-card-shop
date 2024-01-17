import { useTranslation } from "react-i18next";

export default function useLangSwitch() {
	const {
		i18n: { language, changeLanguage },
	} = useTranslation();

	const toggleLanguage = () => {
		const newLang = language === "en" ? "ar" : "en";
		changeLanguage(newLang);
		document.documentElement.lang = newLang;
		document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
	};

	return { toggleLanguage, language };
}
