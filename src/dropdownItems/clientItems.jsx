import flagMne from "../../public/mne-flag.png";
import flagEn from "../../public/en-flag.png";

export const generateClientItems = (classes, t, changeLanguage, logoutUser) => [
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
