import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [addedItems, setAddedItems] = useState([]);

  const addItem = (product) => {
    setAddedItems((prevItems) => {
      // Проверяем, есть ли уже этот товар в корзине
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Если товар уже есть, обновляем его количество
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: product.quantity } : item
        );
      } else {
        // Если товара нет, добавляем новый с quantity
        return [...prevItems, { ...product, quantity: product.quantity }];
      }
    });
  };

  const removeItem = (productId) => {
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
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
