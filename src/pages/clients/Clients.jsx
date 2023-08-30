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
import AuthHoc from "../authHOC/AuthHoc";
import { getAllUsers } from "../../services/userServices";
import ClientForm from "../../components/form/ClientForm";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const { t } = useTranslation();
  const modal = useModal();

  const getUsers = async () => {
    try {
      const res = await getAllUsers();
      setClients(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const headers = generateClientHeaders(t);

  return (
    <div className={classes["clients-container"]}>
      <h2 className={classes["title"]}>{t("clients")}</h2>
      <SearchAndAdd
        placeholder={t("searchByNameAndMail")}
        text={t("addClient")}
        onClick={() =>
          modal.open(t("addClient"), <ClientForm setClients={setClients} />, {
            showFooter: false,
          })
        }
      />
      <Table
        columns={[
          ...headers,
          {
            title: t("actions"),
            dataIndex: null,
            render: (data) => (
              <ActionButtons t={t} data={data} setClients={setClients} />
            ),
          },
        ]}
        dataSource={clients}
      />
    </div>
  );
};

export default AuthHoc(wrapperHoc(Clients));
