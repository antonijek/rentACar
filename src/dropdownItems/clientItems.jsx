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
        <button onClick={() => changeLanguage("en")}>En</button>
        <button onClick={() => changeLanguage("mne")}>Sr</button>
      </div>
    ),
  },
];
