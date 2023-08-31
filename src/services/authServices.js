import axios from "axios";
import { requestInstance } from "../config/requestInstance";
import { loginModel } from "./models/authModels";

const apiLogin = "/login";
const apiLogout = "/logout";

export const login = async (email, password) => {
  try {
    const res = await requestInstance.post(apiLogin, {
      email,
      password,
    });
    const response = loginModel(res.data.data);
    return response;
  } catch (err) {
    throw err;
  }
};
export const logout = async () => {
  try {
    const res = await requestInstance.post(apiLogout);
    return res;
  } catch (err) {
    throw err;
  }
};
