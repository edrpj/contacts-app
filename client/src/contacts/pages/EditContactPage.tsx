import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ContactsLayout } from "../layout/ContactsLayout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Swal from "sweetalert2";
import contactsApi from "../../api/contactsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Address, Contact, Email, Phone } from "../interfaces/contactInterface";

type FieldType = "PHONE" | "EMAIL" | "ADDRESS";

const schema = yup
  .object({
    firstName: yup.string().required("Requerido"),
    lastName: yup.string().required("Requerido"),
    emails: yup
      .array()
      .of(
        yup.object({
          emailId: yup.number(),
          email: yup.string(),
        })
      )
      .required("Requerido"),
    phones: yup
      .array()
      .of(
        yup.object({
          phoneId: yup.number(),
          phone: yup.string(),
        })
      )
      .required("Requerido"),
    addresses: yup
      .array()
      .of(
        yup.object({
          addressId: yup.number(),
          address: yup.string(),
        })
      )
      .required("Requerido"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const EditContactPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
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
  const { id: contactId } = useParams();
  const navigate = useNavigate();

  const [phoneSqlIds, setPhoneSqlIds] = useState<number[]>([]);
  const [emailSqlIds, setEmailSqlIds] = useState<number[]>([]);
  const [addressSqlIds, SetAddressSqlIds] = useState<number[]>([]);

  const getContact = async (contactId: string | undefined) => {
    try {
      const { data } = await contactsApi.get(`/contacts/${contactId}`);
      const { firstName, lastName, emails, phones, addresses } =
        data.payload as Contact;

      const phoneFields = phones.map((phoneObj: Phone) => ({
        phoneId: phoneObj.id,
        phone: phoneObj.phone,
      }));
      const emailFields = emails.map((emailObj: Email) => ({
        emailId: emailObj.id,
        email: emailObj.email,
      }));
      const addressFields = addresses.map((addressObj: Address) => ({
        addressId: addressObj.id,
        address: addressObj.address,
      }));

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phones", phoneFields);
      setValue("emails", emailFields);
      setValue("addresses", addressFields);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Ha ocurrio un error obteniendo el contacto", "error");
      navigate("/");
    }
  };

  useEffect(() => {
    getContact(contactId);
  }, []);

  const onRemoveField = (
    formId: number,
    fieldType: FieldType,
    sqlId?: number
  ) => {
    switch (fieldType) {
      case "PHONE":
        setPhoneSqlIds([...phoneSqlIds, sqlId || -1]);
        phoneRemove(formId);
        break;
      case "EMAIL":
        setEmailSqlIds([...emailSqlIds, sqlId || -1]);
        emailRemove(formId);
        break;
      case "ADDRESS":
        SetAddressSqlIds([...addressSqlIds, sqlId || -1]);
        addressRemove(formId);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      await contactsApi.put(`/contacts/${contactId}`, {
        ...formData,
        phoneSqlIds,
        emailSqlIds,
        addressSqlIds,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error editando el contacto",
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
                Editar Contacto
              </Typography>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nombres"
                        type="text"
                        placeholder="Jean Paul"
                        value={field.value || ""}
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
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Apellidos"
                        type="text"
                        placeholder="Doe Smith"
                        value={field.value || ""}
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
                      <IconButton
                        onClick={() =>
                          onRemoveField(index, "PHONE", field.phoneId)
                        }
                      >
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
                      <IconButton
                        onClick={() =>
                          onRemoveField(index, "EMAIL", field.emailId)
                        }
                      >
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
                      <IconButton
                        onClick={() =>
                          onRemoveField(index, "ADDRESS", field.addressId)
                        }
                      >
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
                      Editar Contacto
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
