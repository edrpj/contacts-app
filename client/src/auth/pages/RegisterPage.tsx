import { Button, Grid, Link, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { AuthLayout } from "../layout/AuthLayout";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import Swal from "sweetalert2";

const schema = yup
  .object({
    firstName: yup.string().required("Requerido"),
    lastName: yup.string().required("Requerido"),
    email: yup.string().required("Requerido").email("Ingresar un email valido"),
    password: yup
      .string()
      .required("Requerido")
      .min(8, "La constraseña debe contener al menos 8 caracteres"),
    confirmPassword: yup
      .string()
      .required("Requerido")
      .oneOf([yup.ref("password")], "Las contraseñas deben ser iguales"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const RegisterPage = () => {
  const { authentication } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
  }: FormData) => {
    const { hasError, msg } = await authentication.register(
      firstName,
      lastName,
      email,
      password
    );

    if (hasError) {
      Swal.fire("Error en el registro", msg, "error");
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  type="text"
                  placeholder="Jhon"
                  fullWidth
                  color="secondary"
                  helperText={errors.firstName?.message ?? ""}
                  error={!!errors.firstName}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellido"
                  type="text"
                  placeholder="Joe"
                  fullWidth
                  color="secondary"
                  helperText={errors.lastName?.message ?? ""}
                  error={!!errors.lastName}
                />
              )}
            />
          </Grid>
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

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirmar Contraseña"
                  type="password"
                  placeholder="contraseña"
                  fullWidth
                  color="secondary"
                  helperText={errors.confirmPassword?.message ?? ""}
                  error={!!errors.confirmPassword}
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
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Iniciar Sesión
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
