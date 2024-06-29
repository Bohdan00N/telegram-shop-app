import React from "react";
import css from "./Header.module.scss";
import { Button } from "../Button/Button";
import { useTG } from "../../hooks/useTG";

export const Header = () => {
  const { user, onClose } = useTG();
  return (
    <div className={css.header}>
      <Button onClick={onClose}>Закрити</Button>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};
