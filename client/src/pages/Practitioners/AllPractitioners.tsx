import classes from "./AllPractitioners.module.css";
import PractitionerTable from "../../components/Table/PractitionerTable";

function AllPractitioners() {
  const token = localStorage.getItem("userToken");

  return (
    <div className={classes.PractitionerTable}>
      <PractitionerTable token={token && JSON.parse(token)} />
    </div>
  );
}

export default AllPractitioners;
