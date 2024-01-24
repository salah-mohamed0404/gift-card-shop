import { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext();

const cartReducer = (state, action) => {
	const { setStoredCart, payload } = action;

	switch (action.type) {
		case "ADD_ITEM":
			return setStoredCart([...state, payload]);
		case "REMOVE_ITEM":
			return setStoredCart(state.filter((_, index) => index !== payload));
		case "INIT":
			return action.payload;
		default:
			return state;
	}
};

export const CartProvider = ({ children }) => {
	const [storedCart, setStoredCart] = useLocalStorage("cart", []);
	const [cart, dispatch] = useReducer(cartReducer, storedCart);

	useEffect(() => {
		dispatch({ type: "INIT", payload: storedCart });
	}, [storedCart]);

	const dispatchCart = (action) => {
		action.setStoredCart = setStoredCart;
		dispatch(action);
	};

	return (
		<CartContext.Provider value={{ cart, dispatchCart }}>
			{children}
		</CartContext.Provider>
	);
};
