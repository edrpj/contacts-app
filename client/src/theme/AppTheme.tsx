import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { FC } from "react";
import { customTheme } from "./customTheme";

interface Props {
  children: JSX.Element;
}

export const AppTheme: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
