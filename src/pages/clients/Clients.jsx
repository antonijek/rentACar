import React, { useState } from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";
import Table from "../../components/table/Table";
import classes from "./clients.module.scss";
import { useTranslation } from "react-i18next";
import ActionButtons from "../../components/ActionButtons";
import SearchAndAdd from "../../components/searchAndAdd/SearchAndAdd";
import AuthHoc from "../authHOC/AuthHoc";
import { deleteUser, getUsers } from "../../services/userServices";
import Spiner from "../../components/spiner/Spiner";
import { clientData } from "../../context/ClientContext";
import ClientForm from "../../components/forms/ClientForm";

const Clients = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    clients,
    headers,
    searchUser,
    setClients,
    handleRowClick,
    addNew,
    edit,
    countries,
  } = clientData();
  const modal = useModal();

  return (
    <div className={classes["clients-container"]}>
      <h2 className={classes["title"]}>{t("clients")}</h2>
      <SearchAndAdd
        search={searchUser}
        placeholder={t("searchByNameAndMail")}
        text={t("addClient")}
        onClick={() => {
          console.log("ovoj je addclijent klik");
          modal.open(
            <span className={classes["modal-title"]}>{t("addClient")}</span>,
            <ClientForm countries={countries} addNew={addNew} />,
            {
              showFooter: false,
            }
          );
        }}
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
                formProps={{ data, countries, edit }}
                getItems={getUsers}
                deleteItem={deleteUser}
              />
            ),
          },
        ]}
        dataSource={clients.map((client) => ({
          ...client,
          key: client.id,
        }))}
        onRow={(client) => ({
          onClick: () =>
            handleRowClick(
              <span className={classes["modal-title"]}>
                {t("clientInformation")}
              </span>,
              <ClientForm
                setClients={setClients}
                data={client}
                disabled={true}
                countries={countries}
              />
            ),
        })}
      />
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(wrapperHoc(Clients));
