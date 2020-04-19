import React from "react";
import { useLoginStatus } from "../hooks/useLoginStatus";

const Home = () => {
  const isLogin = useLoginStatus();
  if (isLogin) {
    return <div>logged in</div>;
  }
  return <div>Home</div>;
};

export default Home;
