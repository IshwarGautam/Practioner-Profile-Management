import classes from "./Users.module.css";
import { useEffect, useState } from "react";
import { Avatar, List, Card, Modal, notification } from "antd";
import { getUsers, deleteUser } from "../../services/user.service";
import {
  errorNotification,
  successNotification,
} from "../../utils/notification";

type userType = {
  _id: string;
  username: string;
  email: string;
};

export default function Users() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [userid, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleOk = async () => {
    setIsModalOpen(false);
    setLoading(true);

    const { error } = await deleteUser({ userid, username, password });

    if (error) {
      if (error.response.status === 400) {
        errorNotification(api, "Admin username or password incorrect.");
      } else {
        errorNotification(api, "Unable to delete users.");
      }
    } else {
      setCount((c) => c + 1);
      successNotification(api, "Successfully deleted users.");
    }

    clearFields();
    setLoading(false);
  };

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleCancel = () => {
    clearFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { response } = await getUsers();

      if (response) {
        setUsers(response.data);
      }
      setLoading(false);
    })();
  }, [count]);

  const onDeleteClicked = (id: string) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  return (
    <>
      {contextHolder}
      <div className={classes.card}>
        <Card title="USERS LIST">
          <List
            className={classes.usersList}
            loading={loading}
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(item: userType) => (
              <List.Item
                actions={[
                  <a key="delete" onClick={() => onDeleteClicked(item._id)}>
                    delete
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#f56a00",
                      }}
                      size={"large"}
                    >
                      U
                    </Avatar>
                  }
                  title={item.username}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      <Modal
        title="Admin Access"
        open={isModalOpen}
        onOk={handleOk}
        okText="Delete"
        onCancel={handleCancel}
      >
        <div className={classes.inputSection}>
          <label className={classes.label}>UserName: </label>
          <input
            type="text"
            name="Username"
            value={username}
            placeholder="User Name"
            className={classes.input}
            autoComplete="off"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
        <div className={classes.inputSection}>
          <label className={classes.label}>Password: </label>
          <input
            type="password"
            name="Password"
            value={password}
            placeholder="Password"
            className={classes.input}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
      </Modal>
    </>
  );
}
