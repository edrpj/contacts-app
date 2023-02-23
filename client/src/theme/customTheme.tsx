import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const customTheme: Theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
    error: {
      main: red.A400,
    },
  },
});
