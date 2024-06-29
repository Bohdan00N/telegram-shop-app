import React from "react";
import css from './Button.module.scss'

export const Button = (props) => {
  return <button {...props} className={css.button + props.className}></button>;
};
