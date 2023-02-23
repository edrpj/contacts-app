import { createContext } from "react";
import { User } from "../../interfaces";

interface Props {
  isAuthenticated: boolean;
  user?: User | undefined;
  authentication: Authentication;
}

interface Authentication {
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; msg?: string }>;
  logout: () => void;
}

export const AuthContext = createContext({} as Props);
