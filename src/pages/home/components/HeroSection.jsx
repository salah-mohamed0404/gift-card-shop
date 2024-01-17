import { Typography } from "@mui/material";

export default function HeroSection({ t }) {
	return (
		<header className="relative flex flex-col justify-center items-center gap-4 bg-[url('https://source.unsplash.com/random/1920x1080')] min-h-[90dvh] px-2">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<Typography variant="h2" component="h1" className="text-gray-50 z-10">
				{t("home.hero.title")}
				<span className="text-primary-500"> {t("siteTitle")}</span>
			</Typography>
			<Typography variant="h5" component="p" className="text-gray-200 z-10">
				{t("home.hero.description")}
			</Typography>
		</header>
	);
}
