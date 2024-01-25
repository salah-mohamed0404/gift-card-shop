import CardPreview from "../../components/CardPreview";
import ReadyCardPreview from "./ReadyCardPreview";

export default function LiveCardPreview({ card, back }) {
	return (
		<>
			{card.color && <CardPreview cardSitting={card} back={back} ShowBrand />}
			{!card.color && <ReadyCardPreview card={card} back={back} />}
		</>
	);
}
