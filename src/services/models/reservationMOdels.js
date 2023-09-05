export const addReservationModel = (data) => {
  return data;
};

export const getAllReservationsModel = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      first_name: item.customer.first_name,
      last_name: item.customer.last_name,
      customer: item.customer,
      vehicle: item.vehicle,
      pickup_location_id: item.pickup_location.id,
      pickup_location: item.pickup_location.name,
      plate_number: item.vehicle.plate_number,
      start_date: item.date_from.slice(0, 10),
      end_date: item.date_to,
      drop_off_location_id: item.drop_off_location.id,
      drop_off_location: item.drop_off_location.name,
      price: item.price,
    };
  });
};
