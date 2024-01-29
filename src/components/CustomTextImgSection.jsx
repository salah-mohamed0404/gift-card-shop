import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function CustomTextImgSection({
	imgUrl = "https://source.unsplash.com/random/1400x800",
	titlePrefix,
	title,
	description,
	reverse = false,
	secondary = false,
	className,
	textOn
}) {
	const { t } = useTranslation();

	
	return (
		<Container
			component="section"
			className={`!flex ${
				reverse ? "flex-row-reverse" : ""
			} justify-between flex-wrap *:rtl:text-right`}
		>
			<div className={`${className ? "w-full" : "md:w-6/12  w-full h-full"} relative`}>
				<img
					src={imgUrl}
					alt={title}
					className={`object-cover rounded ${
						secondary ? "h-52 md:h-auto" : "h-[300px]"
					} w-full`}
				/>
				{textOn &&
				<div className="bg-primary-500/75  right-[24%] bottom-[20%] py-8 px-12 mx-8 rounded-2xl shadow-2xl absolute  z-10">
					<Typography
						variant="h2"
						component="h1"
						className="text-gray-50 capitalize text-center !text-4xl md:!text-7xl"
					>
						{t("home.hero.title")} {t("siteTitle")}
					</Typography>
					<Typography
						variant="h5"
						component="p"
						className="text-gray-200 capitalize text-center !text-xl md:!text-3xl"
					>
						{t("home.hero.description")}
					</Typography>
				</div>
}
			</div>

			<div className="flex flex-col justify-center md:w-5/12 w-full !text-center lg:!text-start mt-5 lg:mt-0">
				<Typography
					variant="h3"
					component="h2"
					className={`${
						!secondary ? "text-primary-700" : "text-rose-700"
					} !mb-6 sm-mt-5`}
				>
					<span className="text-gray-700">{titlePrefix}</span> {title}
				</Typography>
				<Typography variant="h5" component="p">
					{description}
				</Typography>
			</div>
		</Container>
	);
}
