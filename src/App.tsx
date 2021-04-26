import React, { useEffect, useState } from "react";
import MapPage from "./containers/map";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./containers/login";
import RegisterPage from "./containers/register";
import AuthRoute from "./components/others/AuthRoute";
import { auth } from "./config/firebaseConfig";
import BeatLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./state/reducers";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const appLoading = useSelector((state: AppState) => state.appData.loading);

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      setLoading(false);
    });
  }, []);

  const loaderStyles = `
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
  `;
  if (loading)
    return (
      <BeatLoader
        color="#678786"
        loading={loading}
        size={48}
        css={loaderStyles}
      />
    );
  return (
    <>
      <BeatLoader
        color="#678786"
        loading={appLoading}
        size={48}
        css={loaderStyles}
      />
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <AuthRoute path="/" exact component={MapPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
