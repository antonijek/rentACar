import React from "react";
import Button from "../buttons/button/Button";
import classes from "./restrictedArea.module.scss";

import logo from "../../../public/logo.png";

export const RestrictedArea = () => {
  return (
    <div className={classes["container"]}>
      <img src={logo} alt="" className={classes["logo"]} />
      <div>
        <h2>Restricted Area</h2>
        <Button text="Back to main page" onClick={() => (location = "/")} />
      </div>
    </div>
  );
};
