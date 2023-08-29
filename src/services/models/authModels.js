export function loginModel(data) {
  return {
    access_token: data?.access_token,
    first_name: data?.first_name,
    last_name: data?.last_name,
    email: data?.email,
    role_id: data?.role_id,
    refresh_token: data?.refresh_token,
  };
}
