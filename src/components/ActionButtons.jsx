import React from "react";
import Button from "../components/buttons/button/Button";
import classes from "../components/table/table.module.scss";

const ActionButtons = ({ t }) => (
  <div className={classes["action-buttons"]}>
    <Button
      className={classes["blue-button"]}
      onClick={() => {}}
      text={t("edit")}
    />
    <Button
      className={classes["red-button"]}
      text={t("delete")}
      onClick={() => {}}
    />
  </div>
);

export default ActionButtons;
