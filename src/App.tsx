import "./App.css";

import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend as Backend } from "react-dnd-touch-backend";

import { authorizedClient } from "./common/graphql";
import GqlNotice from "./components/GqlNotice";
import { useThemeMode } from "./hooks/useThemeMode";
import Routes from "./Routes";
import { materialDarkTheme } from "./theme/dark";
import { materialLightTheme } from "./theme/light";

// import IndexPage from "./pages";
function App() {
  const themeMode = useThemeMode();
  console.log("thememod", themeMode);
  return (
    <>
      <ApolloProvider client={authorizedClient}>
        <DndProvider
          backend={Backend}
          // options={{ enableHoverOutsideTarget: true }}
        >
          <ThemeProvider
            theme={
              themeMode === "dark" ? materialDarkTheme : materialLightTheme
            }
          >
            <SnackbarProvider>
              <CssBaseline />
              <Routes />
              <GqlNotice />
            </SnackbarProvider>
          </ThemeProvider>
        </DndProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
