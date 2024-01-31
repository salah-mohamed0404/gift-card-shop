import { Avatar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CardPreview({ cardSitting, back, ShowBrand }) {
	const { t } = useTranslation();
	const fontClassName =
		cardSitting.font === "Noto Sans Arabic"
			? "!font-notoSansArabic"
			: cardSitting.font === "Amiri"
			? "!font-amiri"
			: cardSitting.font === "Cairo"
			? "!font-cairo"
			: "";

	return (
		<div className="w-full lg:w-[30rem] sm:px-[32px]   ">
			<figure
				className="relative md:w-[30rem] w-full h-full shrink-0   rounded-2xl  overflow-hidden transition-colors"
				style={{ backgroundColor: cardSitting.color }}
			>                   
			
				<div  className={'md:h-[290px] h-[180px]' } style={{ position: 'relative', width: '100%', paddingBottom: '50%',maxWidth: '480px' }}> 
				{!back ? (
					<>
						<div className="absolute h-full w-full">
							{cardSitting.shape ? (
								<img
									src={cardSitting.shape}
									alt="gift card"
										className="rounded-2xl object-cover transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
								/>
							) : null}
						</div>

						<div className="absolute top-2 right-2 z-10">
							{cardSitting.brand.logo ? (
								<img
									src={cardSitting.brand.logo}
									alt={`${cardSitting.brand.name} logo`}
										className="rounded-2xl object-cover transition duration-500 group-hover:opacity-0 group-hover:scale-75 z-10"
								/>
							) : null}
						</div>
						
					</>
				) : (
					<div
						className="flex flex-col justify-center items-center text-center mt-[32px] p-4 gap-2 h-full"
						style={{ color: cardSitting.textColor }}
					>
						<Typography
							variant="h5"
							component="p"
							className={`${fontClassName} transition-colors`}
						>
							{cardSitting.message}
						</Typography>
						<Typography
							variant="h6"
							component="p"
							className={`${fontClassName} transition-colors`}
						>
							{cardSitting.price} {t("currency")}
						</Typography>
						<div className="absolute bottom-4 left-4">
							<img src="/images/logo.webp" alt="logo" width={100} />
						</div>
					</div>
				)}
				</div>
			</figure>

			{ShowBrand && (
				<div className="flex justify-between items-center w-full px-5 mt-4">
					<h3 className="flex items-center gap-2 text-xl">
						<Avatar
							src={cardSitting.brand.logo}
							alt={cardSitting.brand.name}
							className="[&_img]:object-contain"
							sx={{ width: 56, height: 56 }}
						/>
						{cardSitting.brand.name}
					</h3>
					<p className="text-xl">
						{cardSitting.price} {t("currency")}
					</p>
				</div>
			)}
		</div>
	);
}
