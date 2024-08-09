import { useTG } from "../../hooks/useTG";
import css from "./form.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../../hooks/cartContext";

const Form = () => {
  const [formFilled, setFormFilled] = useState({
    city: "",
    delivery: "",
    street: "",
    phone: "",
    time: "",
    desiredTime: "",
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
    if (
      formFilled.city &&
      formFilled.street &&
      formFilled.phone &&
      formFilled.delivery &&
      formFilled.time
    ) {
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

  const isTimeValid = () => {
    if (formFilled.time === "select" && formFilled.desiredTime) {
      const [hours, minutes] = formFilled.desiredTime.split(":").map(Number);
      return (
        (hours > 10 || (hours === 10 && minutes >= 0)) &&
        (hours < 22 || (hours === 22 && minutes === 0))
      );
    }
    return true;
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
        <option value="" disabled>
          Оберіть місто
        </option>
        <option value="Lozova">Лозова</option>
        <option value="Uman">Умань</option>
      </select>

      <select
        className={css.select}
        name="delivery"
        value={formFilled.delivery}
        onChange={onChangeField}
      >
        <option value="" disabled>
          Спосіб доставки
        </option>
        <option value="cafe">Самовивіз</option>
        <option value="del">Доставка</option>
      </select>

      {formFilled.delivery === "del" && (
        <>
          <input
            className={css.input}
            type="text"
            placeholder="Адреса"
            name="street"
            value={formFilled.street}
            onChange={onChangeField}
          />
        </>
      )}

      <input
        className={css.input}
        type="tel"
        placeholder="Номер телефону"
        name="phone"
        value={formFilled.phone}
        onChange={onChangeField}
      />
      
      <select
        className={css.select}
        name="time"
        value={formFilled.time}
        onChange={onChangeField}
      >
        <option value="" disabled>
          Виберіть бажаний час отримання
        </option>
        <option value="asap">Як можна раніше</option>
        <option value="select">Вибрати час самостійно</option>
      </select>

      {formFilled.time === "select" && (
        <input
          className={css.input}
          type="time"
          placeholder="Введіть час"
          name="desiredTime"
          onChange={onChangeField}
          max="22:00"
          min="10:00"
          value={formFilled.desiredTime}
        />
      )}
      
      {formFilled.time === "select" && !isTimeValid() && (
        <div className={css.error}>
          Ми працюэмо з 10:00 до 22:00. Будь ласка, виберіть коректний час.
        </div>
      )}
    </div>
  );
};

export default Form;
