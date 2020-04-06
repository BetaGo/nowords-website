import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useLoginStatus } from "../hooks/useLoginStatus";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isLogin = useLoginStatus();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
