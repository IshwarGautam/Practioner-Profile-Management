import http from "../utils/http";
import { RouterChildContext } from "react-router-dom";

export const getPractitioner = (
  practitioner_id: string,
  history: RouterChildContext["router"]["history"]
) => {
  return http
    .get(`/practitioner/form/${practitioner_id}`)
    .then((response) => {
      return { response: response.data[0] };
    })
    .catch(() => {
      history.replace("/practitioner-not-found");

      return { response: null };
    });
};

export const updatePractitioner = (
  practitioner_id: string,
  data: object,
  history: RouterChildContext["router"]["history"]
) => {
  return http
    .put(`/practitioner/${practitioner_id}`, data)
    .then(() => {
      history.replace("/practitioner");

      return { errorMessage: null };
    })
    .catch((error) => {
      if (error.response.status === 409) {
        return {
          errorMessage:
            "Looks like the practitioner with that email already exist in the database.",
        };
      } else {
        return { errorMessage: "Something went wrong." };
      }
    });
};

export const addPractitioner = (
  data: object,
  history: RouterChildContext["router"]["history"]
) => {
  return http
    .post("/practitioner", data)
    .then(() => {
      history.replace("/practitioner");

      return { errorMessage: null };
    })
    .catch((error) => {
      if (error.response.status === 409) {
        return {
          errorMessage:
            "Looks like the practitioner with that email already exist in the database.",
        };
      } else {
        return { errorMessage: "Something went wrong." };
      }
    });
};
