import "./App.css";
import Form from "./pages/Form/Form";
import Users from "./pages/Users/Users";
import Layout from "./components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./pages/404/NotFoundPage";
import NewPasswordForm from "./components/Form/NewPasswordForm";
import AddPractitioner from "./pages/Practitioners/AddPractitioner";
import AllPractitioners from "./pages/Practitioners/AllPractitioners";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Form />
      </Route>
      <Route path="/practitioner" exact>
        <Layout>
          <AllPractitioners />
        </Layout>
      </Route>
      <Route path="/users" exact>
        <Layout>
          <Users />
        </Layout>
      </Route>
      <Route path="/practitioner/form" exact>
        <Layout>
          <AddPractitioner />
        </Layout>
      </Route>
      <Route path="/users/resetPassword" exact>
        <NewPasswordForm />
      </Route>
      <Route path="/practitioner/form/:practitioner_id" exact>
        <Layout>
          <AddPractitioner />
        </Layout>
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
