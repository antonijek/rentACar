import React from "react";
import { Button as AntdButton } from "antd";

const Button = ({ text, onClick, className }) => {
  return (
    <AntdButton
      style={{ fontFamily: "var(--main-font-family)" }}
      className={className}
      type="primary"
      onClick={onClick}
    >
      {text}
    </AntdButton>
  );
};

export default Button;
