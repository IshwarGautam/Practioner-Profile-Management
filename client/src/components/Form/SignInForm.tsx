import { useForm } from "react-hook-form";
import bgImg from "../../assets/img1.jpg";
import { MouseEventHandler, useState } from "react";
import ForgetPasswordForm from "./ForgetPasswordForm";
import { signInUser } from "../../services/user.service";

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
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [isPasswordForget, setIsPasswordForget] = useState(false);

  const onSubmit = async (data: object) => {
    const { errorMessage } = await signInUser(data, props);

    setErrorMessage(errorMessage);
  };

  const onForgetBtnClicked = () => {
    setIsPasswordForget(true);
  };

  const onBack = () => {
    setIsPasswordForget(false);
  };

  return (
    <section>
      {isPasswordForget && <ForgetPasswordForm onBack={onBack} />}
      {!isPasswordForget && (
        <div className="register">
          <div className="col-1">
            <h2>Sign In</h2>
            <span className="sub-title">Log in using your account.</span>
            <form
              id="form"
              data-test="login-form"
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
                type="password"
                {...register("password")}
                placeholder="password"
              />
              <div className="forget-password" onClick={onForgetBtnClicked}>
                Forget Password?
              </div>
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
      )}
    </section>
  );
}
