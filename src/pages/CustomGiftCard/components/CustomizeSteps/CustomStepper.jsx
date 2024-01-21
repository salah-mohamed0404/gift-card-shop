import { Step, StepLabel, Stepper } from "@mui/material";

const steps = ["Color", "Shape", "Brand", "Message And Price", "Receiver Info"];

export default function CustomStepper({ activeStep }) {
	return (
		<div className="flex justify-center">
			<Stepper activeStep={activeStep} alternativeLabel className="w-full">
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
}
