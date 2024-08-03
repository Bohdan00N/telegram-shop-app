import React, { useCallback, useEffect, useState } from "react";
import css from "./productList.module.scss";
import ProductItem from "../ProductItem/ProductItem";
import { useTG } from "../../hooks/useTG";
import { useNavigate } from "react-router-dom";
import { products } from "../utils/products";
import { useCart } from "../../hooks/cartContext";
import Categ from "../utils/Categ";

const ProductList = () => {
  const navigate = useNavigate();
  const { tg } = useTG();
  const { addedItems, addItem, removeItem, getTotalPrice } = useCart();

  const [activeCategory, setActiveCategory] = useState("Усі");

  const onShowForm = useCallback(() => {
    navigate("form");
    tg.MainButton.setParams({
      text: "Перейти до оплати",
    });
  }, [tg, navigate]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onShowForm);
    return () => {
      tg.offEvent("mainButtonClicked", onShowForm);
    };
  }, [onShowForm, tg]);

  useEffect(() => {
    if (addedItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Замовити на суму ${getTotalPrice()} грн`,
      });
    }
  }, [addedItems, getTotalPrice, tg]);

  const onAdd = (product, quantity) => {
    addItem({ ...product, quantity });
  };

  const onRemove = (productId) => {
    removeItem(productId);
  };

  return (
    <div className={css.list}>
      <div>
        <Categ
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />
        <div>
          {products[activeCategory].map((product) => (
            <div key={product.id}>
              <ProductItem
                product={product}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
