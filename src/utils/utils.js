export const formattingReservations = (state) => {
  const formattedState = state.map((item) => {
    return {
      first_name: item.customer.first_name,
      last_name: item.customer.last_name,
      plate_number: item.vehicle.plate_number,
      date_from: item.date_from,
      date_to: item.date_to,
      pickup_location: item.pickup_location.name,
      pickup_location_id: item.pickup_location.id,
      drop_off_location: item.drop_off_location.name,
      drop_off_location_id: item.drop_off_location.id,
      price: item.price,
      id: item.id,
      vehicle: item.vehicle,
      customer: item.customer,
    };
  });
  return formattedState;
};
