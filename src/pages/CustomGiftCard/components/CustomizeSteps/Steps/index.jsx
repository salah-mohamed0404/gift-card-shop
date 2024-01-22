import { useTranslation } from "react-i18next";
import { cardSittingActions } from "../../../hooks/useCardSittingReducer";
import BrandStep from "./BrandStep";
import ColorStep from "./ColorStep";
import MessageAndPriceStep from "./MessageAndPriceStep";
import ReceiverInfoStep from "./ReceiverInfoStep";
import ShapeStep from "./ShapeStep";

export default function Steps({
	cardSitting,
	dispatchCardSitting,
	activeStep,
}) {
	const { t } = useTranslation();

	return (
		<div>
			{activeStep === 0 && (
				<ColorStep
					t={t}
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
					t={t}
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
					t={t}
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
					t={t}
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
			{activeStep === 4 && (
				<ReceiverInfoStep
					t={t}
					name={cardSitting.receiverInfo.name}
					phone={cardSitting.receiverInfo.phone}
					onNameChange={(name) =>
						dispatchCardSitting({
							type: cardSittingActions.SET_RECEIVER_INFO_NAME,
							payload: name,
						})
					}
					onPhoneChange={(phone) =>
						dispatchCardSitting({
							type: cardSittingActions.SET_RECEIVER_INFO_PHONE,
							payload: phone,
						})
					}
				/>
			)}
		</div>
	);
}
