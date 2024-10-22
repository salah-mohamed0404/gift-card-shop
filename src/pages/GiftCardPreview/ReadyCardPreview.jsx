import React from "react";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ReadyCardPreview({ card, back }) {
	const { t } = useTranslation();
React.useEffect(() => {
		  console.log(card)
	}, []);

	return (
		<div className="w-[250px]">
			<figure
				className="relative md:w-[30rem] w-full shrink-0  md:h-[240px] h-[180px]  rounded-2xl overflow-hidden transition-colors"
				style={{ backgroundColor: card.color }}
			>
				<img
					src={back ? card.back : card.front}
					alt="card"
					className="w-full object-cover"
				/>
			</figure>

			<div className="flex justify-between items-center w-full px-5 mt-4">
				<h3 className="flex items-center gap-2 text-xl">
					<Avatar
						src={card.brand.logoWithoutBackground}
						alt={card.brand.logoName}
						className="[&_img]:object-contain"
						sx={{ width: 56, height: 56 }}
					/>
					{card.brand.logoName}
				</h3>
				<p className="text-xl">
					{card.price} {t("currency")}
				</p>
			</div>
		</div>
	);
}
