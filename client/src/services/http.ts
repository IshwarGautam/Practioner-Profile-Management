import axios, { AxiosRequestConfig } from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000",
});

http.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    const token: string = JSON.parse(
      localStorage.getItem("userToken") || "false"
    );

    req.headers!.Authorization = `Bearer ${token}`;
    return req;
  },
  (err) => {
    console.log(err);
  }
);

export default http;
