import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import classes from "./AllPractitioners.module.css";
import PractitionerTable from "../../components/Table/PractitionerTable";

function AllPractitioners() {
  const history = useHistory();

  const token = localStorage.getItem("userToken");

  if (!token) {
    history.replace("/");
  }

  const redirectToAddPage = () => {
    history.replace("/practitioner/form");
  };

  return (
    <div className={classes.PractitionerTable}>
      <div className={classes.buttonContainer}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={redirectToAddPage}
        >
          Add Practitioner
        </Button>
      </div>

      <PractitionerTable />
    </div>
  );
}

export default AllPractitioners;
