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
				{brands.map(({ name, logo,shop }) => (
					<li key={name}>
						<button
							type="button"
							onClick={() => onBrandChange({ name, logo })}
							className={`overflow-hidden rounded-full  shadow-lg ${
								name === brand.name
									? "outline-none ring-2 ring-offset-8 ring-red-500"
									: ""
							}`}
						>
							<img src={shop} alt="shape" className="w-[100px] h-[100px]  object-cover" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

const brands = [
	{ name: "test-1", logo: "https://i.ibb.co/KF9Cn1k/shop0-logo.png", shop: "https://i.ibb.co/bBF9Px6/shop0.png" },
	{ name: "test-2", logo: "https://i.ibb.co/h7k913h/shop9-logo.png", shop: "https://i.ibb.co/DkfXmPN/shop1.jpg" }, 
	{ name: "test-3", logo: "https://i.ibb.co/SJbG73c/shop8-logo.png", shop: "https://i.ibb.co/FVMr576/shop2.png" },
	{ name: "test-4", logo: "https://i.ibb.co/VYGscSG/shop7-logo.png", shop: "https://i.ibb.co/PTcKjC2/shop3.png" }, 
	{ name: "test-5", logo: "https://i.ibb.co/dQbw0dX/shop6-logo.png", shop: "https://i.ibb.co/yqvgtWJ/shop4.png" }, 
	{ name: "test-6", logo: "https://i.ibb.co/JtWpqgd/shop5-logo.png", shop: "https://i.ibb.co/6YQbQtg/shop5.png" },
	{ name: "test-7", logo: "https://i.ibb.co/R4hT9Qq/shop4-logo.png", shop: "https://i.ibb.co/0XT0TM0/shop6.png" },
	{ name: "test-8", logo: "https://i.ibb.co/km8QLw1/shop3-logo.png", shop: "https://i.ibb.co/68ZnHbD/shop7.png" },
	{ name: "test-9", logo: "https://i.ibb.co/sb6DQLw/shop2-logo.png", shop: "https://i.ibb.co/NZcqYk2/shop8.png" },
	{ name: "test-10", logo: "https://i.ibb.co/x3nCPC0/shop1-logo.png", shop: "https://i.ibb.co/841wCL7/shop9.png" },
	{ name: "test-11", logo: "https://i.ibb.co/YTVnDtX/shop10-removebg-preview-1.png", shop: "https://i.ibb.co/2MFhbkb/shop10.png" },
	{ name: "test-12", logo: "https://i.ibb.co/BVVxvkT/shop10.png", shop: "https://i.ibb.co/XzZtjmt/shop11.png" },
	
	{ name: "test-13", logo: "https://i.ibb.co/FVCys6L/shop12-removebg.png", shop: "https://i.ibb.co/QK0gpFG/shop12.png" }

	
];

