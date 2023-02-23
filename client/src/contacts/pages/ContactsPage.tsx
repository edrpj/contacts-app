import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { ContactsLayout } from "../layout/ContactsLayout";
import contactsApi from "../../api/contactsApi";
import Swal from "sweetalert2";
import { Contact } from "../interfaces/contactInterface";
import { getValuesSeparatedByCommas } from "../helpers/getValuesSeparatedByCommas";
import { useNavigate } from "react-router-dom";
import { ContactsResponse } from "../../interfaces";
import { Box } from "@mui/system";

export const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [numberOfContacts, setNumberOfContacts] = useState<number>(0);
  const navigate = useNavigate();

  const getContacts = async () => {
    try {
      const { data } = await contactsApi.get<ContactsResponse>("/contacts");
      const { payload } = data;
      setNumberOfContacts(payload.length);
      setContacts(payload);
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "Ha ocurrido un error obteniendo los contactos",
        "error"
      );
    }
  };

  useEffect(() => {
    getContacts();
  }, [deleting]);

  const onDeleteContact = async (contactId: number) => {
    try {
      await contactsApi.delete(`/contacts/${contactId}`);
      setDeleting(!deleting);
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "Ha ocurrido un error eliminando el contacto",
        "error"
      );
    }
  };

  const onEditContact = (conctactId: number) => {
    navigate(`/edit/${conctactId}`);
  };

  return (
    <ContactsLayout>
      <Box
        sx={{
          backgroundColor: "inherit",
          padding: 3,
          width: "100%",
          maxWidth: "1444px",
          height: "100%",
          flex: 1,
          margin: "0px auto",
          overflow: "auto",
        }}
      >
        <h1>{numberOfContacts} Contactos</h1>
        <Grid container justifyContent="flex-start" spacing={3}>
          {contacts.map((contact: Contact) => (
            <Grid item xs={12} lg={6} key={contact.id}>
              <Card
                className="box-shadow"
                elevation={3}
                sx={{
                  height: { xs: "auto", sm: 250 },
                  mt: 3,
                  borderRadius: "20px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 1,
                      ml: 1,
                      fontSize: 30,
                      display: { xs: "flex", sm: "block" },
                      justifyContent: "center",
                    }}
                  >
                    {contact.firstName} {contact.lastName}
                  </Typography>
                  <Box
                    sx={{
                      display: { sm: "flex" },
                      alignItems: "center",
                      justifyContent: "flex-start",
                      overflow: { sm: "auto" },
                      maxHeight: { sm: "100px" },
                      ml: 1,
                    }}
                  >
                    <Avatar
                      alt="contact"
                      src="/avatar.svg"
                      sx={{
                        width: 100,
                        height: 100,
                        margin: { xs: "0 auto", sm: "0px 3px 0px 0px" },
                      }}
                    />

                    <Grid item sx={{ ml: 2 }}>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <span className="font-bold">Telefónos: </span>{" "}
                        {getValuesSeparatedByCommas(contact.phones, "phone")}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <span className="font-bold">Correos: </span>{" "}
                        {getValuesSeparatedByCommas(contact.emails, "email")}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <span className="font-bold">Direcciones: </span>{" "}
                        {getValuesSeparatedByCommas(
                          contact.addresses,
                          "address"
                        )}
                      </Typography>
                    </Grid>
                  </Box>
                </CardContent>
                <CardActions>
                  <Grid container sx={{ mb: 1 }}>
                    <Button
                      variant="contained"
                      disableElevation
                      sx={{
                        ml: 2,
                        backgroundColor: "#ec3c21",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "white",
                          border: "1px solid #ec3c21",
                          color: "#ec3c21",
                        },
                      }}
                      onClick={() => onDeleteContact(contact.id)}
                    >
                      Eliminar
                    </Button>
                    <Box flex={1} />
                    <Button
                      variant="contained"
                      sx={{
                        mr: 2,
                        backgroundColor: "#279595",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "white",
                          border: "1px solid #279595",
                          color: "#279595",
                        },
                      }}
                      onClick={() => onEditContact(contact.id)}
                    >
                      Editar
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ContactsLayout>
  );
};
