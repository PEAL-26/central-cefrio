import axios from "axios";

import { apiUrl } from "@/configs";
import { COOKIES } from "@/constants/cookies";
import { getCookie } from "../cookies";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 20000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((req) => {
  let token = undefined;
  if (typeof window === "undefined") {
    const { cookies } = require("next/headers");
    token = cookies().get(COOKIES.TOKEN)?.value || "";
  } else {
    token = getCookie(COOKIES.TOKEN);
  }

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export * from "axios";
export { axiosInstance as axios };
