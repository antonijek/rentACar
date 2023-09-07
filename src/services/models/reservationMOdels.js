export const addReservationModel = (data) => {
  return data;
};

export const getAllReservationsModel = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      customer: item.customer,
      vehicle: item.vehicle,
      pickup_location: item.pickup_location,
      date_from: item.date_from.slice(0, 10),
      date_to: item.date_to,
      drop_off_location: item.drop_off_location,
      price: item.price,
    };
  });
};
