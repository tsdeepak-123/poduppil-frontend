import axios from "axios";

import { adminApi, userApi } from "../Stores/Api";

import { useCookies } from "react-cookie";

const getTokenFromCookie = (cookieName) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1];

  return cookieValue || null;
};

const createApiInstance = (baseURL) => {
  try {
    const instance = axios.create({
      baseURL: baseURL,
    });
    instance.interceptors.request.use((config) => {
      const token = getTokenFromCookie("AdminsecretKey");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  } catch (error) {}
};

export const axiosUser = createApiInstance(userApi);
export const axiosAdmin = createApiInstance(adminApi);
