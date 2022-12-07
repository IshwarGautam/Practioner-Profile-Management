import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import bgImg from "../../assets/img1.jpg";
import { http } from "../../services/http";

import { useHistory } from "react-router-dom";

type FormType = {
  onClick: MouseEventHandler;
};

export default function Form(props: FormType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = (data: object) => {
    http
      .post("/users/signin/", data)
      .then(() => {
        history.replace("/practitioner");
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            setErrorMessage("Invalid Credentials.");
            break;
          case 404:
            setErrorMessage("User not found.");
            break;
          case 500:
            setErrorMessage("Something went wrong.");
            break;
          default:
            setErrorMessage("");
        }
      });
  };

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Sign In</h2>
          <span className="sub-title">Log in using your account.</span>
          <form
            id="form"
            className="flex flex-col max-width"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("email", {
                required: true,
              })}
              placeholder="email"
            />
            {errors.email?.type === "required" && (
              <div className="errorMsg">Email is required.</div>
            )}

            <input
              type="text"
              {...register("password")}
              placeholder="password"
            />
            <button className="btn">Sign In</button>
            {errorMessage && <div className="errorMsg"> {errorMessage} </div>}
          </form>
          <div className="register-user">
            Don't have an account?
            <span className="sign-up-label" onClick={props.onClick}>
              {" "}
              Sign up
            </span>
          </div>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="Background Image" />
        </div>
      </div>
    </section>
  );
}
