export const getCountriesModel = (data) => {
  return data.map((item) => {
    return { label: item.name, value: item.id };
  });
};
