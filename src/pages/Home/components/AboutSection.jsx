import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function AboutSection() {
	return (
		<CustomTextImgSection
			imgUrl="/images/about.png"
			className={"w-full"}
			reverse
			secondary
		/>
	);
}
