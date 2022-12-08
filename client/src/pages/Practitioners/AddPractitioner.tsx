import classes from "./AddPractitioner.module.css";
import AddPractionerForm from "../../components/Form/addPractitionerForm";

const token: string = JSON.parse(localStorage.getItem("userToken") || "");

function AddPractitioner() {
  return (
    <div className={classes.PractitionerForm}>
      <AddPractionerForm token={token} />
    </div>
  );
}

export default AddPractitioner;
