import "./index.css";
import App from "./App";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { SetupInterceptors } from "./utils/http";
import { BrowserRouter, useHistory } from "react-router-dom";

const NavigateFunctionComponent = () => {
  const history = useHistory();
  const [ran, setRan] = useState(false);

  if (!ran) {
    SetupInterceptors(history);
    setRan(true);
  }

  return <></>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    {<NavigateFunctionComponent />}
    <App />
  </BrowserRouter>
);
