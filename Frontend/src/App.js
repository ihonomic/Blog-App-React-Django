import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SubLayout from "./hocs/SubLayout";
import Layout from "./hocs/Layout";

import Home from "./containers/Home";
import Articles from "./containers/Articles";
import DetailArticle from "./containers/DetailArticle";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import DashBoard from "./containers/DashBoard";

import NotFound from "./components/NotFound";
import PrivateRoute from "./components/privateRoute";

import "./css/main.css";
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />

          <SubLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:id" component={Articles} />
              <Route
                exact
                path="/articles/detail/:id"
                component={DetailArticle}
              />
              <Route exact path="/profile/dashboard" component={DashBoard} />
              <Route component={NotFound} />
            </Switch>
          </SubLayout>
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
