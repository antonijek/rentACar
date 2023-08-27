export function loginModel(data) {
  return {
    access_token: data?.token,
  };
}
export function registerModel(data) {
  return {
    id: data?.id,
    firstName: data?.name,
    lastName: data?.surname,
    description: data?.description,
    image: data?.image_id,
    email: data?.email,
  };
}
