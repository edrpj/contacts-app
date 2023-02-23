import { Button, Grid, Link, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { AuthLayout } from "../layout/AuthLayout";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/auth";

const schema = yup
  .object({
    email: yup.string().email("Ingresar un email valido").required("Requerido"),
    password: yup.string().required("Requerido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { authentication } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: FormData) => {
    const isValidLogin = await authentication.login(email, password);

    if (!isValidLogin) {
      Swal.fire(
        "Credenciales incorrectas",
        "Correo y/o contraseña incorrectas",
        "error"
      );
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  type="email"
                  placeholder="correo@gmail.com"
                  fullWidth
                  color="secondary"
                  helperText={errors.email?.message ?? ""}
                  error={!!errors.email}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password"
                  placeholder="contraseña"
                  fullWidth
                  color="secondary"
                  helperText={errors.password?.message ?? ""}
                  error={!!errors.password}
                />
              )}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                  borderRadius: "10px",
                  "&:hover": { backgroundColor: "#282828" },
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
