import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../public/logo2.png";
import logo1 from "../../../public/logo.png";
import classes from "./navbar.module.scss";
import DropdownTabs from "../dropdown/DropDown";
import { get } from "../../services/storageServices";
import { userData } from "../../context/UserContext";
import ClientForm from "../forms/ClientForm";
import VehicleForm from "../forms/VehicleForm";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import { clientData } from "../../context/ClientContext";
import { vehicleData } from "../../context/VehicleContext";

function NavbarAdmin({ items, changeLanguage }) {
  const { i18n, t } = useTranslation();
  const { logoutUser } = userData();
  const modal = useModal();
  const { countries, addNew } = clientData();
  const { addVehicle } = vehicleData();
  const navigate = useNavigate();

  const navigateToPage = (page) => {
    navigate(`/${page}`);
  };

  const checkDropdownItems = (item) => {
    if (item.label.props.children === t("newUser")) {
      modal.open(
        <span className={classes["modal-title"]}>{t("addClient")}</span>,
        <ClientForm
          countries={countries}
          addNew={addNew}
          navigateToPage={navigateToPage}
        />,
        {
          showFooter: false,
        }
      );
    }

    if (item.label.props.children === t("newVehicle")) {
      modal.open(
        <span className={classes["modal-title"]}>{t("addvehicle")}</span>,
        <VehicleForm addVehicle={addVehicle} navigateToPage={navigateToPage} />,
        {
          showFooter: false,
        }
      );
    }
    if (item.label.props.children === t("newReservation")) {
      navigate("/reservations/add-reservation");
    }
  };

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
          onItemClick={(item) => checkDropdownItems(item)}
        />
        <h3
          className={classes["logout"]}
          onClick={() => {
            logoutUser();
          }}
        >
          {t("logout")}
        </h3>
      </div>
    </div>
  );
}

function NavbarClient({ items, changeLanguage }) {
  const { i18n, t } = useTranslation();
  const { logoutUser } = userData();

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
        <DropdownTabs changeLanguage={changeLanguage} items={items} />
        <h3
          className={classes["logout"]}
          onClick={() => {
            logoutUser();
          }}
        >
          {t("logout")}
        </h3>
      </div>
    </div>
  );
}
const Navbar = ({ items, changeLanguage }) => {
  const { user } = userData();

  return (
    <div>
      {user?.role_id === 1 ? (
        <NavbarAdmin items={items} changeLanguage={changeLanguage} />
      ) : (
        <NavbarClient items={items} changeLanguage={changeLanguage} />
      )}
    </div>
  );
};
export default Navbar;
