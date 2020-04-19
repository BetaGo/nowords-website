import { gql } from "apollo-boost";

export const ADD_NEW_WORD = gql`
  mutation AddNewWord($input: AddUserWordInput!) {
    addUserWord(input: $input) {
      id
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: AddUserInput) {
    addUser(input: $input) {
      id
      accessToken
      refreshToken
    }
  }
`;

