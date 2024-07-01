import React, { useState, useCallback, useEffect } from "react";
import css from "./productList.module.scss";
import ProductItem from "../ProductItem/ProductItem";
import { useTG } from "../../hooks/useTG";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: "1",
    title: "Джинсы",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "2",
    title: "Куртка",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "3",
    title: "Джинсы 2",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "4",
    title: "Куртка 8",
    price: 122,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "5",
    title: "Джинсы 3",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "6",
    title: "Куртка 7",
    price: 600,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "7",
    title: "Джинсы 4",
    price: 5500,
    description: "Синего цвета, прямые",
  },
  {
    id: "8",
    title: "Куртка 5",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTG();
  console.log(queryId);

  const onSendData = useCallback(async () => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };

    try {
      const response = await fetch("http://localhost:3001/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send order data");
      }

      navigate("/form");
    } catch (error) {
      console.error("Error sending order data:", error);
    }
  }, [addedItems, navigate, queryId]);

  useEffect(() => {
    console.log("Setting up event listener for mainButtonClicked");
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      console.log("Removing event listener for mainButtonClicked");
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={css.list}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={css.item} />
      ))}
    </div>
  );
};

export default ProductList;
