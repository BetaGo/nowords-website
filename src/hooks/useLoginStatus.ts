import { useLayoutEffect, useState } from "react";

import { STORAGE_KEY_AUTH_TOKEN } from "../common/const";
import { authorizedClient } from "../common/graphql";

const checkIsLogin = () => {
  const tokensStr = localStorage.getItem(STORAGE_KEY_AUTH_TOKEN);
  if (!tokensStr) return false;
  try {
    const tokens = JSON.parse(tokensStr);
    return tokens.accessToken && tokens.refreshToken;
  } catch (error) {}
  return false;
};

export const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState<boolean>(checkIsLogin());

  const onStorageChange = () => {
    const loginStatus = checkIsLogin();
    setIsLogin(loginStatus);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_AUTH_TOKEN);
    authorizedClient.resetStore();
    window.location.reload();
  };

  useLayoutEffect(() => {
    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return { isLogin, logout };
};
