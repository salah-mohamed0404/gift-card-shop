import { Container, Typography, Grid } from "@mui/material";
import CustomCard from "../../../components/CustomCard";

export default function CardsSection({ t}) {
	return (
		<Container component="section">
			<Typography
				variant="h3"
				component="h2"
				className="text-primary-700 text-center md:!text-5xl !text-3xl capitalize !mb-10"
			>
				- <span className="text-gray-700">{t("home.cards.titlePrefix")}</span>{" "}
				{t("home.cards.title")} -
			</Typography>

			<Grid
				container
				spacing={3}
				justifyContent="space-between"
				className="px-8"
			>
				{cards.map((card, index) => (
					<Grid item xs={12} sm={6} key={`${index}-${card.title}  shadow-0`}>
						<CustomCard
				
							title={t(`home.cards.${card.title}.title`)}
							description={t(`home.cards.${card.title}.description`)}
							front={card.front}
							back={card.back}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

const cards = [
	{
		
		title: "gift",
		front: '/images/home2.png',
		back: '/images/home2-back.webp'
       
    },

	{
		title: "custom",
		front: '/images/home1.png',
		back: '/images/home1-back.png'

	},
];
