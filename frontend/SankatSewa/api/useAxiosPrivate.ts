import { useEffect } from "react";
import { axiosPrivate } from "./axios";
import { useAuth } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";

export default function useAxiosPrivate() {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] =
            `Bearer ${auth.accessToken}`;
        }
        return config;
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error.config;

        if (error.response.status === 401 && !prevRequest._retry) {
          prevRequest._retry = true;

          const refresh = await SecureStore.getItemAsync("refreshToken");

          const response = await axiosPrivate.post(
            "/api/token/refresh/",
            { refresh }
          );

          prevRequest.headers["Authorization"] =
            `Bearer ${response.data.access}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return axiosPrivate;
}