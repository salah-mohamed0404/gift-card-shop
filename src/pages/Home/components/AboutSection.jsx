import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function AboutSection({ t }) {
	return (
		<CustomTextImgSection
			titlePrefix={t("home.about.titlePrefix")}
			title={t("home.about.title")}
			description={t("home.about.description")}
			reverse
		/>
	);
}
