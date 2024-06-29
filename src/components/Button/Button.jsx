import React from "react";
import {button} from './Button.css'

export const Button = (props) => {
  return <button {...props} className={button + props.className}></button>;
};
