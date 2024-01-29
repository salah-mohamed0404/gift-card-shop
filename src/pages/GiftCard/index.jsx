import { useTranslation } from "react-i18next";
import CardItem from "./CardItem";
import CardPagination from "./CardPagination";
import CardFilters from "./CardFilters";

export default function GiftCard() {
	const { t } = useTranslation();

	return (
		<main className="mt-40 md:mb-14 mb-12">
			<div className="w-3/4 mx-auto">
				<h1 className="md:text-4xl text-2xl font-medium text-center mb-20">
					<span className="text-primary-500">{t("readyCards.title")}</span>{" "}
					{t("readyCards.titleSuffix")}
				</h1>

				<div className="flex justify-between items-center mb-6 pb-2 border-b-2 text-lg">
					<p>{t("readyCards.results", { count: cards.length })}</p>
					<CardFilters t={t} />
				</div>

				<ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-6">
					{cards.map((card, index) => (
						<li key={`${card.brand}-${index}`}>
							<CardItem card={card} t={t} />
						</li>
					))}
				</ul>

				<div className="grid place-content-center mt-20">
					<CardPagination />
				</div>
			</div>
		</main>
	);
}

const cards = [
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop1.png" },
		price: 100,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop.png" },
		price: 200,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop2.png" },
		price: 300,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop3.png" },
		price: 200,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop4.png" },
		price: 100,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop5.png" },
		price: 300,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop6.png" },
		price: 300,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logo1.webp" },
		price: 200,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop5.png" },
		price: 300,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logos/shop6.png" },
		price: 300,
	},
	{
		front: "/images/front.png",
		back: "/images/back.png",
		brand: { name: "test", logo: "/images/logo1.webp" },
		price: 200,
	},
];
