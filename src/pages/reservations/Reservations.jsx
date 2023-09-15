import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import Table from "../../components/table/Table";
import classes from "./reservations.module.scss";
import { useTranslation } from "react-i18next";
import ActionButtons from "../../components/ActionButtons";
import AuthHoc from "../authHOC/AuthHoc";
import { useNavigate } from "react-router-dom";
import {
  deleteReservation,
  getReservations,
} from "../../services/reservationServices";
import Spiner from "../../components/spiner/Spiner";
import EditReservationForm from "../../components/forms/EditReservationForm";
import Button from "../../components/buttons/button/Button";
import DateRange from "../../components/dateRange/DateRange";
import { formattingReservations } from "../../utils/utils";
import { reservationData } from "../../context/ReservationContext";

const Reservations = () => {
  const {
    headers,
    searchReservation,
    setReservations,
    reservations,
    handleRowClick,
    isLoading,
    clients,
    cities,
    editingReservation,
    getAllReservations,
    getCities,
    getClients,
  } = reservationData();
  const [dateString, setDateString] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    getCities();
    getClients();
    getAllReservations();
  }, []);

  const onChange = (value, dateString) => {
    setDateString(`date_from=${dateString[0]}&date_to=${dateString[1]}`);
  };

  return (
    <div className={classes["reservations-container"]}>
      <h2 className={classes["title"]}>{t("reservations")}</h2>
      <div className={classes["new-reservation"]}>
        <div className={classes["search-reservation-container"]}>
          <DateRange onChange={onChange} />
          <Button
            text={t("search")}
            className={classes["btn-search"]}
            onClick={() => searchReservation(dateString)}
          />
        </div>

        <Button
          text={t("addReservation")}
          onClick={() => navigate("/reservations/add-reservation")}
        />
      </div>

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
                setItems={setReservations}
                FormComponent={EditReservationForm}
                formProps={{
                  data,
                  setReservations,
                  cities,
                  editingReservation,
                  clients,
                }}
                getItems={getReservations}
                deleteItem={deleteReservation}
              />
            ),
          },
        ]}
        dataSource={formattingReservations(reservations)}
        onRow={(reservation) => ({
          onClick: () =>
            handleRowClick(
              <span className={classes["modal-title"]}>
                {t("reservationInformation")}
              </span>,
              <EditReservationForm
                setReservations={setReservations}
                data={reservation}
                disabled={true}
                cities={cities}
              />
            ),
        })}
      />
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(wrapperHoc(Reservations));
