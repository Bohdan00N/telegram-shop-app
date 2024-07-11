import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [addedItems, setAddedItems] = useState([]);

  const addItem = (product) => {
    setAddedItems((prevItems) => [...prevItems, product]);
  };

  const removeItem = (productId) => {
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const getTotalPrice = () => {
    return addedItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{ addedItems, addItem, removeItem, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
