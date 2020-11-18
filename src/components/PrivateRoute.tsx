import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useLoginStatus } from "../hooks/useLoginStatus";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isLogin } = useLoginStatus();
  console.log("isLogin", isLogin);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
