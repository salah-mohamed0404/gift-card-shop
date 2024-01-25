import { Container, Typography, Grid } from "@mui/material";
import CustomCard from "../../../components/CustomCard";

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

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} key={`${index}-${card.title}`}>
            <CustomCard
              imgUrl={card.imgUrl}
              title={t(`home.cards.${card.title}.title`)}
              description={t(`home.cards.${card.title}.description`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const cards = [
  {
    imgUrl: "/images/home1.png",
    title: "gift",
  },
  {
    imgUrl: "/images/home2.png",
    title: "custom",
  },
];
