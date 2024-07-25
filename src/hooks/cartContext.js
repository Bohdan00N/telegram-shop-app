import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [addedItems, setAddedItems] = useState([]);

  const addItem = (product) => {
    setAddedItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId) => {
    setAddedItems((prevItems) =>
      prevItems.reduce((result, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            result.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          result.push(item);
        }
        return result;
      }, [])
    );
  };

  const getTotalPrice = () => {
    return addedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ addedItems, addItem, removeItem, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
