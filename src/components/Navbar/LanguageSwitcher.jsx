import useLangSwitch from "../../hooks/useLangSwitch";

export default function LanguageSwitcher() {
	const { toggleLanguage, language } = useLangSwitch();

	return (
		<button
			type="button"
			onClick={toggleLanguage}
			className="transition-colors hover:text-primary-500"
		>
			{language === "en" ? "العربية" : "English"}
		</button>
	);
}
