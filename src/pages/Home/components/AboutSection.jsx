import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function AboutSection() {
	return (
		<CustomTextImgSection
			imgUrl="/images/about.webp"
			className={"w-full"}
			reverse
			secondary
		/>
	);
}
