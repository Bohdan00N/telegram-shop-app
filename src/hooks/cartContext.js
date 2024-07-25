import React, { createContext, useContext, useState } from "react";

// Создаем контекст для корзины
const CartContext = createContext();

// Хук для использования контекста корзины
export const useCart = () => useContext(CartContext);

// Провайдер корзины
export const CartProvider = ({ children }) => {
  // Состояние для добавленных товаров, каждый товар содержит количество
  const [addedItems, setAddedItems] = useState([]);

  // Функция для добавления товара
  const addItem = (product) => {
    setAddedItems((prevItems) => {
      // Проверяем, есть ли уже этот товар в корзине
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // Если товар уже есть, увеличиваем количество
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Если товара нет, добавляем новый с quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Функция для удаления товара
  const removeItem = (productId) => {
    setAddedItems((prevItems) =>
      prevItems.reduce((result, item) => {
        if (item.id === productId) {
          // Уменьшаем количество, если оно больше 1
          if (item.quantity > 1) {
            result.push({ ...item, quantity: item.quantity - 1 });
          }
          // Если количество 1, товар будет удален
        } else {
          result.push(item);
        }
        return result;
      }, [])
    );
  };

  // Функция для подсчета общей стоимости
  const getTotalPrice = () => {
    return addedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ addedItems, addItem, removeItem, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
