import React, { useState } from "react";
import Button from "../Button/Button";
import css from "./productItem.module.scss";

const ProductItem = ({ product, onAdd }) => {
  const [showPlusOne, setShowPlusOne] = useState(false);

  const onAddHandler = () => {
    onAdd(product);
    setShowPlusOne(true); // Показываем "+1"
    
    // Скрываем "+1" через 1 секунду
    setTimeout(() => {
      setShowPlusOne(false);
    }, 800);
  };

  return (
    <div className={css.product}>
      <div className={css.imgcont}>
        <img className={css.img} alt="" src={product.image} />
      </div>
      <div className={css.details}></div>
      <h2 className={css.title}>{product.title}</h2>
      <h6 className={css.description}>{product.description}</h6>
      <h3 className={css.price}>
        <span>
          Ціна: <b>{product.price}</b> грн
        </span>
      </h3>
      <Button className={css.add_btn} onClick={onAddHandler}>
        Додати в корзину
      </Button>
      {showPlusOne && <span className={css.plus_one}>+1</span>}
    </div>
  );
};

export default ProductItem;
