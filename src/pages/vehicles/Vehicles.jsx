import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import classes from "./vehicles.module.scss";
import { useTranslation } from "react-i18next";
import { generateVehicleHeaders } from "../../tableHeaders/vehicleHeaders";
import ActionButtons from "../../components/ActionButtons";
import SearchAndAdd from "../../components/searchAndAdd/SearchAndAdd";
import AuthHoc from "../authHOC/AuthHoc";
import { getAllVehicles } from "../../services/vehicleServices";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const { t } = useTranslation();
  const modal = useModal();

  const getVehicles = async () => {
    try {
      const res = await getAllVehicles();
      console.log(res);
      setVehicles(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const headers = generateVehicleHeaders(t);

  return (
    <div className={classes["vehicle-container"]}>
      <h2 className={classes["title"]}>{t("vehicles")}</h2>
      <SearchAndAdd
        placeholder={t("searchByLicensePlate")}
        text={t("addVehicle")}
      />
      <Table
        columns={[
          ...headers,
          {
            title: t("actions"),
            dataIndex: null,
            render: (data) => <ActionButtons t={t} />,
          },
        ]}
        dataSource={vehicles}
      />
    </div>
  );
};

export default AuthHoc(wrapperHoc(Vehicles));
