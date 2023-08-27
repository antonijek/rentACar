import axios from "axios";
import { exists, get } from "..//services/storageServices";
import { storageKeys } from "./config";

export const requestInstance = axios.create();

requestInstance.defaults.baseURL = "https://rentacarapi.amplitudo.me/api";
requestInstance.defaults.headers["Accept"] = "application/json";

requestInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = exists(storageKeys.USER)
      ? `Bearer ${get(storageKeys.USER)}`
      : "undefined";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
