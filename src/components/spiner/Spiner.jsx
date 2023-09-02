import React from "react";
import { Spin } from "antd";
import classes from "./spiner.module.scss";

const Spiner = () => (
  <div className={classes["spiner"]}>
    <Spin size="large" />
  </div>
);
export default Spiner;
