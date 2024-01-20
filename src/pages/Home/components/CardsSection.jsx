import { Container, Typography } from "@mui/material";
import CustomCard from "../../../components/CustomCard";
// import giftCardImg from "/assets/card design-04.webp";

export default function CardsSection({ t }) {
	return (
		<Container component="section">
			<Typography
				variant="h3"
				component="h2"
				className="text-primary-700 text-center capitalize !mb-10"
			>
				- <span className="text-gray-700">{t("home.cards.titlePrefix")}</span>{" "}
				{t("home.cards.title")} -
			</Typography>

			<div className="flex md:flex-row flex-col gap-24">
				{cards.map((card, index) => (
					<CustomCard
						key={`${index}-${card.title}`}
						imgUrl={card.imgUrl}
						title={t(`home.cards.${card.title}.title`)}
						description={t(`home.cards.${card.title}.description`)}
					/>
				))}
			</div>
		</Container>
	);
}

const cards = [
	{
		imgUrl: "/images/card design-04.webp",
		title: "gift",
	},
	{
		imgUrl: "/images/card design-05.webp",
		title: "custom",
	},
];
