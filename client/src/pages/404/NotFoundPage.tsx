import { useHistory } from "react-router-dom";
import classes from "./NotFoundPage.module.css";

export default function pagenotfound() {
  const history = useHistory();

  const onButtonClicked = () => {
    history.replace("/");
  };

  return (
    <div className={classes?.PageNotFound}>
      <div className={classes?.title}>404 page</div>
      <p className={classes?.subtitle}>
        Looks like the page you are looking for is no longer here.
      </p>
      <div
        className={classes?.button}
        onClick={onButtonClicked}
        data-testid="back-btn"
      >
        <span className={classes?.redirect}>Take you back</span>
      </div>
    </div>
  );
}
