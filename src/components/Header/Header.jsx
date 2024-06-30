import React from "react";
import css from "./Header.module.scss";
import { useTG } from "../../hooks/useTG";

export const Header = () => {
  const { user, onClose } = useTG();
  return (
    <div className={css.header}>
      <button onClick={onClose}>Закрити</button>
      <span className={css.username}>{user?.username}</span>
    </div>
  );
};
