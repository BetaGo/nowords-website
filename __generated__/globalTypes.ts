/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddUserInput {
  username: string;
  displayName: string;
  password: string;
  email?: string | null;
  avatar?: string | null;
  phone?: string | null;
}

export interface AddUserWordInput {
  word: string;
  translation?: string | null;
  example?: string | null;
}

export interface RefreshTokenInput {
  refreshToken: string;
  accessToken: string;
}

export interface UserLoginInput {
  account: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
