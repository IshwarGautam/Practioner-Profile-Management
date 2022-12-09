import classes from "./Layout.module.css";
import { useLocation } from "react-router-dom";
import NavigationSection from "./NavigationSection";
import { ReactNode, useEffect, useState } from "react";

type locationType = {
  pathname: string;
};

type LayoutType = {
  children: ReactNode;
};

function Layout(props: LayoutType) {
  const location: locationType = useLocation();

  const [url, setUrl] = useState<string>("/");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <div>
      <NavigationSection url={url} />
      <main className={classes.dashboard}>{props.children}</main>
    </div>
  );
}

export default Layout;
