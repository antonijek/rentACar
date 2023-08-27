export const generateReservationHeaders = (t) => [
  {
    title: t("clientName"),
    dataIndex: "clientName",
  },
  {
    title: t("licensePlate"),
    dataIndex: "licensePlate",
  },
  {
    title: t("startDate"),
    dataIndex: "startDate",
  },
  {
    title: t("endDate"),
    dataIndex: "endDate",
  },
  {
    title: t("pickupLocation"),
    dataIndex: "pickupLocation",
  },
  {
    title: t("returnLocation"),
    dataIndex: "returnLocation",
  },
  {
    title: t("totalCost"),
    dataIndex: "totalCost",
  },
];
