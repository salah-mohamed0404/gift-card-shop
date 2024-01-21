import { useReducer } from "react";
import { blue } from "tailwindcss/colors";

const PRICE_LIMITS = {
	min: 100,
	max: 500,
};

export default function useCardSitting() {
	const [cardSitting, dispatchCardSitting] = useReducer(
		cardSittingReducer,
		initialState
	);

	return {
		cardSitting,
		dispatchCardSitting,
	};
}

const initialState = {
	color: blue[500],
	shape: "",
	brand: { name: "", logo: "" },
	message: "Card Description",
	textColor: "white",
	price: PRICE_LIMITS.min,
};

export const cardSittingActions = {
	SET_COLOR: "SET_COLOR",
	SET_SHAPE: "SET_SHAPE",
	SET_BRAND: "SET_BRAND",
	SET_MESSAGE: "SET_MESSAGE",
	SET_TEXT_COLOR: "SET_TEXT_COLOR",
	SET_PRICE: "SET_PRICE",
};

const cardSittingReducer = (state, action) => {
	switch (action.type) {
		case cardSittingActions.SET_COLOR:
			return {
				...state,
				color: action.payload,
			};
		case cardSittingActions.SET_SHAPE:
			return {
				...state,
				shape: action.payload,
			};
		case cardSittingActions.SET_BRAND:
			return {
				...state,
				brand: action.payload,
			};
		case cardSittingActions.SET_MESSAGE:
			return {
				...state,
				message: action.payload,
			};
		case cardSittingActions.SET_TEXT_COLOR:
			return {
				...state,
				textColor: action.payload,
			};
		case cardSittingActions.SET_PRICE:
			if (
				action.payload < PRICE_LIMITS.min ||
				action.payload > PRICE_LIMITS.max
			)
				return state;
			return {
				...state,
				price: action.payload,
			};
		default:
			return state;
	}
};
