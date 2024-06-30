import React from 'react';
import Button from "../Button/Button";
import css from './productItem.module.scss';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={css.img}/>
            <div className={css.title}>{product.title}</div>
            <div className={css.description}>{product.description}</div>
            <div className={css.price}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={css.add_btn} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;