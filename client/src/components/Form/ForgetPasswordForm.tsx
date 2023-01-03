import { useState } from "react";
import { useForm } from "react-hook-form";
import bgImg from "../../assets/img1.jpg";
import { forgetPassword } from "../../services/user.service";
import { handleEmailValidation } from "../../utils/emailValidation";

type propsType = {
  onBack: () => void;
};

export default function Form(props: propsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const onSubmit = async (data: object) => {
    const { error } = await forgetPassword(data);

    if (error) {
      setSuccessMessage("");
      setErrorMessage("Can't reset password.");
    } else {
      setErrorMessage("");
      setSuccessMessage("Check your mail.");
    }
  };

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <form
            id="form"
            data-test="forget-password-form"
            className="flex flex-col max-width"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3>Provide your email?</h3>

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

            <button className="btn">Reset my password</button>
            {errorMessage && <div className="errorMsg"> {errorMessage} </div>}
            {successMessage && (
              <div className="successMsg"> {successMessage} </div>
            )}
          </form>
          <div className="back-btn" onClick={props.onBack}>
            {" "}
            &#8592; Back
          </div>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="Background Image" />
        </div>
      </div>
    </section>
  );
}
