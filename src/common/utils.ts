import { IAuthToken } from "../types";
import { STORAGE_KEY_AUTH_TOKEN } from "./const";

export const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const storeAuthToken = (token: IAuthToken) => {
  localStorage.setItem(STORAGE_KEY_AUTH_TOKEN, JSON.stringify(token));
};
