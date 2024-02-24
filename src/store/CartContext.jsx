import { createContext, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = [];

export const CartContext = createContext(initialState);

export const CartProvider = ({ children,state }) => {
  const [cart, setCart] = useLocalStorage("cart", initialState);

  const dispatchCart = useCallback(
    (action) => {
      const { type, payload } = action;
      console.log(payload);
      switch (type) {
        case "ADD_ITEM":
          state === true ?
          fetch('http://localhost:3001/api/cartReady/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.items[0]),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            console.log(payload)
            // Update local cart state with the new item
            setCart((prev) => [...prev, payload]);
          })
          .catch(error => {
            console.error('Error adding item:', error);
          }):  
          fetch('http://localhost:3001/api/cartCustom/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            console.log(payload)
            // Update local cart state with the new item
            setCart((prev) => [...prev, payload]);
          })
          .catch(error => {
            console.error('Error adding item:', error);
          })
          break;
        case "REMOVE_ITEM":
          console.log(payload)
          // Assuming payload is the itemId to be removed
          fetch(`http://localhost:3001/api/cart/remove/${cart[payload]._id}`, { method: 'DELETE' })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            // Assuming your server response contains the updated cart items after removal
            // Update local cart state with the updated items from the server
            setCart(carts => carts.filter(cart=> cart._id !== data._id));
          })
          .catch(error => {
            console.error('Error removing item:', error);
          });
          break;
        // Handle other actions as needed
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