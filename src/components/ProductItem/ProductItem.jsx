import React, { useState } from "react";
import Button from "../Button/Button";
import css from "./productItem.module.scss";

const ProductItem = ({ product, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const onAddHandler = () => {
    if (quantity === 0) {
      setQuantity(1);
      onAdd(product, 1); 
    } else {
      onAdd(product, quantity);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    onAdd(product, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      onAdd(product, quantity - 1); 
    } else {
      setQuantity(0);
      onAdd(product, 0);
    }
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
      {quantity === 0 ? (
        <Button className={css.add_btn} onClick={onAddHandler}>
          Додати в корзину
        </Button>
      ) : (
        <div className={css.quantity_controls}>
          <button className={css.decrease_btn} onClick={decreaseQuantity}>
            -
          </button>
          <span className={css.quantity}>{quantity}</span>
          <button className={css.increase_btn} onClick={increaseQuantity}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
