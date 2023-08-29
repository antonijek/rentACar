import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../public/logo2.png";
import logo1 from "../../../public/logo.png";
import classes from "./navbar.module.scss";
import DropdownTabs from "../dropdown/DropDown";
import { set, get } from "../../services/storageServices";
import { userData } from "../../context/UserContext";

function Navbar({ items, changeLanguage }) {
  const { i18n, t } = useTranslation();
  const { user, logout } = userData();

  useEffect(() => {
    const preferredLanguage = get("lan");
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, []);

  return (
    <div className={classes["navbar"]}>
      <img src={logo} className={classes["logo"]} />
      <img src={logo1} className={classes["logo1"]} />
      <h3 className={classes["user-name"]}>{user?.first_name}</h3>
      <div className={classes["nav"]}>
        <DropdownTabs changeLanguage={changeLanguage} items={items} />
        <h3 className={classes["logout"]} onClick={() => logout()}>
          {t("logout")}
        </h3>
      </div>
    </div>
  );
}

export default Navbar;
