import classes from "./AddPractitioner.module.css";
import PractitionerForm from "../../components/Form/PractitionerForm";

function AddPractitioner() {
  return (
    <div className={classes.PractitionerForm}>
      <PractitionerForm />
    </div>
  );
}

export default AddPractitioner;
