import { Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import classes from "./NavigationSection.module.css";

type NavigationSectionType = {
  url: string;
};

function NavigationSection(props: NavigationSectionType) {
  const history = useHistory();

  const onLogout = () => {
    history.replace("/");
    localStorage.removeItem("userToken");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/practitioner" className={classes.unactive}>
          PRACTITIONERS
        </Link>
      </div>
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
              All Practioners
            </Link>
          </li>
          <li>
            <Link
              to="/practitioner/form"
              className={
                props.url === "/practitioner/form"
                  ? classes.active
                  : classes.unactive
              }
            >
              Add Practitioner
            </Link>
          </li>
          <li>
            <Popconfirm
              title="Sure to Logout?"
              onConfirm={onLogout}
              className={classes.logout}
            >
              <a>Log out</a>
            </Popconfirm>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationSection;
