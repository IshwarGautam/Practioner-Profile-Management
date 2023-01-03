import { useState } from "react";
import { useForm } from "react-hook-form";
import bgImg from "../../assets/img1.jpg";
import { useHistory, useLocation } from "react-router-dom";
import { resetPassword } from "../../services/user.service";

export default function Form() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [redirectLink, setRedirectLink] = useState(false);

  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);

  const token = searchParams.get("token") || "";

  const onSubmit = async (data: object) => {
    const { error } = await resetPassword(token, data);

    if (error) {
      setSuccessMessage("");
      setErrorMessage("Unable to change password.");
    } else {
      setRedirectLink(true);
      setErrorMessage("");
      setSuccessMessage("Password changed successfully.");
    }
  };

  const onRedirectLinkClicked = () => {
    history.replace("/");
  };

  return (
    <section>
      <div className="Form">
        <div className="register">
          <div className="col-1">
            <form
              id="form"
              className="flex flex-col max-width"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3>Provide your new password</h3>

              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 5,
                })}
                placeholder="Password"
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
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <div className="errorMsg">
                  {errors.confirmPassword?.message?.toString()}
                </div>
              )}
              <button className="btn">Change my password</button>
              {errorMessage && <div className="errorMsg"> {errorMessage} </div>}
              {successMessage && (
                <div className="successMsg"> {successMessage} </div>
              )}
            </form>
            {redirectLink && (
              <div className="back-btn" onClick={onRedirectLinkClicked}>
                {" "}
                &#8592; Go To Sign in Page
              </div>
            )}
          </div>
          <div className="col-2">
            <img src={bgImg} alt="Background Image" />
          </div>
        </div>
      </div>
    </section>
  );
}
