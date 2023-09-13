export const generateVehicleHeaders = (t) => [
  {
    title: t("licensePlate"),
    dataIndex: "plate_number",
    responsive: ["lg"],
  },
  {
    title: t("yearOfManufacture"),
    dataIndex: "production_year",
    responsive: ["md"],
  },
  {
    title: t("vehicleType"),
    dataIndex: "type",
  },
  {
    title: t("numberOfSeats"),
    dataIndex: "number_of_seats",
    responsive: ["lg"],
  },
  {
    title: t("rentalPricePerDay"),
    dataIndex: "daily_rate",
  },
  {
    title: t("note"),
    dataIndex: "note",
    responsive: ["lg"],
  },
];
