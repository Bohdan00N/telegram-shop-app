import { useTG } from "../../hooks/useTG";
import css from "./form.module.scss";
import React, { useCallback, useEffect, useState } from "react";

const Form = () => {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTG();

  const onSendData = useCallback(() => {
    const data = {
      city,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [city, street, subject, tg]);

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
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={css.form}>
      <h3>Ваші данні</h3>
      <input
        className={css.input}
        type="text"
        placeholder="Місто"
        value={city}
        onChange={onChangeCity}
      />
      <input
        className={css.input}
        type="text"
        placeholder="Вулиця"
        value={street}
        onChange={onChangeStreet}
      />
      <select
        className={css.select}
        value={subject}
        onChange={onChangeSubject}
        
      >
        <option value="physical">Fiz</option>
        <option value="legal">Yur</option>
      </select>
    </div>
  );
};
export default Form;
