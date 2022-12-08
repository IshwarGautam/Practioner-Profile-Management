import classes from "./AddPractitioner.module.css";
import AddPractionerForm from "../../components/Form/addPractitionerForm";

function AddPractitioner() {
  const token = localStorage.getItem("userToken");

  return (
    <div className={classes.PractitionerForm}>
      <AddPractionerForm token={token && JSON.parse(token)} />
    </div>
  );
}

export default AddPractitioner;
