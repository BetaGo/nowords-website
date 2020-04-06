import "./App.css";
import "./theme";

import { ApolloProvider } from "@apollo/react-hooks";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { authorizedClient } from "./common/graphql";
import { useThemeMode } from "./hooks/useThemeMode";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { materialDarkTheme } from "./theme/dark";
import { materialLightTheme } from "./theme/light";

function App() {
  const themeMode = useThemeMode();
  return (
    <ApolloProvider client={authorizedClient}>
      <ThemeProvider
        theme={themeMode === "dark" ? materialDarkTheme : materialLightTheme}
      >
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
