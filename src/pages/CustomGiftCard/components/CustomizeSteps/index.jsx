import { useState } from "react";
import ErrorHandler from "../../../../components/ErrorHandler";
import CustomStepper from "./CustomStepper";
import NavigationBtns from "./NavigationBtns";
import Steps from "./Steps";

export default function CustomizeSteps({
	cardSitting,
	dispatchCardSitting,
	activeStep,
	onActiveStepChange,
}) {
	const [errorMsg, setErrorMsg] = useState("");

	return (
		<ErrorHandler errorMsg={errorMsg} setErrorMsg={setErrorMsg}>
			<div className="flex flex-col gap-9 grow">
				<CustomStepper activeStep={activeStep} />

				<Steps
					cardSitting={cardSitting}
					dispatchCardSitting={dispatchCardSitting}
					activeStep={activeStep}
				/>

				<NavigationBtns
					activeStep={activeStep}
					onActiveStepChange={onActiveStepChange}
					onError={setErrorMsg}
					cardSitting={cardSitting}
				/>
			</div>
		</ErrorHandler>
	);
}
