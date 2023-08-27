export const currentUserModel = (data) => {
  return {
    id: data?.id,
    name: data?.name,
    surname: data?.surname,
    description: data?.description,
    image_id: data?.image_id,
    email: data?.email,
  };
};
