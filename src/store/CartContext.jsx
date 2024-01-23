import { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Define the context
export const CartContext = createContext();

// Define the initial state of the cart
const initialCart = [];

// Define the reducer
const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_ITEM":
			return [...state, action.payload];
		case "REMOVE_ITEM":
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
};

// Define the provider
export const CartProvider = ({ children }) => {
	const [storedCart, setStoredCart] = useLocalStorage("cart", initialCart);
	const [cart, dispatchCart] = useReducer(cartReducer, storedCart);

	useEffect(() => {
		setStoredCart(cart);
	}, [cart, setStoredCart]);

	console.log(cart);

	return (
		<CartContext.Provider value={{ cart, dispatchCart }}>
			{children}
		</CartContext.Provider>
	);
};
