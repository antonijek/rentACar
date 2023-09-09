import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../public/logo2.png";
import logo1 from "../../../public/logo.png";
import classes from "./navbar.module.scss";
import DropdownTabs from "../dropdown/DropDown";
import { set, get } from "../../services/storageServices";
import { userData } from "../../context/UserContext";
import ClientForm from "../forms/ClientForm";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";

function Navbar({ items, changeLanguage }) {
  const { i18n, t } = useTranslation();
  const { user, logoutUser } = userData();

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

      <div className={classes["nav"]}>
        <DropdownTabs
          changeLanguage={changeLanguage}
          items={items}
          onItemClick={(item) => {
            modal.open(
              <span className={classes["modal-title"]}>{t("addClient")}</span>,
              <ClientForm setClients={() => {}} />,
              {
                showFooter: false,
              }
            );
          }}
        />
        <h3 className={classes["logout"]} onClick={() => logoutUser()}>
          {t("logout")}
        </h3>
      </div>
    </div>
  );
}

export default Navbar;
