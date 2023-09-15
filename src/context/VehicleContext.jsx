import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import {
  showSuccessMessage,
  showErrorsMessage,
} from "../services/models/showMessagesModels";
import { editVehicle, addNewVehicle } from "../services/vehicleServices";
import { useModal } from "./ModalContext";
import { useTranslation } from "react-i18next";
import { getVehicles } from "../services/vehicleServices";
import { generateVehicleHeaders } from "../tableHeaders/vehicleHeaders";

const VehicleContext = createContext();

const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const modal = useModal();

  const getAllVehicles = async () => {
    setIsLoading(true);
    try {
      const res = await getVehicles();
      setVehicles(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  const searchVehicle = async (query) => {
    setIsLoading(true);
    try {
      const res = await getVehicles(query);

      setVehicles(res);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const addVehicle = async (formData) => {
    modal.setSpiner(true);
    try {
      const res = await addNewVehicle(formData);
      showSuccessMessage(t("successAdd", 3));
      const vehicles = await getVehicles();
      setVehicles(vehicles);

      modal.close();
      modal.setSpiner(false);
    } catch (err) {
      modal.setSpiner(false);
      showErrorsMessage(err.response.data.errors, 5);
    }
  };

  const edit = async (formData, plate_number) => {
    modal.setSpiner(true);
    try {
      const res = await editVehicle(formData, plate_number);
      showSuccessMessage(t("successEdit"), 3);
      const vehicles = await getVehicles();
      setVehicles(vehicles);

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

  const headers = generateVehicleHeaders(t);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        setVehicles,
        isLoading,
        searchVehicle,
        handleRowClick,
        headers,
        edit,
        addVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const vehicleData = () => {
  return useContext(VehicleContext);
};

export default VehicleProvider;
