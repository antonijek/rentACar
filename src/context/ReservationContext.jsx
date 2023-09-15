import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import {
  showSuccessMessage,
  showErrorsMessage,
} from "../services/models/showMessagesModels";
import { useModal } from "./ModalContext";
import { useTranslation } from "react-i18next";
import { generateReservationHeaders } from "../tableHeaders/reservationHeaders";
import { getAllCities } from "../services/cityServices";
import { getUsersForSelect } from "../services/userServices";
import { addNewReservation } from "../services/reservationServices";
import {
  getReservations,
  editReservation,
} from "../services/reservationServices";

const ReservationContext = createContext();

const ReservationProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [cities, setCities] = useState([]);
  const [clients, setClients] = useState([]);
  const modal = useModal();
  const { t } = useTranslation();

  const getAllReservations = async () => {
    setIsLoading(true);
    try {
      const res = await getReservations();
      console.log(res);
      setReservations(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const searchReservation = async (query) => {
    setIsLoading(true);
    try {
      const res = await getReservations(query);

      setReservations(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getCities = async () => {
    try {
      const res = await getAllCities();
      setCities(res);
    } catch (err) {
      console.log(err);
    }
  };
  const getClients = async () => {
    try {
      const res = await getUsersForSelect();

      setClients(res);
    } catch (err) {
      console.log(err);
    }
  };

  const addReservation = async (formData) => {
    modal.setSpiner(true);
    try {
      await addNewReservation(formData);
      showSuccessMessage(t("successAdd", 3));
      modal.setSpiner(false);
      modal.close();
      getAllReservations();
    } catch (err) {
      console.log(err);
      showErrorsMessage(err.response.data.errors, 5);
      modal.setSpiner(false);
    }
  };

  const editingReservation = async (formData, id) => {
    modal.setSpiner(true);
    try {
      await editReservation(formData, id);
      showSuccessMessage(t("successEdit"), 3);
      const reservations = await getReservations();
      setReservations(reservations);
      modal.close();
      modal.setSpiner(false);
      getAllReservations();
    } catch (err) {
      showErrorsMessage(err.response.data.errors, 5);
      modal.setSpiner(false);
    }
  };

  const handleRowClick = (title, form) => {
    modal.open(title, form, { showFooter: false });
  };

  const headers = generateReservationHeaders(t);

  return (
    <ReservationContext.Provider
      value={{
        headers,
        cities,
        clients,
        handleRowClick: (title, form) => handleRowClick(title, form),
        isLoading,
        setIsLoading,
        addReservation: (formData) => addReservation(formData),
        editingReservation: (formdata, id) => editingReservation(formdata, id),
        reservations,
        setReservations,
        searchReservation: (query) => searchReservation(query),
        getAllReservations,
        getCities,
        getClients,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const reservationData = () => {
  return useContext(ReservationContext);
};

export default ReservationProvider;
