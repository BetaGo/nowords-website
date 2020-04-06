import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";

const baseThemOption: ThemeOptions = {
  palette: {
    secondary: {
      main: "#127bc4",
      light: "rgb(65, 149, 207)",
      dark: "rgb(12, 86, 137)",
      contrastText: "#fff",
    },
    type: "dark",
    background: {
      default: "#121212",
    },
    primary: {
      main: "#d63947",
      light: "rgb(222, 96, 107)",
      dark: "rgb(149, 39, 49)",
      contrastText: "#fff",
    },
  },
};

export const materialDarkTheme = createMuiTheme(baseThemOption);
