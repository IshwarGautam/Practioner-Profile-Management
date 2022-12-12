import { useHistory } from "react-router-dom";
import classes from "./AllPractitioners.module.css";
import PractitionerTable from "../../components/Table/PractitionerTable";

function AllPractitioners() {
  const history = useHistory();

  const token = localStorage.getItem("userToken");

  if (!token) {
    history.replace("/");
  }

  return (
    <div className={classes.PractitionerTable}>
      <PractitionerTable />
    </div>
  );
}

export default AllPractitioners;
