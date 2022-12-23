import { apiBaseUrl } from "../utils/constant";
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
    console.log(err);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401) {
      const token = localStorage.getItem("refreshToken");

      try {
        const response = await http.post("/users/refresh", { token });
        localStorage.setItem("accessToken", response.data.token);

        return http(err.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
);

export default http;
