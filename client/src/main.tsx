import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContactsApp } from "./ContactsApp";
import { AuthProvider } from "./context/auth";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContactsApp />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
