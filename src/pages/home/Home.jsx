import classes from "./home.module.scss";
import wrapperHoc from "../wraper/wraperHoc.jsx";
import { useTranslation } from "react-i18next";
import AuthHoc from "../authHOC/AuthHoc";
import map from "../../../public/mapCg.png";
import { userData } from "../../context/UserContext";
import car from "../../../public/car.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = userData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={classes["home"]}>
      <div>
        <h2 className={classes["welcome-msg"]}>{`${t("welcome")} ${
          user.first_name
        }`}</h2>
        <h2 className={classes["happy-customers"]}>{`${t(
          "happyCustomers"
        )}`}</h2>
      </div>

      <div className={classes["map-container"]}>
        <img src={map} alt="" className={classes["map"]} />
        <div>
          <img src={car} alt="" className={classes["car"]} />
        </div>
      </div>
    </div>
  );
}

export default AuthHoc(wrapperHoc(Home));
