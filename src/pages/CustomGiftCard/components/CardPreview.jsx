import { Typography } from "@mui/material";

export default function CardPreview({ cardSitting, back }) {
	return (
		<figure
			className="relative w-[30rem] shrink-0 h-72 rounded-2xl shadow-xl overflow-hidden transition-colors"
			style={{ backgroundColor: cardSitting.color }}
		>
			{!back ? (
				<div className="flex justify-end h-full">
					<div className="absolute inset-0">
						{cardSitting.shape ? (
							<img
								src={cardSitting.shape}
								alt="gift card"
								className="w-full h-full object-cover"
							/>
						) : null}
					</div>

					<div className="p-2 h-full z-10">
						{cardSitting.brand.logo ? (
							<img
								src={cardSitting.brand.logo}
								alt={`${cardSitting.brand.name} logo`}
								className="w-40 rounded object-cover"
							/>
						) : null}
					</div>
				</div>
			) : (
				<div
					className="flex flex-col justify-center items-center text-center p-4 gap-2 h-full"
					style={{ color: cardSitting.textColor }}
				>
					<Typography variant="h5" component="p" className="transition-colors">
						{cardSitting.message}
					</Typography>
					<Typography variant="h6" component="p" className="transition-colors">
						{cardSitting.price}
					</Typography>
					<div className="absolute bottom-4 start-4">
						<img src="/images/logo.webp" alt="logo" width={100} />
					</div>
				</div>
			)}
		</figure>
	);
}
