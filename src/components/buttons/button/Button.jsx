import React from "react";
import classes from "./button.module.scss";
import { Button as AntdButton } from "antd";

const Button = ({ text, onClick, className }) => {
  return (
    <AntdButton className={className} type="primary" onClick={onClick}>
      {text}
    </AntdButton>
  );
};

export default Button;
