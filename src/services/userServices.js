import axios from "axios";

import { requestInstance } from "../config/requestInstance";
import {
  currentUserModel,
  addUserModel,
  getAllUsersModel,
} from "./models/userModels";

const apicurrentUser = "/account";
const apiAddUser = "/users";
const apiGetAllUsers = "/customers?search=";
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

export const getUsers = async (query = "") => {
  try {
    const res = await requestInstance.get(`${apiGetAllUsers}${query}`);
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
