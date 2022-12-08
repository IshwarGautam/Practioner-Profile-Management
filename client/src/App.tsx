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
          <Route path="/practitioner" exact>
            <AllPractitioners />
          </Route>
          <Route path="/practitioner/form" exact>
            <AddPractitioner />
          </Route>
          <Route path="/practitioner/form/:practitioner_id">
            <AddPractitioner />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
