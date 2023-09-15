import React from "react";
import Button from "../buttons/button/Button";
import classes from "./page404.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";

export const Page404 = () => {
  const navogate = useNavigate();
  return (
    <div className={classes["container"]}>
      <img src={logo} alt="" className={classes["logo"]} />
      <div>
        <h2>Page404</h2>
        <Button text="Back to main page" onClick={() => navogate("/")} />
      </div>
    </div>
  );
};
