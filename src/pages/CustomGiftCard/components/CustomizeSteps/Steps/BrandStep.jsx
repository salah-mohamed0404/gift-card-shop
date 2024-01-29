import { Typography } from "@mui/material";

export default function BrandStep({ brand, onBrandChange, t }) {
	return (
		<div className="flex flex-col items-center gap-6">
			<Typography
				variant="h4"
				className="md:!text-4xl !text-3xl capitalize"
				textAlign="center"
			>
				{t("customCard.brand.title")}
			</Typography>

			<ul className="flex justify-center gap-12 flex-wrap">
				{brands.map(({ name, logo }) => (
					<li key={name}>
						<button
							type="button"
							onClick={() => onBrandChange({ name, logo })}
							className={`overflow-hidden rounded-full shadow-lg ${
								name === brand.name
									? "outline-none ring-2 ring-offset-8 ring-red-500"
									: ""
							}`}
						>
							<img src={logo} alt="shape" className="w-16  object-cover" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

const brands = [
	{ name: "test-1", logo: "/images/logo.webp" },
	{ name: "test-2", logo: "https://i.ibb.co/HKbNQ8b/logoipsum-332-svg.png" },
	{ name: "test-3", logo: "https://i.ibb.co/bPhBtnP/logoipsum-331-svg.png" },
	{ name: "test-4", logo: "https://i.ibb.co/FYsFHgB/logoipsum-325-svg.png" },
	{ name: "test-5", logo: "https://i.ibb.co/VMJww10/logoipsum-321-svg.png" },
	{name: "test-6", logo: "https://i.ibb.co/ZWhPhxy/logoipsum-300-svg.png" },
	{name: "test-7", logo: "https://i.ibb.co/sWkFYDg/logoipsum-299-svg.png" },
	{ name: "test-8", logo: "https://i.ibb.co/XkyxBK9/logoipsum-263-svg.png" },
	{
		name: "test-9", logo: "https://i.ibb.co/9tcZCWc/logoipsum-269-svg.png" },
	{ name: "test-10", logo: "https://i.ibb.co/Lp8YX4F/logoipsum-287-svg.png" },

];

