import axios from "axios";

import { requestInstance } from "../config/requestInstance";
import { addVehicleModel, getAllVehiclesModel } from "./models/vehicleModels";

const apiAddVehicle = "/vehicles";
const apiGetVehicles = "/vehicles?search=";
const apiUpdateVehicle = "/vehicles";
const apiDeleteVehicle = "/vehicles";

export const getVehicles = async (query = "") => {
  try {
    const res = await requestInstance.get(`${apiGetVehicles}${query}`);

    //Sa apija dobijam razlicitu strukturu podataka ako imam query i  ako nemam...
    return query
      ? getAllVehiclesModel(res.data.data)
      : getAllVehiclesModel(res.data);
  } catch (err) {
    throw err;
  }
};

export const addNewVehicle = async (vehicleData) => {
  try {
    const res = await requestInstance.post(apiAddVehicle, vehicleData);

    return addVehicleModel(res.data);
  } catch (err) {
    throw err;
  }
};

export const editVehicle = async (vehicleData, vehicleId) => {
  try {
    const res = await requestInstance.put(
      `${apiUpdateVehicle}/${vehicleId}`,
      vehicleData
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    const res = await requestInstance.delete(
      `${apiDeleteVehicle}/${vehicleId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
