import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import classes from "../vehicles/vehicles.module.scss";
import { useTranslation } from "react-i18next";
import { generateVehicleHeaders } from "../../tableHeaders/vehicleForReservationHeader";
import ActionButtons from "../../components/ActionButtons";
import Button from "../../components/buttons/button/Button";
import AuthHoc from "../authHOC/AuthHoc";
import { deleteVehicle, getVehicles } from "../../services/vehicleServices";
import Spiner from "../../components/spiner/Spiner";
import VehicleForm from "../../components/forms/VehicleForm";
import AddReservationForm from "../../components/forms/AddReservationForm";
import { useNavigate } from "react-router-dom";
import DateRange from "../../components/dateRange/DateRange";
import { reservationData } from "../../context/ReservationContext";
import { vehicleData } from "../../context/VehicleContext";

const AddReservation = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const { t } = useTranslation();
  const modal = useModal();
  const navigate = useNavigate();
  const { clients, cities, addReservation } = reservationData();

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
    console.log(query);
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

  const navigatePage = () => {
    navigate("/reservations");
  };

  const handleRowClick = (vehicle) => {
    const disabled = false;
    modal.open(
      <span className={classes["modal-title"]}>{t("addReservation")}</span>,

      <AddReservationForm
        clients={clients}
        addReservation={addReservation}
        cities={cities}
        navigatePage={navigatePage}
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
      <h2 className={classes["title"]}>{t("chooseVehicles")}</h2>
      <div className={classes["search-vehicle-container"]}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className={classes["search-vehicle"]}
          placeholder={t("search")}
        />
        <Button
          text={t("search")}
          className={classes["btn-search"]}
          onClick={() => searchVehicle(query)}
        />
      </div>
      <Table
        columns={headers}
        dataSource={vehicles}
        onRow={(vehicle) => ({
          onClick: () => handleRowClick(vehicle),
        })}
      />
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(wrapperHoc(AddReservation));
