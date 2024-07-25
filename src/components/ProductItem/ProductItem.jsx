import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import css from "./productItem.module.scss";

const ProductItem = ({ product, onAdd, onRemove }) => {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    if (quantity > 0) {
      onAdd(product, quantity);
    } else {
      onRemove(product.id);
    }
  }, [quantity, onAdd, onRemove, product]);

  const onAddHandler = () => {
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      } else {
        return 0;
      }
    });
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
