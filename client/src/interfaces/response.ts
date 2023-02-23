import { Contact } from "../contacts/interfaces/contactInterface";
import { User } from "./user";

export interface LoginResponse {
  ok: boolean;
  msg: string;
  payload: {
    token: string;
    user: User;
  };
}

export interface RegisterResponse extends LoginResponse {}

export interface CheckTokenResponse extends LoginResponse {}

export interface ContactsResponse {
  ok: boolean;
  msg: string;
  payload: Contact[];
}
