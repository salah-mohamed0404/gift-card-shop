import CustomTextImgSection from "../../../components/CustomTextImgSection";

export default function AboutSection({ t }) {
	return (
		<CustomTextImgSection
			imgUrl="/images/about.png"
			className={'w-full'}
			reverse
			secondary
		/>
	);
}
