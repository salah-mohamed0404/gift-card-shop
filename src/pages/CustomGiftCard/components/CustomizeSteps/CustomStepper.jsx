import { Step, StepLabel, Stepper } from "@mui/material";
import { useTranslation } from "react-i18next";

const steps = ["color", "shape", "brand", "message", "receiverInfo"];

export default function CustomStepper({ activeStep }) {
	const { t } = useTranslation();

	return (
		<div className="flex justify-center">
			<Stepper
				activeStep={activeStep}
				alternativeLabel
				className="w-full"
				sx={{
					"& .MuiStepConnector-root": {
						insetInlineStart: "calc(-50% + 20px)",
						insetInlineEnd: "calc(50% + 20px)",
					},
				}}
			>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{t(`customCard.steps.${label}`)}</StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
}
