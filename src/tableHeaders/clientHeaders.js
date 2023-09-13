export const generateClientHeaders = (t) => [
  {
    title: t("firstName"),
    dataIndex: "first_name",
  },
  {
    title: t("lastName"),
    dataIndex: "last_name",
  },

  {
    title: t("phoneNumber"),
    dataIndex: "phone_number",
    responsive: ["lg"],
  },
  {
    title: t("email"),
    dataIndex: "email",
    responsive: ["md"],
  },
  {
    title: t("passportNumber"),
    dataIndex: "passport_number",
    responsive: ["lg"],
  },
  {
    title: t("note"),
    dataIndex: "note",
    responsive: ["xl"],
  },
];
