import { Typography } from "@mui/material";

export default function BrandStep({ brand, onBrandChange }) {
	return (
		<div className="flex flex-col items-center gap-6">
			<Typography variant="h4" className="capitalize">
				choose card shape
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
							<img src={logo} alt="shape" className="w-32  object-cover" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

const brands = [
	{ name: "test-1", logo: "/images/logo.webp" },
	{ name: "test-2", logo: "/images/logo.webp" },
	{ name: "test-3", logo: "/images/logo.webp" },
	{ name: "test-4", logo: "/images/logo.webp" },
	{ name: "test-5", logo: "/images/logo.webp" },
	{ name: "test-6", logo: "/images/logo.webp" },
	{ name: "test-7", logo: "/images/logo.webp" },
	{ name: "test-8", logo: "/images/logo.webp" },
];
