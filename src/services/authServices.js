import axios from "axios";
import { requestInstance } from "../config/requestInstance";
import { loginModel, registerModel } from "./models/authModels";

const apiLogin = "/login";
const apiRegister = "/register";

export const login = async (email, password) => {
  try {
    const res = await requestInstance.post(apiLogin, {
      email,
      password,
    });
    console.log(res);
    const response = loginModel(res.data);
    return response;
  } catch (err) {
    throw err;
  }
};
export const register = async (data) => {
  try {
    const res = await requestInstance.post(apiRegister, data);
    const response = registerModel(res.data);
    return response;
  } catch (err) {
    Promise.reject(err);
  }
};
