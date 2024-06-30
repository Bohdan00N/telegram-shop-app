import { useTG } from "../../hooks/useTG";
import css from "./form.module.scss";
import React, { useEffect, useState } from "react";

export const Form = () => {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTG();

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
        name=""
        id=""
      >
        <option value="physical">Fiz</option>
        <option value="legal">Yur</option>
      </select>
    </div>
  );
};
