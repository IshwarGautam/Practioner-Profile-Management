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
    .post("/users/signin/", data, { withCredentials: true })
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
    .post("/users/signup/", {
      username: data.username,
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken);

      props.setUserInfo({ userName: response.data.user.username });

      props.history.replace("/practitioner");

      return { errorMessage: "" };
    })
    .catch((error) => {
      if (error.response.status === 409) {
        return {
          errorMessage:
            "Looks like the user with that email already exist in the database.",
        };
      } else {
        return {
          errorMessage: "Something went wrong.",
        };
      }
    });
};
