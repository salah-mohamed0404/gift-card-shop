import { cardSittingActions } from "../../../hooks/useCardSittingReducer";
import BrandStep from "./BrandStep";
import ColorStep from "./ColorStep";
import MessageAndPriceStep from "./MessageAndPriceStep";
import ShapeStep from "./ShapeStep";

export default function Steps({
	cardSitting,
	dispatchCardSitting,
	activeStep,
}) {
	return (
		<div>
			{activeStep === 0 && (
				<ColorStep
					color={cardSitting.color}
					onColorChange={(color) =>
						dispatchCardSitting({
							type: cardSittingActions.SET_COLOR,
							payload: color,
						})
					}
				/>
			)}
			{activeStep === 1 && (
				<ShapeStep
					shape={cardSitting.shape}
					color={cardSitting.color}
					onShapeChange={(shape) =>
						dispatchCardSitting({
							type: cardSittingActions.SET_SHAPE,
							payload: shape,
						})
					}
				/>
			)}
			{activeStep === 2 && (
				<BrandStep
					brand={cardSitting.brand}
					onBrandChange={(brand) =>
						dispatchCardSitting({
							type: cardSittingActions.SET_BRAND,
							payload: brand,
						})
					}
				/>
			)}
			{activeStep === 3 && (
				<MessageAndPriceStep
					message={cardSitting.message}
					price={cardSitting.price}
					onMessageChange={(message) =>
						dispatchCardSitting({
							type: cardSittingActions.SET_MESSAGE,
							payload: message,
						})
					}
					onPriceChange={(price) =>
						dispatchCardSitting({
							type: cardSittingActions.SET_PRICE,
							payload: price,
						})
					}
					onTextColorChange={(textColor) =>
						dispatchCardSitting({
							type: cardSittingActions.SET_TEXT_COLOR,
							payload: textColor,
						})
					}
				/>
			)}
		</div>
	);
}
