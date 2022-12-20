import axios, { AxiosRequestConfig } from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000",
});

http.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    const token: string = JSON.parse(
      localStorage.getItem("accessToken") || "false"
    );

    req.headers!.Authorization = `Bearer ${token}`;
    return req;
  },
  (err) => {
    console.log(err);
  }
);

http.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401) {
      const token: string = JSON.parse(
        localStorage.getItem("refreshToken") || "false"
      );

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
