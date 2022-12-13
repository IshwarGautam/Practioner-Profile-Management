import http from "../../services/http";
import { useHistory } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import classes from "./PractitionerTable.module.css";
import { Switch, Popconfirm, Table, Typography, Avatar } from "antd";

type Item = {
  _id: string;
  fullName: string;
  email: string;
  contact: Number;
  dob: string;
  workingDays: Number;
  startTime: string;
  endTime: string;
  icuSpecialist: boolean;
  assetUrl: string;
};

type NewDataType = {
  _id?: string;
  icuSpecialist: boolean;
};

const PractitionerTable = () => {
  const history = useHistory();
  const [data, setData] = useState(new Array());

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Basic Info",
      dataIndex: "basicInfo",
      render: (_: any, record: Item) => {
        return (
          <div className={classes.basicInfo}>
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={record.assetUrl}
            ></Avatar>
            <div className={classes.infoContainer}>
              <div className={classes.fullName}>{record.fullName}</div>
              <div className={classes.email}>{record.email}</div>
            </div>
          </div>
        );
      },
    },

    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },

    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },

    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
    },

    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },

    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
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
    setLoading(true);
    http
      .get("/practitioner")
      .then((response) => {
        const icuSpecialistPractitioners = response.data.filter(
          (data: Item) => data.icuSpecialist
        );

        icuSpecialistPractitioners.sort(
          (practitioner1: Item, practitioner2: Item) =>
            practitioner1.fullName.localeCompare(practitioner2.fullName)
        );

        const nonSpecialistPractitioners = response.data.filter(
          (data: Item) => !data.icuSpecialist
        );

        setData([...icuSpecialistPractitioners, ...nonSpecialistPractitioners]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [count]);

  const edit = (record: Item) => {
    history.push(`/practitioner/form/${record._id}`);
  };

  const onChangeSpecialist = (record: object, checked: boolean) => {
    const updateData: NewDataType = { ...record, icuSpecialist: checked };

    http
      .put(`/practitioner/${updateData?._id}`, updateData)
      .then(() => {
        setCount((c) => c + 1);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (key: React.Key) => {
    http
      .delete(`/practitioner/${key}`)
      .then(() => {
        setCount((c) => c + 1);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Table
      rowKey={(obj) => obj.email}
      dataSource={data}
      columns={columns}
      pagination={false}
      loading={loading}
      className={classes.table}
    />
  );
};

export default PractitionerTable;
