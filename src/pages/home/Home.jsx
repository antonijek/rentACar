import classes from "./home.module.scss";
import wrapperHoc from "../wraper/wraperHoc.jsx";
import { useTranslation } from "react-i18next";
import AuthHoc from "../authHOC/AuthHoc";
import map from "../../../public/mapCg.png";
import { userData } from "../../context/UserContext";
import car from "../../../public/car.png";

function Home() {
  const { user } = userData();
  const { t } = useTranslation();
  return (
    <div className={classes["home"]}>
      <h2 className={classes["welcome-msg"]}>{`${t("welcome")} ${
        user.first_name
      }`}</h2>
      <h2 className={classes["happy-customers"]}>{`${t("happyCustomers")}`}</h2>

      <img src={car} alt="" width="10%" className={classes["car"]} />
      <img src={map} alt="" width="70%" style={{ marginTop: "10%" }} />
    </div>
  );
}

export default AuthHoc(wrapperHoc(Home));
