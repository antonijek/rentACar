export const generateVehicleHeaders = (t) => [
  {
    title: t("licensePlate"),
    dataIndex: "plate_number",
  },
  {
    title: t("yearOfManufacture"),
    dataIndex: "production_year",
  },

  {
    title: t("numberOfSeats"),
    dataIndex: "number_of_seats",
  },
  {
    title: t("rentalPricePerDay"),
    dataIndex: "daily_rate",
  },
];
