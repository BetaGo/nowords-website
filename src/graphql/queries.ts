import { gql } from "@apollo/client";

export const ENCRYPT_TOKEN = gql`
  query EncryptToken {
    encryptToken {
      token
      publicKey
    }
  }
`;

export const REFRESH_TOKEN = gql`
  query RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const USER_LOGIN = gql`
  query UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const NEW_WORDS = gql`
  query NewWords($first: Int!, $after: String) {
    allNewWords(first: $first, after: $after) {
      edges {
        node {
          id
          word
          translation
          example
          forgottenTimes
          rememberTimes
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const USER_WORDS = gql`
  query UserWords($first: Int!, $after: String) {
    allUserWords(first: $first, after: $after) {
      edges {
        node {
          id
          word
          translation
          example
          forgottenTimes
          rememberTimes
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const USER = gql`
  query User {
    user {
      displayName
      id
      email
      avatar
    }
  }
`;
