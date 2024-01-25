import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function AboutSection({ t }) {
	return (
		<CustomTextImgSection
			imgUrl="/images/about.png"
			titlePrefix={t("home.about.titlePrefix")}
			title={t("home.about.title")}
			description={t("home.about.description")}
			reverse
			secondary
		/>
	);
}
