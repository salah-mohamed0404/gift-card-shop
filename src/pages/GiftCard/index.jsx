import { useTranslation } from "react-i18next";
import CardItem from "./CardItem";

export default function GiftCard() {
	const { t } = useTranslation();

	return (
		<main className="mt-40 md:mb-28 mb-16">
			<div className="w-3/4 mx-auto">
				<h1 className="text-4xl font-medium text-center mb-20">
					<span className="text-primary-500">{t("readyCards.title")}</span>{" "}
					{t("readyCards.titleSuffix")}
				</h1>

				<div>
					<div className="flex justify-between items-center mb-6 pb-2 border-b-2 text-lg">
						<p>{t("readyCards.results", { count: cards.length })}</p>
					</div>
					<ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-6">
						{cards.map((card, index) => (
							<li key={`${card.brand}-${index}`}>
								<CardItem card={card} t={t} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}

const cards = [
	{
		front: "https://source.unsplash.com/random/1200x800",
		back: "https://source.unsplash.com/random/1200x900",
		brand: { name: "test", logo: "/images/logo.webp" },
		price: 100,
	},
	{
		front: "https://source.unsplash.com/random/1200x800",
		back: "https://source.unsplash.com/random/1200x900",
		brand: { name: "test", logo: "/images/logo.webp" },
		price: 100,
	},
	{
		front: "https://source.unsplash.com/random/1200x800",
		back: "https://source.unsplash.com/random/1200x900",
		brand: { name: "test", logo: "/images/logo.webp" },
		price: 100,
	},
	{
		front: "https://source.unsplash.com/random/1200x800",
		back: "https://source.unsplash.com/random/1200x900",
		brand: { name: "test", logo: "/images/logo.webp" },
		price: 100,
	},
	{
		front: "https://source.unsplash.com/random/1200x800",
		back: "https://source.unsplash.com/random/1200x900",
		brand: { name: "test", logo: "/images/logo.webp" },
		price: 100,
	},
	{
		front: "https://source.unsplash.com/random/1200x800",
		back: "https://source.unsplash.com/random/1200x900",
		brand: { name: "test", logo: "/images/logo.webp" },
		price: 100,
	},
	{
		front: "https://source.unsplash.com/random/1200x800",
		back: "https://source.unsplash.com/random/1200x900",
		brand: { name: "test", logo: "/images/logo.webp" },
		price: 100,
	},
	{
		front: "https://source.unsplash.com/random/1200x800",
		back: "https://source.unsplash.com/random/1200x900",
		brand: { name: "test", logo: "/images/logo.webp" },
		price: 100,
	},
];