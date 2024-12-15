import Cookies from "js-cookie";

export const setCookie = (
  key: string,
  value: string,
  options?: typeof Cookies.attributes,
) => {
  Cookies.set(key, value, options);
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (
  key: string,
  options?: typeof Cookies.attributes,
) => {
  Cookies.remove(key, options);
};
