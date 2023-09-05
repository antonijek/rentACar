import axios from "axios";

import { requestInstance } from "../config/requestInstance";
import { getCountriesModel } from "./models/countryModels";

const apiAllCounties = "/countries";

export const getAllCountries = async () => {
  try {
    const res = await requestInstance.get(apiAllCounties);
    console.log(res);
    return getCountriesModel(res.data.data);
  } catch (err) {
    throw err;
  }
};
