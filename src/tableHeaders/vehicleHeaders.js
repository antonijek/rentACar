export const generateVehicleHeaders = (t) => [
  {
    title: t("id"),
    dataIndex: "id",
  },
  {
    title: t("licensePlate"),
    dataIndex: "plate_number",
  },
  {
    title: t("yearOfManufacture"),
    dataIndex: "production_year",
  },
  {
    title: t("vehicleType"),
    dataIndex: "type",
  },
  {
    title: t("numberOfSeats"),
    dataIndex: "number_of_seats",
  },
  {
    title: t("rentalPricePerDay"),
    dataIndex: "daily_rate",
  },
  {
    title: t("note"),
    dataIndex: "note",
  },
];
