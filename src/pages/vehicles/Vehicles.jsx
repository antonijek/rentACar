import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import classes from "./vehicles.module.scss";
import { useTranslation } from "react-i18next";
import { generateVehicleHeaders } from "../../tableHeaders/vehicleHeaders";
import ActionButtons from "../../components/ActionButtons";
import SearchAndAdd from "../../components/searchAndAdd/SearchAndAdd";

const vehicleData = [
  {
    id: 1,
    licensePlate: "ZG123AB",
    yearOfManufacture: 2022,
    vehicleType: "Sedan",
    numberOfSeats: 5,
    rentalPricePerDay: 50.0,
    note: "Compact city car",
  },
  {
    id: 2,
    licensePlate: "RI456CD",
    yearOfManufacture: 2021,
    vehicleType: "SUV",
    numberOfSeats: 7,
    rentalPricePerDay: 80.0,
    note: "Spacious SUV for families",
  },
  {
    id: 3,
    licensePlate: "OS789EF",
    yearOfManufacture: 2020,
    vehicleType: "Van",
    numberOfSeats: 9,
    rentalPricePerDay: 120.0,
    note: "Large van for groups",
  },
  {
    id: 4,
    licensePlate: "ZA123BC",
    yearOfManufacture: 2022,
    vehicleType: "Hatchback",
    numberOfSeats: 5,
    rentalPricePerDay: 60.0,
    note: "Sporty hatchback",
  },
  {
    id: 5,
    licensePlate: "PU456GH",
    yearOfManufacture: 2021,
    vehicleType: "Minivan",
    numberOfSeats: 7,
    rentalPricePerDay: 90.0,
    note: "Comfortable minivan for families",
  },
  {
    id: 6,
    licensePlate: "SI789IJ",
    yearOfManufacture: 2023,
    vehicleType: "Limousine",
    numberOfSeats: 4,
    rentalPricePerDay: 100.0,
    note: "Elegant limousine",
  },
];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const { t } = useTranslation();
  const modal = useModal();

  useEffect(() => {
    setVehicles(vehicleData);
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

export default wrapperHoc(Vehicles);
