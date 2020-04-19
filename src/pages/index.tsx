import React, { useEffect } from "react";
import { useLoginStatus } from "../hooks/useLoginStatus";
import { useHistory } from "react-router-dom";

const Index = () => {
  const isLogin = useLoginStatus();
  const history = useHistory();

  useEffect(() => {
    if (isLogin) {
      history.replace("/home");
    }
  }, [isLogin, history]);

  return <div>index</div>;
};

export default Index;
