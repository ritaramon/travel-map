import React from "react";
import { Redirect, Route } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";

interface Props {
  path: string;
  exact?: boolean;
  component: React.FC;
}

const AuthRoute: React.FC<Props> = ({ ...props }) => {
  if (!auth.currentUser) return <Redirect to="/login" />;
  return <Route {...props} />;
};

export default AuthRoute;
