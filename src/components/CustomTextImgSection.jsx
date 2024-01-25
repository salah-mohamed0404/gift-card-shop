import { Container, Typography } from "@mui/material";

export default function CustomTextImgSection({
	imgUrl = "https://source.unsplash.com/random/1400x800",
	titlePrefix,
	title,
	description,
	reverse = false,
	secondary = false,
}) {
	return (
		<Container
			component="section"
			className={`!flex ${
				reverse ? "flex-row-reverse" : ""
			} justify-between flex-wrap *:rtl:text-right`}
		>
			<div className="md:w-6/12 w-full h-full">
				<img
					src={imgUrl}
					alt={title}
					className="object-cover rounded h-[300px] w-full"
				/>
			</div>

			<div className="flex flex-col justify-center md:w-5/12 w-full text-center mt-5 lg:text-left lg:mt-0">
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
