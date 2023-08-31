import axios from "axios";

import { requestInstance } from "../config/requestInstance";
import { addVehicleModel, getAllVehiclesModel } from "./models/vehicleModels";

const apiAddVehisle = "/vehicles";
const apiGetAllVehicles = "/vehicles?search=";
const apiUpdateVehicle = "/vehicles";
const apiDeleteVehicle = "/vehicles";

export const getAllVehicles = async () => {
  try {
    const res = await requestInstance.get(apiGetAllVehicles);
    console.log(res);
    return getAllVehiclesModel(res.data);
  } catch (err) {
    throw err;
  }
};

export const addNewUser = async (clientData) => {
  try {
    const res = await requestInstance.post(apiAddUser, clientData);
    console.log(res);
    return addUserModel(res.data);
  } catch (err) {
    throw err;
  }
};

export const editUser = async (clientData, clientId) => {
  try {
    const res = await requestInstance.put(
      `${apiUpdateUser}/${clientId}`,
      clientData
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (clientId) => {
  try {
    const res = await requestInstance.delete(`${apiDeleteUser}/${clientId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
