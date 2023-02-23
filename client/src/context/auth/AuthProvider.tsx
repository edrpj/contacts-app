import { FC, useEffect, useReducer } from "react";
import { AuthContext, authReducer } from ".";
import contactsApi from "../../api/contactsApi";
import {
  CheckTokenResponse,
  LoginResponse,
  RegisterResponse,
  User,
} from "../../interfaces";

interface Props {
  children: JSX.Element;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | undefined;
}

const AUTH_INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const checkToken = async () => {
    try {
      const { data } = await contactsApi.get<CheckTokenResponse>(
        "/auth/validate-token"
      );
      const { token, user } = data.payload;

      contactsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);

      dispatch({ type: "[Auth] Login", payload: { user } });
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await contactsApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      const { token, user } = data.payload;

      contactsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);

      dispatch({ type: "[Auth] Login", payload: { user } });

      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await contactsApi.post<RegisterResponse>(
        "/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      const { token, user } = data.payload;

      contactsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);

      dispatch({ type: "[Auth] Login", payload: { user } });

      return {
        hasError: false,
      };
    } catch (error: any) {
      const { msg } = error.response.data as { msg: string };
      return {
        hasError: true,
        msg,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "[Auth] Logout" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        authentication: {
          login,
          register,
          logout,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
