import { useReducer } from "react";
import { blue } from "tailwindcss/colors";

export const PRICE_LIMITS = {
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
	font: "ARAHAMAH1982",
	price: PRICE_LIMITS.min,
	receiverInfo: {
		name: "",
		phone: "",
	},
};

export const cardSittingActions = {
	SET_COLOR: "SET_COLOR",
	SET_SHAPE: "SET_SHAPE",
	SET_BRAND: "SET_BRAND",
	SET_MESSAGE: "SET_MESSAGE",
	SET_TEXT_COLOR: "SET_TEXT_COLOR",
	SET_FONT: "SET_FONT",
	SET_PRICE: "SET_PRICE",
	SET_RECEIVER_INFO_NAME: "SET_RECEIVER_INFO_NAME",
	SET_RECEIVER_INFO_PHONE: "SET_RECEIVER_INFO_PHONE",
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
		case cardSittingActions.SET_FONT:
			if (action.payload === "default")
				return {
					...state,
					font: "ARAHAMAH1982",
				};
			return {
				...state,
				font: action.payload,
			};
		case cardSittingActions.SET_PRICE:
			return {
				...state,
				price: action.payload,
			};
		case cardSittingActions.SET_RECEIVER_INFO_NAME:
			return {
				...state,
				receiverInfo: {
					...state.receiverInfo,
					name: action.payload,
				},
			};
		case cardSittingActions.SET_RECEIVER_INFO_PHONE:
			return {
				...state,
				receiverInfo: {
					...state.receiverInfo,
					phone: action.payload,
				},
			};
		default:
			return state;
	}
};
