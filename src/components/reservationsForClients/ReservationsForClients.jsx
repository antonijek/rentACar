import classes from "./reservationsForClients.module.scss";
import Card from "../card/Card";
import AuthHoc from "../../pages/authHOC/AuthHoc";
import { useModal } from "../../context/ModalContext";
import EditReservationForm from "../forms/EditReservationForm";
import { useTranslation } from "react-i18next";
import Spiner from "../../components/spiner/Spiner";
import useReservations from "../../hooks/useReservations";

const ReservationsForClients = ({ activeItem }) => {
  const modal = useModal();
  const { t } = useTranslation();
  const { isLoading, reservations } = useReservations(activeItem);

  return (
    <div className={classes["reservationsWrapper"]}>
      <h1 className={classes["title"]}>{t("myReservations")}</h1>
      <div className={classes["container"]}>
        {reservations
          ?.sort((a, b) => new Date(a.date_from) - new Date(b.date_from))
          .map((card, index) => (
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
                    disabled={true}
                    customer={false}
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
