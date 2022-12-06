import { Link } from "react-router-dom";
import classes from "./NavigationSection.module.css";

type NavigationSectionType = {
  url: string;
};

function NavigationSection(props: NavigationSectionType) {
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
              to="/add-practitioner"
              className={
                props.url === "/add-practitioner"
                  ? classes.active
                  : classes.unactive
              }
            >
              Add Practitioner
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationSection;
