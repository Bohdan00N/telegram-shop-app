import React from "react";
import header from "./Header.css";
import { Button } from "../Button/Button";
import { useTG } from "../../hooks/useTG";

export const Header = () => {
 const {user, onClose} = useTG();
  return (
    <div className={header}>
      <Button onClick={onClose}>Закрити</Button>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};
