export const currentUserModel = (data) => {
  return {
    country_id: data?.country_id,
    created_at: data?.created_at,
    email: data?.email,
    first_name: data?.first_name,
    last_name: data?.last_name,
    id: data?.id,
    note: data?.note,
    passport_number: data?.passport_number,
    phone_number: data?.phone_number,
    role_id: data?.role_id,
    updated_at: data?.updated_at,
  };
};
export const addUserModel = (data) => {
  return data;
};
export const getAllUsersModel = (data) => {
  return data;
};
export const getUsersForSelectModel = (data) => {
  return data.map((item) => {
    return { label: `${item.first_name} ${item.last_name}`, value: item.id };
  });
};
