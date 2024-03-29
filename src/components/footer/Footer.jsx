import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import classes from "./footer.module.scss";
import { get } from "../../services/storageServices";

import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

function Footer() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const preferredLanguage = get("lan");
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage);
    }
  }, []);

  return (
    <div className={classes["footer"]}>
      <div className={classes["footer-content"]}>
        <div className={classes["copyright"]}>
          &copy; 2023 Rent A Car. {t("allRightsReserved")}
        </div>
        <div className={classes["contact-info"]}>
          {t("contactUs")}: contact@rentacar.com
        </div>
        <div className={classes["social-media"]}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterOutlined />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlined />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
