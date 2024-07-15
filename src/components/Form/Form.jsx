import { useTG } from "../../hooks/useTG";
import css from "./form.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../../hooks/cartContext";

const Form = () => {
  const [formFilled, setFormFilled] = useState({
    city: "",
    street: "",
    phone: "",
  });
  const { tg, queryId } = useTG();
  const { addedItems, getTotalPrice } = useCart();

  const onSendData = useCallback(async () => {
    const data = {
      clientData: [formFilled],
      products: addedItems,
      totalPrice: getTotalPrice(),
      queryId,
    };

    try {
      const response = await fetch(
        "https://localhost:3001/order"
        , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send order data");
      }
    } catch (error) {
      console.error("Error sending order data:", error);
    }
  }, [addedItems, formFilled, getTotalPrice, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    if (formFilled.city && formFilled.street && formFilled.phone) {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: "Зробити замовлення",
      });
    } else {
      tg.MainButton.hide();
    }
  }, [formFilled, tg.MainButton]);

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setFormFilled((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={css.form}>
      <h3>Дані замовлення</h3>
      <select
        className={css.select}
        name="city" 
        value={formFilled.city}
        onChange={onChangeField}
      >
        <option value=""></option>
        <option value="Lozova">Лозова</option>
        <option value="Uman">Умань</option>
      </select>

      <input
        className={css.input}
        type="text"
        placeholder="Адреса"
        name="street"
        value={formFilled.street}
        onChange={onChangeField}
      />

      <input
        className={css.input}
        type="tel" 
        placeholder="Номер телефону"
        name="phone"
        value={formFilled.phone}
        onChange={onChangeField}
      />
    </div>
  );
};

export default Form;
