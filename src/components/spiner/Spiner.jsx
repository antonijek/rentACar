import React from "react";
import { Spin } from "antd";
import classes from "./spiner.module.scss";

const Spiner = () => (
  <div className={classes["spiner"]}>
    <Spin size="large" className={classes["spiner"]} />
  </div>
);
export default Spiner;
