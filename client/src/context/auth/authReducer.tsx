import { AuthState } from ".";
import { User } from "../../interfaces";

type AuthActionType =
  | { type: "[Auth] Login"; payload: { user: User } }
  | { type: "[Auth] Logout" };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] Login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "[Auth] Logout":
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    default:
      return state;
  }
};
