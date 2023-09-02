import React, { useEffect, useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import classes from "./clients.module.scss";
import { useTranslation } from "react-i18next";
import { generateClientHeaders } from "../../tableHeaders/clientHeaders";
import ActionButtons from "../../components/ActionButtons";
import SearchAndAdd from "../../components/searchAndAdd/SearchAndAdd";
import AuthHoc from "../authHOC/AuthHoc";
import { deleteUser, getUsers } from "../../services/userServices";
import ClientForm from "../../components/forms/ClientForm";
import Spiner from "../../components/spiner/Spiner";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const modal = useModal();

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getUsers();
      setClients(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const searchUser = async (query) => {
    setIsLoading(true);
    try {
      const res = await getUsers(query);
      setClients(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleRowClick = (client) => {
    const disabled = true;
    modal.open(
      t("clientInformation"),
      <ClientForm data={client} setClients={setClients} disabled={disabled} />,
      { showFooter: false }
    );
  };

  const headers = generateClientHeaders(t);

  return (
    <div className={classes["clients-container"]}>
      <h2 className={classes["title"]}>{t("clients")}</h2>
      <SearchAndAdd
        search={searchUser}
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
              <ActionButtons
                t={t}
                data={data}
                setItems={setClients}
                FormComponent={ClientForm}
                formProps={{ data, setClients }}
                getItems={getUsers}
                deleteItem={deleteUser}
              />
            ),
          },
        ]}
        dataSource={clients}
        onRow={(client) => ({
          onClick: () => handleRowClick(client),
        })}
      />
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(wrapperHoc(Clients));
