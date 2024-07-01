import React from "react";
import css from "./Header.module.scss";
import { useTG } from "../../hooks/useTG";

export const Header = () => {
  const { user } = useTG();
  return (
    <div className={css.header}>
      <span className={css.username}>{user?.username}</span>
    </div>
  );
};
