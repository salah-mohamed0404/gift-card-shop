import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GiftCardPreview() {
	const { cardId } = useParams();
	const [card, setCard] = useState(null);

	useEffect(() => {
		// TODO: fetch card from API
	}, [cardId]);

	return <main></main>;
}
