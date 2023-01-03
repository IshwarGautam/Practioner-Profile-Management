import { useState } from "react";
import http from "../../utils/http";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { DownOutlined } from "@ant-design/icons";
import classes from "./NavigationSection.module.css";

type NavigationSectionType = {
  url: string;
};

function NavigationSection(props: NavigationSectionType) {
  const history = useHistory();

  const userInfo = useUserStore((state) => state.userInfo);

  const [redirect, setRedirect] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: <span>Log out</span>,
      onClick: () => {
        setRedirect(true);
        localStorage.removeItem("accessToken");

        //remove refresh token from cookies
        http
          .get("/users/removeToken", { withCredentials: true })
          .catch((error) => {
            console.log(error);
          });
      },
      key: "0",
    },
  ];

  if (redirect) {
    history.replace("/");
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link
              to="/practitioner"
              className={
                props.url === "/practitioner"
                  ? classes.active
                  : classes.unactive
              }
            >
              Practitioner
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={
                props.url === "/users" ? classes.active : classes.unactive
              }
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.logoSection}>
        <div className={classes.activeUser}>Hello, {userInfo.userName}!</div>
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          className={classes.dropdown}
        >
          <Space>
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </header>
  );
}

export default NavigationSection;
