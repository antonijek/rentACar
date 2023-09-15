import React from "react";
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

    const dropdownItems =
      user?.role_id === 1
        ? generateAdminItems(classes, t, changeLanguage)
        : generateClientItems(changeLanguage);

    return (
      <div>
        <Navbar items={dropdownItems} changeLanguage={changeLanguage} />

        <MobileNavbar changeLanguage={changeLanguage} />
        <Main>
          <Component />
        </Main>
        <Footer />
      </div>
    );
  };
};

export default wrapperHoc;
