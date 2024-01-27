import { useState } from "react";
import ErrorHandler from "../../../../components/ErrorHandler";
import CustomStepper from "./CustomStepper";
import NavigationBtns from "./NavigationBtns";
import Steps from "./Steps";
import SuccessHandler from "../../../../components/SuccessHandler";

export default function CustomizeSteps({
	cardSitting,
	dispatchCardSitting,
	activeStep,
	onActiveStepChange,
}) {
	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	return (
		<SuccessHandler successMsg={successMsg} setSuccessMsg={setSuccessMsg}>
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
						onSuccess={setSuccessMsg}
						cardSitting={cardSitting}
					/>
				</div>
			</ErrorHandler>
		</SuccessHandler>
	);
}
