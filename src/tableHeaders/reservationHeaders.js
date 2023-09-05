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
  },
  {
    title: t("startDate"),
    dataIndex: "start_date",
  },
  {
    title: t("endDate"),
    dataIndex: "date_to",
  },
  {
    title: t("pickupLocation"),
    dataIndex: "pickup_location",
  },
  {
    title: t("returnLocation"),
    dataIndex: "drop_off_location",
  },
  {
    title: t("totalCost"),
    dataIndex: "price",
  },
];
