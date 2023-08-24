import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../public/logo2.png";
import logo1 from "../../../public/logo.png";
import clases from "./navbar.module.scss";
import DropdownTabs from "../dropdown/DropDown";
import { set, get, exists, clear } from "../../services/storageServices";

function Navbar() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    set("lan", lng);
  };

  useEffect(() => {
    const preferredLanguage = get("lan");
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, []);

  const dropdownItems = [
    {
      key: "1",
      label: <h3>{t("newUser")}</h3>,
    },
    {
      key: "2",
      label: <h3>{t("newVehicle")}</h3>,
    },
    {
      key: "3",
      label: <h3>{t("newReservation")}</h3>,
    },
    {
      key: "4",
      label: (
        <div>
          <button onClick={() => changeLanguage("en")}>En</button>
          <button onClick={() => changeLanguage("mne")}>Sr</button>
        </div>
      ),
    },
  ];

  return (
    <div className={clases["navbar"]}>
      <img src={logo} className={clases["logo"]} />
      <img src={logo1} className={clases["logo1"]} />
      <h3 className={clases["user-name"]}>Ime korisnika</h3>
      <div className={clases["nav"]}>
        <div className={clases["dropdown-container"]}>
          <DropdownTabs changeLanguage={changeLanguage} items={dropdownItems} />
        </div>
        <h3 className={clases["logout"]}>{t("logout")}</h3>
      </div>
    </div>
  );
}

export default Navbar;
