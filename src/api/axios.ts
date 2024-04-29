import Axios, { InternalAxiosRequestConfig } from "axios";

import { useNotification } from "@/components/hooks";
import storage from "@/utils/storage";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL as string;

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { notify } = useNotification();
    const msg = error.response?.data?.message || error.message;
    notify({
      msg,
      type: "error",
      //   title: "Error",
    });

    return Promise.reject(error);
  }
);
