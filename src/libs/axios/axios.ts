import { apiUrl } from "@/configs";
import axios from "axios";

// import { appConfig } from '@/config/app-config';
// import { COOKIES } from '@/constants/cookies';
// import { getCookie } from '../cookies';

const axiosCreate = axios.create({
  baseURL: apiUrl,
  // transformResponse: [transformResponse],
});

// function transformResponse(data: any) {
//   if (data) {
//     const response = JSON.parse(data ?? {});
//     if (response?.errors) throw response;

//     return response;
//   }

//   return data;
// }

// const token = getCookie(COOKIES.TOKEN) || '';
// axiosCreate.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export * from "axios";
export { axiosCreate as axios };
