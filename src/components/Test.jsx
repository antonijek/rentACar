/* import React, { useState } from "react";
import wrapperHoc from "../pages/wraper/wraperHoc";
import { useModal } from "../context/ModalContext";
import Table from "./table/Table";
import classes from "../pages/clients/clients.module.scss";
import { useTranslation } from "react-i18next";
import ActionButtons from "./ActionButtons";
import SearchAndAdd from "./searchAndAdd/SearchAndAdd";
import AuthHoc from "../pages/authHOC/AuthHoc";
import { deleteUser, getUsers } from "../services/userServices";
import Spiner from "./spiner/Spiner";
import { clientData } from "../context/ClientContext";
import TestForm from "./forms/TestForm";

const Test = () => {
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

  console.log(countries);
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
            <TestForm countries={countries} addNew={addNew} />,
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
                FormComponent={TestForm}
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
              <TestForm setClients={setClients} data={client} disabled={true} />
            ),
        })}
      />
      {isLoading && <Spiner />}
    </div>
  );
};

export default AuthHoc(wrapperHoc(Test)); */
