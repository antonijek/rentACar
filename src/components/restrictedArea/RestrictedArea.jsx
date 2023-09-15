import React from "react";
import Button from "../buttons/button/Button";
import classes from "./restrictedArea.module.scss";
import { useTranslation } from "react-i18next";
import logo from "../../../public/logo.png";

export const RestrictedArea = () => {
  const { t } = useTranslation();
  return (
    <div className={classes["container"]}>
      <img src={logo} alt="" className={classes["logo"]} />
      <div>
        <h2>Restricted Area</h2>
        <Button text={t("backToMainPage")} onClick={() => (location = "/")} />
      </div>
    </div>
  );
};
