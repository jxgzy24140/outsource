import { REQUEST_BASE_URL } from "@/utils/appConfig";
import axios from "axios";

const http = axios.create({
  baseURL: REQUEST_BASE_URL,
  timeout: 30000,
});

http.interceptors.request.use(
  function (config) {
    if (sessionStorage.getItem("accessToken")) {
      config.headers["Authorization"] =
        "Bearer " + sessionStorage.getItem("accessToken");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    return Promise.reject(error);
  }
);
export default http;
