import http from "../utils/http";

type DataType = {
  username?: string;
  email?: string;
  password?: string;
};

type propsType = {
  history: {
    replace: (url: string) => void;
  };
  setUserInfo: (userInfo: object) => void;
};
export const signInUser = (data: object, props: propsType) => {
  return http
    .post("/users/signin", data, { withCredentials: true })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);

      props.setUserInfo({ userName: response.data.user.username });

      props.history.replace("/practitioner");

      return { errorMessage: "" };
    })
    .catch((error) => {
      let msg = "";

      switch (error.response.status) {
        case 400:
          msg = "Invalid Credentials.";
          break;
        case 404:
          msg = "User not found.";
          break;
        case 500:
          msg = "Something went wrong.";
          break;
        default:
          msg = "";
      }

      return { errorMessage: msg };
    });
};

export const signUpUser = (data: DataType, props: propsType) => {
  return http
    .post(
      "/users/signup",
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    )
    .then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);

      props.setUserInfo({ userName: response.data.user.username });

      props.history.replace("/practitioner");

      return { errorMessage: "" };
    })
    .catch((error) => {
      let errorMsg = "";

      if (error.response.status === 409) {
        errorMsg =
          "Looks like the user with that email already exist in the database.";
      } else {
        errorMsg = "Something went wrong.";
      }

      return { errorMessage: errorMsg };
    });
};

export const getUsers = () => {
  return http
    .get("/users")
    .then((response) => {
      return { response };
    })
    .catch(() => {
      return { response: null };
    });
};

export const deleteUser = (payload: object) => {
  return http
    .delete(`/users/delete`, { data: payload })
    .then(() => {
      return { error: null };
    })
    .catch((error) => {
      return { error };
    });
};

export const forgetPassword = (payload: object) => {
  return http
    .post(`/users/forgetPassword`, payload)
    .then(() => {
      return { error: null };
    })
    .catch((error) => {
      return { error };
    });
};

export const resetPassword = (token: string, payload: object) => {
  return http
    .post(`/users/resetPassword?token=${token}`, payload)
    .then(() => {
      return { error: null };
    })
    .catch((error) => {
      return { error };
    });
};
