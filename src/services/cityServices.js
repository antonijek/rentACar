import axios from "axios";

import { requestInstance } from "../config/requestInstance";
import { getCitiesModel } from "./models/cityModels";

const apiAllCities = "/cities";

export const getAllCities = async () => {
  try {
    const res = await requestInstance.get(apiAllCities);
    console.log(res);
    return getCitiesModel(res.data.data);
  } catch (err) {
    throw err;
  }
};
