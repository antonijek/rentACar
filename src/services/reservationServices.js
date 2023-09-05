import axios from "axios";

import { requestInstance } from "../config/requestInstance";
import {
  getAllReservationsModel,
  addReservationModel,
} from "../services/models/reservationMOdels";

const apiAddReservation = "/reservations";
const apiGetReservations = "/reservations?";
const apiUpdateReservation = "/reservations";
const apiDeleteReservation = "/reservations";

export const getReservations = async (query = "") => {
  try {
    const res = await requestInstance.get(`${apiGetReservations}${query}`);
    console.log(res);
    return getAllReservationsModel(res.data.data);
  } catch (err) {
    throw err;
  }
};

export const addNewReservation = async (reservationData) => {
  try {
    const res = await requestInstance.post(apiAddReservation, reservationData);
    console.log(res);
    return addReservationModel(res.data);
  } catch (err) {
    throw err;
  }
};

export const editReservation = async (reservationData, ReservationId) => {
  try {
    const res = await requestInstance.put(
      `${apiUpdateReservation}/${ReservationId}`,
      reservationData
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    const res = await requestInstance.delete(
      `${apiDeleteReservation}/${reservationId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
