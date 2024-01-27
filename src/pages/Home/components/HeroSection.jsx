import { Typography } from "@mui/material";

export default function HeroSection({ t }) {
	return (
		<header className="relative flex flex-col justify-center items-center gap-4 bg-hero-background bg-cover bg-center min-h-[90vh] px-2">
			<div className="absolute inset-0 bg-black opacity-50"></div>

			<div className="bg-secondary-500/75 py-8 px-12 mx-8 rounded-2xl shadow-2xl z-10">
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
		</header>
	);
}
