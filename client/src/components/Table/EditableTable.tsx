import React, { useState, useEffect } from "react";
import { http } from "../../services/http";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";

interface Item {
  _id: string;
  fullName: string;
  email: string;
  contact: Number;
  dob: string;
  workingDays: Number;
  startTime: string;
  endTime: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    http.get("/practitioner").then((response) => {
      setData(response.data);
    });
  }, []);

  const isEditing = (record: Item) => record._id === editingKey;

  const edit = (record: Item) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData: any = [...data];
      const index = newData.findIndex((item: any) => key === item._id);
      const item = newData[index];
      const updateData = { ...item, ...row };

      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setData(newData);
      setEditingKey("");

      http
        .put(`/practitioner/${updateData?._id}`, updateData)
        .catch((error) => console.log(error));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onDelete = async (key: React.Key) => {
    try {
      const newData: any = [...data];
      const index = newData.findIndex((item: any) => key === item._id);

      newData.splice(index, 1);
      setData(newData);
      setEditingKey("");

      http.delete(`/practitioner/${key}`).catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

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
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
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
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        rowKey={(obj) => obj.email}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
