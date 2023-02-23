import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ContactsLayout } from "../layout/ContactsLayout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Swal from "sweetalert2";
import contactsApi from "../../api/contactsApi";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    firstName: yup.string().required("Requerido"),
    lastName: yup.string().required("Requerido"),
    emails: yup
      .array()
      .of(
        yup.object({
          email: yup.string(),
        })
      )
      .required("Requerido"),
    phones: yup
      .array()
      .of(
        yup.object({
          phone: yup.string(),
        })
      )
      .required("Requerido"),
    addresses: yup
      .array()
      .of(
        yup.object({
          address: yup.string(),
        })
      )
      .required("Requerido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const CreateContactPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      emails: [{ email: "" }],
      addresses: [{ address: "" }],
      phones: [{ phone: "" }],
    },
  });
  const {
    fields: phoneFields,
    append: phoneAppend,
    remove: phoneRemove,
  } = useFieldArray({
    control,
    name: "phones",
  });
  const {
    fields: emailFields,
    append: emailAppend,
    remove: emailRemove,
  } = useFieldArray({
    control,
    name: "emails",
  });
  const {
    fields: addressFields,
    append: addressAppend,
    remove: addressRemove,
  } = useFieldArray({
    control,
    name: "addresses",
  });
  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    try {
      await contactsApi.post("/contacts", formData);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error creando el contacto",
        "Por favor verifique si ha llenado todos los campos",
        "error"
      );
    }
  };

  return (
    <ContactsLayout>
      <div className="w-full h-full flex-1">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "calc(110vh - 164px)",
            backgroundColor: "#f7f7f7",
            padding: 4,
          }}
        >
          <Grid
            item
            className="box-shadow"
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 3,
              width: { md: 500 },
              height: "92%",
              overflow: "auto",
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <ContactPageIcon sx={{ width: "50px", height: "50px", mb: 1 }} />
              <Typography
                variant="h4"
                sx={{ mb: 1, display: "flex", justifyContent: "center" }}
              >
                Crear Contacto
              </Typography>
            </Grid>

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
                        label="Nombres"
                        type="text"
                        placeholder="Jean Paul"
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
                        label="Apellidos"
                        type="text"
                        placeholder="Doe Smith"
                        fullWidth
                        color="secondary"
                        helperText={errors.lastName?.message ?? ""}
                        error={!!errors.lastName}
                      />
                    )}
                  />
                </Grid>

                {phoneFields.map((field, index) => (
                  <Grid container item xs={12} key={field.id}>
                    <Grid item xs={11} sx={{ mt: 2 }}>
                      <Controller
                        name={`phones.${index}.phone`}
                        control={control}
                        defaultValue="field.phone"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={`Teléfono ${index + 1}`}
                            type="text"
                            placeholder="3485756543"
                            fullWidth
                            color="secondary"
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{ display: "flex", alignItems: "center", mt: 2 }}
                    >
                      <IconButton onClick={() => phoneRemove(index)}>
                        <RemoveCircleIcon
                          sx={{ fontSize: "30px", color: "red" }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    type="button"
                    fullWidth
                    sx={{
                      backgroundColor: "#279595",
                      color: "white",
                      borderRadius: "10px",
                      "&:hover": { backgroundColor: "#3bb7b7" },
                    }}
                    onClick={() => phoneAppend({ phone: "" })}
                  >
                    Agregar Teléfono
                  </Button>
                </Grid>

                {emailFields.map((field, index) => (
                  <Grid container item xs={12} key={field.id}>
                    <Grid item xs={11} sx={{ mt: 2 }}>
                      <Controller
                        name={`emails.${index}.email`}
                        control={control}
                        defaultValue="field.email"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={`Email ${index + 1}`}
                            type="email"
                            placeholder="correo@gmail.com"
                            fullWidth
                            color="secondary"
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{ display: "flex", alignItems: "center", mt: 2 }}
                    >
                      <IconButton onClick={() => emailRemove(index)}>
                        <RemoveCircleIcon
                          sx={{ fontSize: "30px", color: "red" }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    type="button"
                    fullWidth
                    sx={{
                      backgroundColor: "#279595",
                      color: "white",
                      borderRadius: "10px",
                      "&:hover": { backgroundColor: "#3bb7b7" },
                    }}
                    onClick={() => emailAppend({ email: "" })}
                  >
                    Agregar Email
                  </Button>
                </Grid>

                {addressFields.map((field, index) => (
                  <Grid container item xs={12} key={field.id}>
                    <Grid item xs={11} sx={{ mt: 2 }}>
                      <Controller
                        name={`addresses.${index}.address`}
                        control={control}
                        defaultValue="field.address"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label={`Dirección ${index + 1}`}
                            type="text"
                            placeholder="Cra 264 #457-283"
                            fullWidth
                            color="secondary"
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      sx={{ display: "flex", alignItems: "center", mt: 2 }}
                    >
                      <IconButton onClick={() => addressRemove(index)}>
                        <RemoveCircleIcon
                          sx={{ fontSize: "30px", color: "red" }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    type="button"
                    fullWidth
                    sx={{
                      backgroundColor: "#279595",
                      color: "white",
                      borderRadius: "10px",
                      "&:hover": { backgroundColor: "#3bb7b7" },
                    }}
                    onClick={() => addressAppend({ address: "" })}
                  >
                    Agregar Dirección
                  </Button>
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
                      Crear Contacto
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    </ContactsLayout>
  );
};
