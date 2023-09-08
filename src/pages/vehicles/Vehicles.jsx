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
import { deleteVehicle, getVehicles } from "../../services/vehicleServices";
import Spiner from "../../components/spiner/Spiner";
import VehicleForm from "../../components/forms/VehicleForm";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const modal = useModal();

  const getAllVehicles = async () => {
    setIsLoading(true);
    try {
      const res = await getVehicles();
      setVehicles(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  const searchVehicle = async (query) => {
    setIsLoading(true);
    try {
      const res = await getVehicles(query);
      console.log(res);
      setVehicles(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const handleRowClick = (vehicle) => {
    const disabled = true;
    modal.open(
      t("vehicleInformation"),
      <VehicleForm
        data={vehicle}
        setVehicles={setVehicles}
        disabled={disabled}
      />,
      { showFooter: false }
    );
  };

  const headers = generateVehicleHeaders(t);

  return (
    <div className={classes["vehicle-container"]}>
      <h2 className={classes["title"]}>{t("vehicles")}</h2>
      <SearchAndAdd
        search={searchVehicle}
        placeholder={t("searchByLicensePlate")}
        text={t("addVehicle")}
        onClick={() =>
          modal.open(
            t("addVehicle"),
            <VehicleForm setVehicles={setVehicles} />,
            {
              showFooter: false,
            }
          )
        }
      />
      <Table
        columns={[
          ...headers,
          {
            title: t("actions"),
            dataIndex: null,
            render: (data) => (
              <ActionButtons
                t={t}
                data={data}
                setItems={setVehicles}
                FormComponent={VehicleForm}
                formProps={{ data, setVehicles }}
                getItems={getVehicles}
                deleteItem={deleteVehicle}
              />
            ),
          },
        ]}
        dataSource={vehicles.map((vehicle) => ({
          ...vehicle,
          key: vehicle.id,
        }))}
        onRow={(vehicle) => ({
          onClick: () => handleRowClick(vehicle),
        })}
      />
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(wrapperHoc(Vehicles));
