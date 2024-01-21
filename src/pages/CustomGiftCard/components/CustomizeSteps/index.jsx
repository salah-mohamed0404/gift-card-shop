import CustomStepper from "./CustomStepper";
import NavigationBtns from "./NavigationBtns";
import Steps from "./Steps";

export default function CustomizeSteps({
	cardSitting,
	dispatchCardSitting,
	activeStep,
	onActiveStepChange,
}) {
	return (
		<div className="flex flex-col gap-8 grow">
			<CustomStepper activeStep={activeStep} />

			<Steps
				cardSitting={cardSitting}
				dispatchCardSitting={dispatchCardSitting}
				activeStep={activeStep}
			/>

			<NavigationBtns
				activeStep={activeStep}
				onActiveStepChange={onActiveStepChange}
			/>
		</div>
	);
}
