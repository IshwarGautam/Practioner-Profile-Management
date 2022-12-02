import { useState } from "react";
import bgImg from "../assets/img1.jpg";
import { useForm } from "react-hook-form";
import { handleEmailValidation } from "../utils/emailValidation";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = (data: any) => {
    fetch("/users/signup/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      if (data.status === 409) {
        setErrorMessage(
          "Looks like the user with that email already exist in the database."
        );
      } else {
        setErrorMessage("");
        alert("User Successfully Registered!");
      }
    });
  };

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Sign Up</h2>
          <span className="sub-title">Register new account.</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("email", {
                required: true,
                validate: handleEmailValidation,
              })}
              placeholder="email"
            />

            {errors.email?.type === "required" && (
              <div className="errorMsg">Email is required.</div>
            )}

            {errors.email?.message && (
              <div className="errorMsg">{errors.email.message?.toString()}</div>
            )}

            <input
              type="text"
              {...register("password", {
                minLength: 5,
              })}
              placeholder="password"
            />
            {errors.password?.type === "minLength" && (
              <div className="errorMsg">
                Password length should have at least 5 character.
              </div>
            )}

            <input
              type="text"
              {...register("confirmPassword", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Password didn't get match.";
                  }
                },
              })}
              placeholder="confirmPassword"
            />
            {errors.confirmPassword && (
              <div className="errorMsg">
                {errors.confirmPassword?.message?.toString()}
              </div>
            )}

            <button className="btn">Sign Up</button>
            {errorMessage && <div className="errorMsg"> {errorMessage} </div>}
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  );
}
