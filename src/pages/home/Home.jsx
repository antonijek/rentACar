import classes from "./home.module.scss";
import wrapperHoc from "../wraper/wraperHoc.jsx";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  return <div className={classes["home"]}>{t("welcome")}</div>;
}

export default wrapperHoc(Home);
