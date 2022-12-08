import { http } from "../../services/http";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Form, Switch, Popconfirm, Table, Typography } from "antd";

interface Item {
  _id: string;
  fullName: string;
  email: string;
  contact: Number;
  dob: string;
  workingDays: Number;
  startTime: string;
  endTime: string;
  icuSpecialist: boolean;
}

type NewDataType = {
  _id?: string;
  icuSpecialist: boolean;
};

const EditableTable: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);
  const [isIcuSpecialist, setIsIcuSpecialist] = useState<boolean>();

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
    },

    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      editable: true,
    },

    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      editable: true,
    },

    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
      editable: true,
    },

    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      editable: true,
    },

    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        return (
          <span>
            <Typography.Link
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(record._id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
    {
      title: "ICU Specialist",
      dataIndex: "ICU Specialist",
      render: (_: any, record: Item) => {
        return (
          <Switch
            onChange={(checked) => onChangeSpecialist(record, checked)}
            defaultChecked={record?.icuSpecialist}
          />
        );
      },
    },
  ];

  useEffect(() => {
    http.get("/practitioner").then((response) => {
      const icuSpecialistPractitioners = response.data.filter(
        (data: any) => data.icuSpecialist
      );

      icuSpecialistPractitioners.sort(
        (practitioner1: any, practitioner2: any) =>
          practitioner1.fullName.localeCompare(practitioner2.fullName)
      );

      const nonSpecialistPractitioners = response.data.filter(
        (data: any) => !data.icuSpecialist
      );

      setData([...icuSpecialistPractitioners, ...nonSpecialistPractitioners]);
    });
  }, [isIcuSpecialist]);

  const edit = (record: Item) => {
    history.push(`/practitioner/form/${record._id}`);
  };

  const onChangeSpecialist = (record: object, checked: boolean) => {
    const updateData: NewDataType = { ...record, icuSpecialist: checked };

    setIsIcuSpecialist(checked);

    http
      .put(`/practitioner/${updateData?._id}`, updateData)
      .catch((error) => console.log(error));
  };

  const onDelete = async (key: React.Key) => {
    http.delete(`/practitioner/${key}`).catch((error) => console.log(error));
  };

  return (
    <Form form={form} component={false}>
      <Table
        bordered
        rowKey={(obj) => obj.email}
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
      />
    </Form>
  );
};

export default EditableTable;
