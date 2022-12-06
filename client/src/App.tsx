import "./App.css";
import Form from "./pages/Form/Form";
import Layout from "./components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import AllPractitioners from "./pages/Practitioners/AllPractitioners";
import AddPractionerForm from "./components/Form/addPractitionerForm";

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
            <div className="Practitioner-Form">
              <AddPractionerForm />
            </div>
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
