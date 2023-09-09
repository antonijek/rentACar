import flagMne from "../../public/mne-flag.png";
import flagEn from "../../public/en-flag.png";

export const generateAdminItems = (classes, t, changeLanguage) => [
  {
    key: "1",
    label: <h3 className={classes["custom-dropdown-item"]}>{t("newUser")}</h3>,
  },
  {
    key: "2",
    label: (
      <h3 className={classes["custom-dropdown-item"]}>{t("newVehicle")}</h3>
    ),
  },
  {
    key: "3",
    label: (
      <h3 className={classes["custom-dropdown-item"]}>{t("newReservation")}</h3>
    ),
  },
  {
    key: "4",
    label: (
      <div>
        <img
          src={flagEn}
          width="20px"
          height="16px"
          onClick={() => changeLanguage("en")}
        />
        <img
          src={flagMne}
          width="20px"
          height="16px"
          onClick={() => changeLanguage("mne")}
        />
      </div>
    ),
  },
];
