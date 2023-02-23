import { Box } from "@mui/material";
import { FC } from "react";
import { Navbar } from "../../ui/components/Navbar";

interface Props {
  children: JSX.Element;
}

export const ContactsLayout: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Navbar />
      {children}
    </Box>
  );
};
