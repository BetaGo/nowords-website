import "./App.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import GqlNotice from "./components/GqlNotice";

import { authorizedClient } from "./common/graphql";
import PrivateRoute from "./components/PrivateRoute";
import { useThemeMode } from "./hooks/useThemeMode";
import IndexPage from "./pages";
import HomePage from "./pages/Home";
import LoginPage from "./pages/User/Login";
import SignUpPage from "./pages/User/SignUp";
import { materialDarkTheme } from "./theme/dark";
import { materialLightTheme } from "./theme/light";

function App() {
  const themeMode = useThemeMode();
  console.log("thememod", themeMode);
  return (
    <>
      <ApolloProvider client={authorizedClient}>
        <ThemeProvider
          theme={themeMode === "dark" ? materialDarkTheme : materialLightTheme}
        >
          <SnackbarProvider>
            <CssBaseline />
            <Router>
              <Switch>
                <Route exact path="/" component={IndexPage} />>
                <Route path="/user/login" component={LoginPage} />
                <Route path="/user/signup" component={SignUpPage} />
                <PrivateRoute path="/home">
                  <HomePage />
                </PrivateRoute>
              </Switch>
            </Router>
            <GqlNotice />
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
