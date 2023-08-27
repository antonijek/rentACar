import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import Button from "../../components/buttons/button/Button";
import classes from "./clients.module.scss";
import { useTranslation } from "react-i18next";
import { generateClientHeaders } from "../../tableHeaders/clientHeaders";
import ActionButtons from "../../components/ActionButtons";
import SearchAndAdd from "../../components/searchAndAdd/SearchAndAdd";

export const clientsData = [
  {
    id: 1,
    name: "John Doe",
    identification: "123456789",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    notes: "Regular customer",
  },
  {
    id: 2,
    name: "Jane Smith",
    identification: "987654321",
    phoneNumber: "987-654-3210",
    email: "jane@example.com",
    notes: "VIP member",
  },
  {
    id: 3,
    name: "Michael Johnson",
    identification: "555555555",
    phoneNumber: "555-555-5555",
    email: "michael@example.com",
    notes: "First-time client",
  },
];

const Clients = () => {
  const [clients, setClients] = useState([]);
  const { t } = useTranslation();
  const modal = useModal();

  useEffect(() => {
    setClients(clientsData);
  }, []);

  const headers = generateClientHeaders(t);

  return (
    <div className={classes["clients-container"]}>
      <h2 className={classes["title"]}>{t("clients")}</h2>
      <SearchAndAdd
        placeholder={t("searchByNameAndMail")}
        text={t("addClient")}
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
        dataSource={clients}
      />
    </div>
  );
};

export default wrapperHoc(Clients);
