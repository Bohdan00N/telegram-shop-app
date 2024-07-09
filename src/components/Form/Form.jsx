import { useTG } from "../../hooks/useTG";
import css from "./form.module.scss";
import React, { useCallback, useEffect, useState } from "react";

const Form = () => {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const { tg } = useTG();

  const onSendData = useCallback(() => {
    const data = {
      city,
      street,
      phone,
    };
    tg.sendData(JSON.stringify(data));
  }, [city, street, phone, tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Відправити",
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (!city || !street) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [city, street, tg.MainButton]);

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div className={css.form}>
      <h3>Ваші данні</h3>
      <select className={css.select} value={phone} onChange={onChangeCity}>
        <option value="Lozova">Лозова</option>
        <option value="Uman">Умань</option>
      </select>

      <input
        className={css.input}
        type="text"
        placeholder="Адреса"
        value={street}
        onChange={onChangeStreet}
      />

      <input
        className={css.input}
        type="number"
        placeholder="Номер телефону"
        value={phone}
        onChange={onChangePhone}
      />
    </div>
  );
};
export default Form;
