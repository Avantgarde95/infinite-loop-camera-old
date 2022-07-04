import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

export const theme: Theme = {
  color: {
    foreground1: "#eeeeee",
    foreground2: "#dddddd",
    background: "#000000",
  },
};

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: theme.color.foreground1,
    },
  },
  typography: {
    fontFamily: "inherit",
  },
});
