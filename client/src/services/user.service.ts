import http from "./http";

type DataType = {
  username?: string;
  email?: string;
  password?: string;
};

export const signInUser = (data: object) => {
  return http
    .post("/users/signin/", data)
    .then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return { response, error: null };
    })
    .catch((error) => {
      return { response: null, error };
    });
};

export const signUpUser = (data: DataType) => {
  return http
    .post("/users/signup/", {
      username: data.username,
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return { response, error: null };
    })
    .catch((error) => {
      return { response: null, error };
    });
};