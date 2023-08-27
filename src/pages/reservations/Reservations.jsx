import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import classes from "./reservations.module.scss";
import { useTranslation } from "react-i18next";
import { generateReservationHeaders } from "../../tableHeaders/reservationHeaders";
import ActionButtons from "../../components/ActionButtons";
import SearchAndAdd from "../../components/searchAndAdd/SearchAndAdd";

const reservationsData = [
  {
    clientName: "John Doe",
    licensePlate: "ZG123AB",
    startDate: "2023-09-01",
    endDate: "2023-09-05",
    pickupLocation: "Airport",
    returnLocation: "City Center",
    totalCost: 250.0,
  },
  {
    clientName: "Jane Smith",
    licensePlate: "RI456CD",
    startDate: "2023-09-10",
    endDate: "2023-09-15",
    pickupLocation: "Downtown",
    returnLocation: "Hotel",
    totalCost: 350.0,
  },
  {
    clientName: "Michael Johnson",
    licensePlate: "OS789EF",
    startDate: "2023-09-05",
    endDate: "2023-09-08",
    pickupLocation: "Train Station",
    returnLocation: "Airport",
    totalCost: 180.0,
  },
  {
    clientName: "Emily Brown",
    licensePlate: "ZA123BC",
    startDate: "2023-09-15",
    endDate: "2023-09-18",
    pickupLocation: "City Center",
    returnLocation: "Downtown",
    totalCost: 210.0,
  },
  {
    clientName: "David Johnson",
    licensePlate: "PU456GH",
    startDate: "2023-09-20",
    endDate: "2023-09-25",
    pickupLocation: "Hotel",
    returnLocation: "Train Station",
    totalCost: 280.0,
  },
];

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const { t } = useTranslation();
  const modal = useModal();

  useEffect(() => {
    setReservations(reservationsData);
  }, []);

  const headers = generateReservationHeaders(t);

  return (
    <div className={classes["reservations-container"]}>
      <h2 className={classes["title"]}>{t("reservations")}</h2>
      <SearchAndAdd
        text={t("addReservation")}
        placeholder={t("searchByDate")}
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
        dataSource={reservations}
      />
    </div>
  );
};

export default wrapperHoc(Reservations);
