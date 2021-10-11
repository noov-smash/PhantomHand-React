import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Hooks
import { Provider } from "./hooks/Provider";
// Screens
import { Home } from "./screens/Home";
import { Projects } from "./screens/Projects";
import { Project } from "./screens/Project";
import { NotFoundScreen } from "./screens/404";
// Styles
import StyInitialize from "./styles/Initialize";

const App = () => {
  return (
    <Provider>
      <StyInitialize />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/projects/:id" component={Project} />
          <Route component={NotFoundScreen} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
