/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddUser
// ====================================================

export interface AddUser_addUser {
  __typename: "AddUserPayload";
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface AddUser {
  addUser: AddUser_addUser | null;
}

export interface AddUserVariables {
  input?: AddUserInput | null;
}
