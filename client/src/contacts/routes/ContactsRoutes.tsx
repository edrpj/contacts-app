import { Navigate, Route, Routes } from "react-router-dom";
import { ContactsPage, CreateContactPage, EditContactPage } from "../pages";

export const ContactsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactsPage />} />
      <Route path="/create" element={<CreateContactPage />} />
      <Route path="/edit/:id" element={<EditContactPage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
