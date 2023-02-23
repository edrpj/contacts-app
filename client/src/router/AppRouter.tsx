import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes";
import { AuthContext } from "../context/auth";
import { ContactsRoutes } from "../contacts/routes/ContactsRoutes";

export const AppRouter = () => {
  const { isAuthenticated }= useContext(AuthContext);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/*" element={<ContactsRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
