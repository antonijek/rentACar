import React, { useState } from "react";
import classes from "../../components/navbar/navbar.module.scss";
import { Main } from "../../components/main/Main";
import Navbar from "../../components/navbar/Navbar";
import MobileNavbar from "../../components/navbar/MobileNavbar";
import { generateAdminItems } from "../../dropdownItems/adminItems";
import { generateClientItems } from "../../dropdownItems/clientItems";
import { useTranslation } from "react-i18next";
import { userData } from "../../context/UserContext";
import { set } from "../../services/storageServices";
import Footer from "../../components/footer/Footer";

const wrapperHoc = (Component) => {
  return (props) => {
    const { i18n, t } = useTranslation();
    const { user } = userData();

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      set("lan", lng);
    };
    const dropdownAdminItems = generateAdminItems(classes, t, changeLanguage);

    const dropdownClientItems = generateClientItems(classes, t, changeLanguage);

    return (
      <div>
        {user?.role_id === 1 ? (
          <div>
            <Navbar
              items={dropdownAdminItems}
              changeLanguage={changeLanguage}
            />
            <MobileNavbar changeLanguage={changeLanguage} />
          </div>
        ) : (
          <div>
            <Navbar
              items={dropdownClientItems}
              changeLanguage={changeLanguage}
            />
            <MobileNavbar changeLanguage={changeLanguage} />
          </div>
        )}
        <Main>
          <Component />
        </Main>
        <Footer />
      </div>
    );
  };
};

export default wrapperHoc;
