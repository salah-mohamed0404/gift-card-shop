import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();

	const handleLangSwitch = () => {
		if (i18n.language === "en") i18n.changeLanguage("ar");
		else i18n.changeLanguage("en");
	};

	return (
		<button
			type="button"
			onClick={handleLangSwitch}
			className="transition-colors hover:text-primary-500"
		>
			{i18n.language === "en" ? "العربية" : "English"}
		</button>
	);
}
