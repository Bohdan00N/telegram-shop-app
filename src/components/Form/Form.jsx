import { useTG } from "../../hooks/useTG";
import css from "./form.module.scss";
import React, { useCallback, useEffect, useState } from "react";

const Form = ({ addedItems, getTotalPrice, queryId }) => {
  const [formFilled, setFormFilled] = useState({
    city: "",
    street: "",
    phone: "",
  });
  const { tg } = useTG();

  const onSendData = useCallback(async () => {
    const data = {
      clientData: [formFilled],
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };

    try {
      const response = await fetch("https://naliva.space/order", {
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
    // Установка параметров кнопки в зависимости от заполненности формы
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
      <h3>Ваши данные</h3>
      <select
        className={css.select}
        name="city" // "city" с маленькой буквы
        value={formFilled.city}
        onChange={onChangeField}
      >
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
        type="text" // Изменил на "text" для номера телефона
        placeholder="Номер телефону"
        name="phone"
        value={formFilled.phone}
        onChange={onChangeField}
      />
    </div>
  );
};

export default Form;
