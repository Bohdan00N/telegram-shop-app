import React, { useState } from "react";
import Button from "../Button/Button";
import css from "./productItem.module.scss";

const ProductItem = ({ product, onAdd, onRemove }) => {
  const [quantity, setQuantity] = useState(0);
  const onAddHandler = () => {
    if (quantity === 0) {
      setQuantity(1);
      onAdd(product, 1); // добавляем товар в корзину с количеством 1
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAdd(product, newQuantity); // обновляем количество в корзине
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    if (newQuantity > 0) {
      onAdd(product, newQuantity); // обновляем количество в корзине
    } else {
      onRemove(product.id); // удаляем товар из корзины
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
