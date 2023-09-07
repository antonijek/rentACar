import classes from "./home.module.scss";
import wrapperHoc from "../wraper/wraperHoc.jsx";
import { useTranslation } from "react-i18next";
import AuthHoc from "../authHOC/AuthHoc";
import map from "../../../public/mapCg.png";
import { userData } from "../../context/UserContext";

function Home() {
  const { user } = userData();
  const { t } = useTranslation();
  return (
    <div className={classes["home"]}>
      <h2 className={classes["welcome-msg"]}>{`${t("welcome")} ${
        user.first_name
      }`}</h2>
      <h2 className={classes["happy-customers"]}>{`${t("happyCustomers")}`}</h2>
      <h2 className={classes["fast"]}>{`${t("fast")}`}</h2>
      <h2 className={classes["safe"]}>{`${t("safe")} `}</h2>
      <h2 className={classes["reliable"]}>{`${t("reliable")}`}</h2>
      <div className={classes["red-dot"]}></div>
      <img src={map} alt="" />
    </div>
  );
}

export default AuthHoc(wrapperHoc(Home));
