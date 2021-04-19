import React from "react";
import MapPage from "./containers/map";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./containers/login";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MapPage} exact />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
