import { apiBaseUrl } from "./constant";
import axios, { AxiosRequestConfig } from "axios";

const http = axios.create({
  baseURL: apiBaseUrl,
});

http.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    req.headers!.Authorization = `Bearer ${token}`;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401 && !err.config._retry) {
      err.config._retry = true;

      try {
        const response = await http.get("/users/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", response.data.token);

        return http(err.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default http;
