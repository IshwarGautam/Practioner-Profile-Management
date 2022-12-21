import { useHistory } from "react-router-dom";
import classes from "./AddPractitioner.module.css";
import PractitionerForm from "../../components/Form/PractitionerForm";

function AddPractitioner() {
  const history = useHistory();

  const token = localStorage.getItem("accessToken");

  if (!token) {
    history.replace("/");
  }

  return (
    <div className={classes.PractitionerForm}>
      {token && <PractitionerForm />}
    </div>
  );
}

export default AddPractitioner;
