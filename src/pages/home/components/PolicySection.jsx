import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function PolicySection({ t }) {
	return (
		<CustomTextImgSection
			titlePrefix={t("home.policy.titlePrefix")}
			title={t("home.policy.title")}
			description={t("home.policy.description")}
		/>
	);
}