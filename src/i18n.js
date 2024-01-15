import i18n from "i18next";
import i18nextBrowserLanguagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./translations/en";
import ar from "./translations/ar";

i18n
	.use(initReactI18next)
	.use(i18nextBrowserLanguagedetector)
	.init({
		resources: { en, ar },
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
