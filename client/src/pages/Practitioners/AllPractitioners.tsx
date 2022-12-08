import PractitionerTable from "../../components/Table/PractitionerTable";

const token: string = JSON.parse(localStorage.getItem("userToken") || "");

function AllPractitioners() {
  return <PractitionerTable token={token} />;
}

export default AllPractitioners;
