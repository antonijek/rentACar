import React, { useState, useEffect } from "react";
import { getReservations } from "../../services/reservationServices";
import classes from "./reservationsForClients.module.scss";
import Card from "../card/Card";
import AuthHoc from "../../pages/authHOC/AuthHoc";
import { useModal } from "../../context/ModalContext";
import EditReservationForm from "../forms/EditReservationForm";
import { useTranslation } from "react-i18next";
import Spiner from "../../components/spiner/Spiner";

const ReservationsForClients = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modal = useModal();
  const { t } = useTranslation();

  const getAllReservations = async () => {
    setIsLoading(true);
    try {
      const res = await getReservations();
      setReservations(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  console.log(reservations);
  useEffect(() => {
    getAllReservations();
  }, []);

  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.date_from) - new Date(b.date_from)
  );

  return (
    <div style={{ width: "100%" }}>
      <h1 className={classes["title"]}>My reservations</h1>
      <div className={classes["container"]}>
        {sortedReservations.map((card, index) => (
          <div
            className={classes["card"]}
            key={index}
            onClick={() =>
              modal.open(
                <span className={classes["modal-title"]}>
                  {t("reservationInformation")}
                </span>,
                <EditReservationForm
                  data={card}
                  setReservations={setReservations}
                  disabled={true}
                />,
                { showFooter: false }
              )
            }
          >
            <Card
              type={card.vehicle.type}
              plate={card.vehicle.plate_number}
              dateFrom={new Date(card.date_from).toLocaleDateString()}
              dateTo={new Date(card.date_to).toLocaleDateString()}
              location1={card.pickup_location.name}
              location2={card.drop_off_location.name}
              price={card.price}
            />
          </div>
        ))}
      </div>
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(ReservationsForClients);
