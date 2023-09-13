export const generateReservationHeaders = (t) => [
  {
    title: t("firstName"),
    dataIndex: "first_name",
  },
  {
    title: t("lastName"),
    dataIndex: "last_name",
  },
  {
    title: t("licensePlate"),
    dataIndex: "plate_number",
    responsive: ["md"],
  },
  {
    title: t("startDate"),
    dataIndex: "date_from",
    responsive: ["lg"],
  },
  {
    title: t("endDate"),
    dataIndex: "date_to",
    responsive: ["lg"],
  },
  {
    title: t("pickupLocation"),
    dataIndex: "pickup_location",
    responsive: ["xl"],
  },
  {
    title: t("returnLocation"),
    dataIndex: "drop_off_location",
    responsive: ["xl"],
  },
  {
    title: t("totalCost"),
    dataIndex: "price",
    responsive: ["sm"],
  },
];
