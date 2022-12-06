import { useEffect, useState } from "react";
import { http } from "../../services/http";

import { Checkbox, Table, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";

import classes from "./AllPractitioners.module.css";

interface DataType {
  fullName: string;
  email: string;
  contact: Number;
  dob: string;
  workingDays: Number;
  startTime: string;
  endTime: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Full Name",
    dataIndex: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },

  {
    title: "Contact",
    dataIndex: "contact",
  },

  {
    title: "Date of Birth",
    dataIndex: "dob",
  },

  {
    title: "Working Days",
    dataIndex: "workingDays",
  },

  {
    title: "Start Time",
    dataIndex: "startTime",
  },

  {
    title: "End Time",
    dataIndex: "endTime",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
function AllPractitioners() {
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    http.get("/practitioner").then((response) => {
      setPractitioners(response.data);
    });
  }, []);

  return (
    <div className={classes.practitioners}>
      <Checkbox checked className={classes.practitioners}>
        ICU Specialist
      </Checkbox>
      <Divider />
      <Table
        dataSource={practitioners}
        columns={columns}
        bordered
        rowKey={(obj) => obj.fullName}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />
    </div>
  );
}

export default AllPractitioners;
