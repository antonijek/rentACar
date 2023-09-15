import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import classes from "./vehicles.module.scss";
import { useTranslation } from "react-i18next";
import ActionButtons from "../../components/ActionButtons";
import SearchAndAdd from "../../components/searchAndAdd/SearchAndAdd";
import AuthHoc from "../authHOC/AuthHoc";
import { deleteVehicle, getVehicles } from "../../services/vehicleServices";
import Spiner from "../../components/spiner/Spiner";
import VehicleForm from "../../components/forms/VehicleForm";
import { vehicleData } from "../../context/VehicleContext";

const Vehicles = () => {
  const modal = useModal();
  const { t } = useTranslation();
  const {
    vehicles,
    setVehicles,
    isLoading,
    searchVehicle,
    handleRowClick,
    headers,
    edit,
    addVehicle,
  } = vehicleData();
  return (
    <div className={classes["vehicle-container"]}>
      <h2 className={classes["title"]}>{t("vehicles")}</h2>
      <SearchAndAdd
        search={searchVehicle}
        placeholder={t("searchByLicensePlate")}
        text={t("addVehicle")}
        onClick={() =>
          modal.open(
            <span className={classes["modal-title"]}>{t("addVehicle")}</span>,
            <VehicleForm setVehicles={setVehicles} addVehicle={addVehicle} />,
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
                formProps={{ data, setVehicles, edit }}
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
          onClick: () =>
            handleRowClick(
              <span className={classes["modal-title"]}>
                {t("vehicleInformation")}
              </span>,
              <VehicleForm
                setVehicles={setVehicles}
                data={vehicle}
                disabled={true}
              />
            ),
        })}
      />
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(wrapperHoc(Vehicles));
