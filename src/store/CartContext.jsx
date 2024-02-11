import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = [];

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useLocalStorage("cart", initialState);
    
const dispatchCart = useCallback(
  (action) => {
    const { type, payload } = action;
	console.log(payload)
    switch (type) {
      case "ADD_ITEM":
        fetch('http://localhost:3001/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
          // Update local cart state if needed or re-fetch cart data
	  	setCart((prev) => [...prev, payload]);
        })
        .catch(error => {
          console.error('Error adding item:', error);
        });
        break;
      case "REMOVE_ITEM":
        fetch(`http://localhost:3001/api/cart/remove/${payload}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
        	setCart((prev) => prev.filter((_, index) => index !== payload));

        })
        .catch(error => {
          console.error('Error removing item:', error);
        });
        break;
      // Handle other actions like INIT with respective API calls
    }
  },
  []

		[setCart]
	);

	return (
		<CartContext.Provider value={{ cart, dispatchCart }}>
			{children}
		</CartContext.Provider>
	);
};
