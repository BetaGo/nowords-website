import ApolloClient from "apollo-boost";
import jwtDecode from "jwt-decode";

import { STORAGE_KEY_AUTH_TOKEN } from "./const";

import {
  RefreshToken,
  RefreshTokenVariables
} from "../graphql/__generated__/RefreshToken";
import { REFRESH_TOKEN } from "../graphql/queries";
import { IJwtTokenObj, IAuthToken } from "../types";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI
});

export const authorizedClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI,
  request: async operation => {
    const tokensStr = localStorage.getItem(STORAGE_KEY_AUTH_TOKEN);

    let accessToken: string | undefined;
    let refreshToken: string | undefined;

    if (tokensStr) {
      try {
        const tokens: IAuthToken = JSON.parse(tokensStr);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
      } catch (error) {
        console.log(error);
      }
    }

    if (accessToken && refreshToken) {
      const now = Math.floor(Date.now() / 1000);
      const decodedAccessToken = jwtDecode<IJwtTokenObj>(accessToken);
      const decodedRefreshToken = jwtDecode<IJwtTokenObj>(refreshToken);

      if (decodedAccessToken.exp < now && decodedRefreshToken.exp > now) {
        const res = await client.query<RefreshToken, RefreshTokenVariables>({
          query: REFRESH_TOKEN,
          variables: {
            input: {
              accessToken,
              refreshToken
            }
          }
        });
        localStorage.setItem(
          STORAGE_KEY_AUTH_TOKEN,
          JSON.stringify(res.data.refreshToken)
        );
      }
    }

    operation.setContext({
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : ""
      }
    });
  }
});
