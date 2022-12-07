import "./App.css";
import Form from "./pages/Form/Form";
import Layout from "./components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import AddPractitioner from "./pages/Practitioners/AddPractitioner";
import AllPractitioners from "./pages/Practitioners/AllPractitioners";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Form />
          </Route>
          <Route path="/practitioner">
            <AllPractitioners />
          </Route>
          <Route path="/add-practitioner">
            <AddPractitioner />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
