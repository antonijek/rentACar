import axios from "axios";

import { requestInstance } from "../config/requestInstance";
import { currentUserModel } from "./models/userModels";

const apiAllusers = "/users";

export const getCurrentUser = async () => {
  try {
    const res = await requestInstance.get(apiAllusers);
    console.log(res);
    return currentUserModel(res.data);
  } catch (err) {
    Promise.reject(err);
  }
};
/* export const editUser = async (userData, data) => {
  try {
    const apiEditUser = `/users/${userData.id}`;
    const res = await requestInstance.post(apiEditUser, data);
    console.log(res);
    //return currentUserModel(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}; */
