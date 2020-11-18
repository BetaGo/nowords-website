/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserWordInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateNewWord
// ====================================================

export interface UpdateNewWord_updateUserWord {
  __typename: "UpdateResult";
  success: boolean;
  message: string | null;
}

export interface UpdateNewWord {
  updateUserWord: UpdateNewWord_updateUserWord;
}

export interface UpdateNewWordVariables {
  input: UpdateUserWordInput;
}
