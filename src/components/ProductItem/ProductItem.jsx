import React from "react";
import Button from "../Button/Button";
import css from "./productItem.module.scss";

const ProductItem = ({ product, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div className={css.product}>
      <div className={css.imgcont}>
        <img className={css.img} alt="" src={product.image} />
      </div>
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
    </div>
  );
};

export default ProductItem;
