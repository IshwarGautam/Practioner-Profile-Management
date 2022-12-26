import { useHistory } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { MouseEventHandler, useState } from "react";

import SignInForm from "../../components/Form/SignInForm";
import SignUpForm from "../../components/Form/SignUpForm";

function Form() {
  const history = useHistory();

  const token = localStorage.getItem("accessToken");
  if (token) {
    history.replace("/practitioner");
  }

  const setUserInfo = useUserStore((state) => state.getUserInfo);

  const [isUserExist, setIsUserExist] = useState(true);

  const togglePage: MouseEventHandler = () => {
    setIsUserExist(!isUserExist);
  };

  return (
    <div className="Form">
      {isUserExist ? (
        <SignInForm
          onClick={togglePage}
          history={history}
          setUserInfo={setUserInfo}
        ></SignInForm>
      ) : (
        <SignUpForm
          onClick={togglePage}
          history={history}
          setUserInfo={setUserInfo}
        ></SignUpForm>
      )}
    </div>
  );
}

export default Form;
