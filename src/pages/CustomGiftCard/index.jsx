import { useState } from "react";
import CardPreview from "./components/CardPreview";
import CustomizeSteps from "./components/CustomizeSteps";
import useCardSitting from "./hooks/useCardSittingReducer";

export default function CustomGiftCard() {
	const { cardSitting, dispatchCardSitting } = useCardSitting();
	const [activeStep, setActiveStep] = useState(0);

	return (
		<main className="mt-36 mb-28">
			<div className="flex items-center gap-16 w-3/4 mx-auto">
				<CardPreview cardSitting={cardSitting} back={activeStep === 3} />
				<CustomizeSteps
					cardSitting={cardSitting}
					dispatchCardSitting={dispatchCardSitting}
					activeStep={activeStep}
					onActiveStepChange={setActiveStep}
				/>
			</div>
		</main>
	);
}
