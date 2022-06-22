import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

export const theme: Theme = {
  color: {
    foreground1: "#000000",
    foreground2: "#48b4e0",
    background: "#ffffff",
  },
};

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: theme.color.foreground2,
    },
  },
});
