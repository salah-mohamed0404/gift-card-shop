import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import LiveCardPreview from "./LiveCardPreview";

export default function GiftCardPreview() {
	const { cardId } = useParams();
	const { t } = useTranslation();
	const [card, setCard] = useState(customCard);
	const [activeTab, setActiveTab] = useState(0);

	const handleActiveTabChange = (_, newValue) => {
		setActiveTab(newValue);
	};

	useEffect(() => {
		// TODO: fetch card from API
	}, [cardId]);

	return (
		<div
			component="main"
			className="flex flex-col justify-center items-center gap-12 px-2 h-[95dvh]"
		>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={activeTab}
					onChange={handleActiveTabChange}
					aria-label="basic tabs example"
				>
					<Tab label={t("preview.front")} />
					<Tab label={t("preview.back")} />
				</Tabs>
			</Box>

			<LiveCardPreview card={card} back={activeTab === 1} />
		</div>
	);
}

const customCard = {
	color: "#000000",
	shape: "",
	brand: { name: "test", logo: "/images/logo.webp" },
	message: "Card Description",
	textColor: "white",
	price: 100,
	receiverInfo: {
		name: "",
		phone: "",
	},
};
const readyCard = {
	front: "https://source.unsplash.com/random/1200x800",
	back: "https://source.unsplash.com/random/1200x900",
	brand: { name: "test", logo: "/images/logo.webp" },
	price: 100,
};
