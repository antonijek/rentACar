import { useReducer, useEffect } from "react";
import { getReservations } from "../services/reservationServices";

let initialState = { isLoading: false, reservations: [] };

const reservationsReducer = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...state, reservations: action.data };

    case "passedReservations":
      const currentDate = new Date();
      const passedReservations = initialState.reservations.filter(
        (item) => new Date(item.date_to) < currentDate
      );
      return { ...initialState, reservations: passedReservations };

    case "currentReservations":
      let current = new Date();
      const currentReservations = initialState.reservations.filter(
        (item) =>
          new Date(item.date_from) <= current &&
          new Date(item.date_to) >= current
      );
      return { ...initialState, reservations: currentReservations };

    case "futureReservations":
      const today = new Date();
      const futureReservations = initialState.reservations.filter(
        (item) => new Date(item.date_from) > today
      );
      return { ...initialState, reservations: futureReservations };

    default:
      return initialState;
  }
};

const useReservations = (activeItem) => {
  const [state, dispatch] = useReducer(reservationsReducer, initialState);

  const getAllReservations = async () => {
    dispatch({ ...state, isLoading: true });
    try {
      const res = await getReservations();
      console.log("Ovo je Reservations");
      initialState = { ...initialState, reservations: res };
      dispatch({ type: "initialize", data: res });
      dispatch({ ...state, isLoading: false });
    } catch (err) {
      console.log(err);
      dispatch({ ...state, isLoading: false });
    }
  };

  useEffect(() => {
    dispatch({ type: activeItem?.label });
  }, [activeItem]);

  useEffect(() => {
    getAllReservations();
  }, []);

  return state;
};

export default useReservations;
