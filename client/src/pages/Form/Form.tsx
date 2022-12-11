import { useHistory } from "react-router-dom";
import { MouseEventHandler, useState } from "react";

import SignInForm from "../../components/Form/SignInForm";
import SignUpForm from "../../components/Form/SignUpForm";

function Form() {
  const history = useHistory();

  const [isUserExist, setIsUserExist] = useState(true);

  const token = localStorage.getItem("userToken");

  if (token) {
    history.replace("/practitioner");
  }

  const togglePage: MouseEventHandler = () => {
    setIsUserExist(!isUserExist);
  };

  return (
    <div className="Form">
      {isUserExist ? (
        <SignInForm onClick={togglePage}></SignInForm>
      ) : (
        <SignUpForm onClick={togglePage}></SignUpForm>
      )}
    </div>
  );
}

export default Form;
