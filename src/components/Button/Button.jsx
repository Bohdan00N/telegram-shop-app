import React from "react";
import css from "./Button.module.scss";

const Button = (props) => {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`${css.button} ${className ? className : ""}`}
    ></button>
  );
};

export default Button