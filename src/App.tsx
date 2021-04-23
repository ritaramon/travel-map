import React, { useEffect, useState } from "react";
import MapPage from "./containers/map";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./containers/login";
import RegisterPage from "./containers/register";
import AuthRoute from "./components/others/AuthRoute";
import { auth } from "./config/firebaseConfig";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      setLoading(false);
      // getUserInfo();
    });
  }, []);

  // const getUserInfo = async () => {
  //   if (auth.currentUser) {
  //     const { uid } = auth.currentUser;
  //     const userDoc = dataCollection.doc(uid);
  //     const userData = await userDoc.get();
  //     const data = userData.data();
  //     console.log(data?.count);
  //     if (userData.exists) {
  //       await userDoc.set({
  //         count: data?.count + 10,
  //       });
  //     } else {
  //       await userDoc.set({
  //         count: 16,
  //       });
  //     }
  //     console.log(data?.count);
  //   }
  // };
  if (loading) return <div />;
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <AuthRoute path="/" component={MapPage} exact />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
