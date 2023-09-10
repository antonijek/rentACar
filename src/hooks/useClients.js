import { useState, useEffect } from "react";

import {
  showSuccessMessage,
  showErrorsMessage,
} from "../services/models/showMessagesModels";
import { addNewUser, editUser } from "../services/userServices";
import { getAllCountries } from "../services/countryServices";
import useModal from "../context/ModalContext";
import { useTranslation } from "react-i18next";
import { getUsers } from "../services/userServices";
import { generateClientHeaders } from "../tableHeaders/clientHeaders";

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const { t } = useTranslation();
  const modal = useModal();

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      console.log("getAll");
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
    getCountriesData();
  }, []);

  const searchUser = async (query) => {
    setIsLoading(true);
    try {
      console.log("seradh");
      const res = await getUsers(query);
      setClients(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getCountriesData = async () => {
    try {
      const res = await getAllCountries();
      setCountries(res);
    } catch (err) {
      console.log(err);
    }
  };

  const addNew = async (data) => {
    modal.setSpiner(true);
    try {
      const res = await addNewUser(data);
      showSuccessMessage(t("successAdd", 3));
      const users = await getUsers();
      setClients(users);
      modal.close();
      modal.setSpiner(false);
    } catch (err) {
      console.log(err);
      modal.setSpiner(false);
      showErrorsMessage(err.response.data.errors, 5);
    }
  };

  const edit = async (data, id) => {
    modal.setSpiner(true);
    try {
      const res = await editUser(data, id);
      showSuccessMessage(t("successEdit"), 3);
      const users = await getUsers();
      setClients(users);
      modal.close();
      modal.setSpiner(false);
    } catch (err) {
      showErrorsMessage(err.response.data.errors, 5);
      modal.setSpiner(false);
    }
  };

  const handleRowClick = (title, form) => {
    modal.open(title, form, { showFooter: false });
  };

  const headers = generateClientHeaders(t);

  return {
    clients,
    setClients,
    isLoading,
    setIsLoading,
    countries,
    searchUser,
    addNew,
    edit,
    handleRowClick,
    headers,
  };
};

export default useClients;
