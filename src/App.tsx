import React, { useEffect, useState } from "react";
import MapPage from "./containers/map";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./containers/login";
import RegisterPage from "./containers/register";
import AuthRoute from "./components/others/AuthRoute";
import { auth } from "./config/firebaseConfig";
import Loader from "./components/others/Loader";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader loading={loading} />;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <AuthRoute path="/" exact component={MapPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
