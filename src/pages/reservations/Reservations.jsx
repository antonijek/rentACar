import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import classes from "./reservations.module.scss";
import { useTranslation } from "react-i18next";
import { generateReservationHeaders } from "../../tableHeaders/reservationHeaders";
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

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [dateString, setDateString] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const modal = useModal();
  const navigate = useNavigate();

  const getAllReservations = async () => {
    setIsLoading(true);
    try {
      const res = await getReservations();
      console.log(res);
      setReservations(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  const searchReservation = async (query) => {
    setIsLoading(true);
    try {
      const res = await getReservations(query);

      setReservations(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const handleRowClick = (reservation) => {
    const disabled = true;
    modal.open(
      <span className={classes["modal-title"]}>
        {t("reservationInformation")}
      </span>,
      <EditReservationForm
        data={reservation}
        setReservations={setReservations}
        disabled={disabled}
      />,
      { showFooter: false }
    );
  };
  const onChange = (value, dateString) => {
    setDateString(`date_from=${dateString[0]}&date_to=${dateString[1]}`);
  };

  const headers = generateReservationHeaders(t);

  return (
    <div className={classes["reservations-container"]}>
      <h2 className={classes["title"]}>{t("reservations")}</h2>
      <div className={classes["btn-new-reservation"]}>
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
                formProps={{ data, setReservations }}
                getItems={getReservations}
                deleteItem={deleteReservation}
              />
            ),
          },
        ]}
        dataSource={reservations}
        onRow={(reservation) => ({
          onClick: () => handleRowClick(reservation),
        })}
      />
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(wrapperHoc(Reservations));
