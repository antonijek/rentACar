import axios from "axios";

import { requestInstance } from "../config/requestInstance";
import {
  currentUserModel,
  addUserModel,
  getAllUsersModel,
} from "./models/userModels";

const apicurrentUser = "/account";
const apiAddUser = "/users";
const apiGetAllUsers = "/customers";
const apiUpdateUser = "/users";
const apiDeleteUser = "/users";

export const getCurrentUser = async () => {
  try {
    const res = await requestInstance.get(apicurrentUser);
    return currentUserModel(res.data);
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await requestInstance.get(apiGetAllUsers);
    console.log(res);
    return getAllUsersModel(res.data.data);
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
