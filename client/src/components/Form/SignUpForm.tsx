import bgImg from "../../assets/img1.jpg";
import { useForm } from "react-hook-form";
import { MouseEventHandler, useState } from "react";
import { signUpUser } from "../../services/user.service";
import { handleEmailValidation } from "../../utils/emailValidation";

type FormType = {
  history: {
    replace: (url: string) => void;
  };
  setUserInfo: (userInfo: object) => void;
  onClick?: MouseEventHandler;
};

export default function Form(props: FormType) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = async (data: object) => {
    const { errorMessage } = await signUpUser(data, props);

    setErrorMessage(errorMessage);
  };

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Sign Up</h2>
          <span className="sub-title">Register new account.</span>

          <form
            id="form"
            data-test="signup-form"
            className="flex flex-col max-width"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("username", {
                required: true,
                minLength: 5,
                pattern: {
                  value: /^[^\s]+(?:$|.*[^\s]+$)/,
                  message:
                    "No white space allowed at the beginning or at the end.",
                },
              })}
              placeholder="User Name"
            />

            {errors.username?.type === "required" && (
              <div className="errorMsg">User Name is required.</div>
            )}
            {errors.username?.message && (
              <div className="errorMsg">
                {errors.username.message.toString()}
              </div>
            )}
            {errors.username?.type === "minLength" && (
              <div className="errorMsg">Minimum length should be 5.</div>
            )}

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
              type="password"
              {...register("password", {
                required: true,
                minLength: 5,
              })}
              placeholder="password"
            />
            {errors.password?.type === "required" && (
              <div className="errorMsg">Password is required.</div>
            )}
            {errors.password?.type === "minLength" && (
              <div className="errorMsg">
                Password length should have at least 5 character.
              </div>
            )}

            <input
              type="password"
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
          <div className="sign-in-user">
            Already had an account?
            <span className="sign-in-label" onClick={props.onClick}>
              {" "}
              Sign in
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
