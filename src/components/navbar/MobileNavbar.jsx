import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../public/logo2.png";
import { adminItems } from "../../sideBarItems/adminItems";
import classes from "./mobileNavbar.module.scss";
import { get } from "../../services/storageServices";
import { userData } from "../../context/UserContext";
import flagMne from "../../../public/mne-flag.png";
import flagEn from "../../../public/en-flag.png";

import {
  MenuFoldOutlined,
  UserOutlined,
  CloseOutlined,
  LogoutOutlined,
  ReadOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

function Navbar({ changeLanguage }) {
  const [openMenu, setOpenMenu] = useState(false);

  const { i18n, t } = useTranslation();
  const { user, logoutUser } = userData();

  useEffect(() => {
    const preferredLanguage = get("lan");
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, []);

  return (
    <div className={classes["navbar-mobile"]}>
      <img src={logo} className={classes["logo"]} />
      <div
        className={classes["menu-icon"]}
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        {openMenu ? (
          <CloseOutlined style={{ fontSize: "150%" }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: "150%" }} />
        )}
      </div>
      {openMenu && (
        <div className={classes["nav"]}>
          <h2 className={classes["menu-item"]}>
            {<UserOutlined />}
            {` ${user?.first_name}`}
          </h2>
          <hr />
          {user?.role_id === 1
            ? adminItems.map((item) => (
                <div className={classes["menu-item"]}>
                  <Link to={`/${item.label.toLowerCase()}`}>
                    <h2>
                      {item.icon} {t(item.label)}
                    </h2>
                  </Link>
                </div>
              ))
            : null}
          <h2 className={classes["menu-item"]} onClick={() => logoutUser()}>
            {<LogoutOutlined />} {t("logout")}
          </h2>
          <div className={classes["menu-item"]}>
            <ReadOutlined style={{ fontSize: "150%", marginRight: "10px" }} />
            <img
              src={flagEn}
              width="20px"
              height="16px"
              onClick={() => {
                changeLanguage("en");
                setOpenMenu(false);
              }}
            />
            <img
              src={flagMne}
              width="20px"
              height="16px"
              onClick={() => {
                changeLanguage("mne");
                setOpenMenu(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
