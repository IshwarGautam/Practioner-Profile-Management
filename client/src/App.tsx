import "./App.css";
import { useState } from "react";

import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  const [isUserExist, setIsUserExist] = useState(true);

  const togglePage: Function = () => {
    setIsUserExist(!isUserExist);
  };

  return (
    <div className="App">
      {isUserExist ? (
        <SignInForm onClick={togglePage}></SignInForm>
      ) : (
        <SignUpForm onClick={togglePage}></SignUpForm>
      )}
    </div>
  );
}

export default App;
