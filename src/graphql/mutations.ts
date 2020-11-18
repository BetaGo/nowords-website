import { gql } from "@apollo/client";

export const ADD_NEW_WORD = gql`
  mutation AddNewWord($input: AddUserWordInput!) {
    addUserWord(input: $input) {
      id
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: AddUserInput!) {
    addUser(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const UPDATE_NEW_WORD = gql`
  mutation UpdateNewWord($input: UpdateUserWordInput!) {
    updateUserWord(input: $input) {
      success
      message
    }
  }
`;
