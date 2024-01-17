import { useTranslation } from "react-i18next";
import CustomCard from "../../../components/CustomCard";

export default function CardsSection() {
	const { t } = useTranslation();

	return (
		<section>
			<div className="flex md:flex-row flex-col gap-24 md:w-3/4 w-4/5 mx-auto px-2">
				{cards.map((card, index) => (
					<CustomCard
						key={`${index}-${card.title}`}
						imgUrl={card.imgUrl}
						title={t(`home.cards.${card.title}.title`)}
						description={t(`home.cards.${card.title}.description`)}
					/>
				))}
			</div>
		</section>
	);
}

const cards = [
	{
		imgUrl: "https://source.unsplash.com/random/1000x900",
		title: "gift",
	},
	{
		imgUrl: "https://source.unsplash.com/random/1000x900",
		title: "custom",
	},
];
