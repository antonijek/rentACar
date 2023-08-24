export const exists = (key) => {
  return Boolean(localStorage.getItem(key));
};

export const get = (key) => {
  return localStorage.getItem(key);
};

export const set = (key, value) => {
  localStorage.setItem(key, value);
};

export const clear = () => {
  localStorage.clear();
};
