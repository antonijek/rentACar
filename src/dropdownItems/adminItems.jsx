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
        <button onClick={() => changeLanguage("en")}>En</button>
        <button onClick={() => changeLanguage("mne")}>Sr</button>
      </div>
    ),
  },
];
