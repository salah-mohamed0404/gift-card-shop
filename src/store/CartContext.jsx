import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = [];

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useLocalStorage("cart", initialState);

	const dispatchCart = useCallback(
		(action) => {
			const { type, payload } = action;
			switch (type) {
				case "ADD_ITEM":
					setCart((prev) => [...prev, payload]);
					break;
				case "REMOVE_ITEM":
					setCart((prev) => prev.filter((_, index) => index !== payload));
					break;
				case "INIT":
					setCart(action.payload);
					break;
			}
		},
		[setCart]
	);

	return (
		<CartContext.Provider value={{ cart, dispatchCart }}>
			{children}
		</CartContext.Provider>
	);
};
