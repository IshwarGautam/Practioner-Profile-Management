import { useHistory } from "react-router-dom";
import classes from "./AddPractitioner.module.css";
import PractitionerForm from "../../components/Form/PractitionerForm";

function AddPractitioner() {
  const history = useHistory();

  const token = localStorage.getItem("userToken");

  if (!token) {
    history.replace("/");
  }

  return (
    <div className={classes.PractitionerForm}>
      <PractitionerForm token={token && JSON.parse(token)} />
    </div>
  );
}

export default AddPractitioner;
