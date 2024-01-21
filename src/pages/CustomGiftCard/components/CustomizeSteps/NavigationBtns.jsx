import {
	AddCircleOutlineRounded,
	ArrowBackIosNewRounded,
	ArrowForwardIosRounded,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

const MAX_STEPS = 4;

export default function NavigationBtns({ activeStep, onActiveStepChange }) {
	const isLastStep = activeStep === MAX_STEPS;

	return (
		<div className="flex justify-between px-4">
			<IconButton
				disabled={activeStep === 0}
				onClick={() => onActiveStepChange(activeStep - 1)}
			>
				<ArrowBackIosNewRounded />
			</IconButton>

			<div>
				{isLastStep && (
					<Button type="button" startIcon={<AddCircleOutlineRounded />}>
						Add to Cart
					</Button>
				)}

				<IconButton
					disabled={isLastStep}
					onClick={() => onActiveStepChange(activeStep + 1)}
				>
					<ArrowForwardIosRounded />
				</IconButton>
			</div>
		</div>
	);
}
