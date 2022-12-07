import classes from "./AddPractitioner.module.css";
import AddPractionerForm from "../../components/Form/addPractitionerForm";

function AddPractitioner() {
  return (
    <div className={classes.PractitionerForm}>
      <AddPractionerForm />
    </div>
  );
}

export default AddPractitioner;
