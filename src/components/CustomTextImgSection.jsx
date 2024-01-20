import { Container, Typography } from "@mui/material";

export default function CustomTextImgSection({
	imgUrl = "https://source.unsplash.com/random/1400x800",
	titlePrefix,
	title,
	description,
	reverse = false,
}) {
	return (
		<Container
			component="section"
			className={`!flex ${
				reverse ? "flex-row-reverse" : ""
			} justify-between flex-wrap`}
		>
			<div className="md:w-6/12 w-full">
				<img src={imgUrl} alt={title} className="object-cover rounded" />
			</div>

			<div className="flex flex-col justify-center md:w-5/12 w-full">
				<Typography
					variant="h3"
					component="h2"
					className="text-primary-700 !mb-6"
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
