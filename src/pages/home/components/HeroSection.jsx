import { Typography } from "@mui/material";

export default function HeroSection() {
	return (
		<header className="relative flex flex-col justify-center items-center gap-4 bg-[url('https://source.unsplash.com/random/1920x1080')] min-h-[90dvh]">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<Typography variant="h1" className="text-gray-50 z-10">
				Welcome to our <span className="text-primary-500">gift card shop</span>
			</Typography>
			<Typography variant="h4" component="p" className="text-gray-200 z-10">
				Get a gift card for your loved ones
			</Typography>
		</header>
	);
}
