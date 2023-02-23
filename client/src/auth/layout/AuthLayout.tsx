import { FC } from "react";
import { Grid, Typography } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";

interface Props {
  children: JSX.Element;
  title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "#f7f7f7", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 3,
          width: { md: 500 },
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <LockPersonIcon sx={{ width: "50px", height: "50px", mb: 1 }} />
          <Typography
            variant="h4"
            sx={{ mb: 1, display: "flex", justifyContent: "center" }}
          >
            {title}
          </Typography>
        </Grid>

        {children}
      </Grid>
    </Grid>
  );
};
